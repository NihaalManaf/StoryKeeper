import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertStorySchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, JPG and PNG are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Create a new story
  app.post("/api/stories", upload.array('characterPhotos', 3), async (req: Request, res: Response) => {
    try {
      // For this demo we'll use userId 1 as we don't have authentication
      const userId = 1;
      
      // Extract story data and validate
      const storyData = {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        userId,
        characterPhotos: (req.files as Express.Multer.File[])?.map(file => 
          `data:${file.mimetype};base64,${file.buffer.toString('base64')}`)
      };

      // Validate the data
      const validatedData = insertStorySchema.parse(storyData);
      
      // Save the story
      const story = await storage.createStory(validatedData);
      
      // Generate a preview (in a real app, this might be a separate process)
      // For demo purposes, we'll just simulate this by setting the flag
      await storage.updateStoryPreviewStatus(story.id, true);
      
      res.status(201).json(story);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid story data", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating story:", error);
        res.status(500).json({ message: "Failed to create story" });
      }
    }
  });

  // Get stories
  app.get("/api/stories", async (req, res) => {
    try {
      // For demo, we'll use userId 1
      const userId = 1;
      const stories = await storage.getStoriesByUserId(userId);
      res.json(stories);
    } catch (error) {
      console.error("Error fetching stories:", error);
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  });

  // Get a specific story
  app.get("/api/stories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const story = await storage.getStory(id);
      
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      
      res.json(story);
    } catch (error) {
      console.error("Error fetching story:", error);
      res.status(500).json({ message: "Failed to fetch story" });
    }
  });

  // Purchase a story
  app.post("/api/stories/:id/purchase", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const story = await storage.getStory(id);
      
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      
      // Mock payment processing - in a real app, this would integrate with a payment provider
      // For demo, we'll just mark the story as purchased
      
      const updatedStory = await storage.updateStoryPurchaseStatus(id, true);
      res.json(updatedStory);
    } catch (error) {
      console.error("Error purchasing story:", error);
      res.status(500).json({ message: "Failed to process purchase" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
