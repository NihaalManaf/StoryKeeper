import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertStorySchema, insertChatMessageSchema, insertContactSubmissionSchema } from "@shared/schema";
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
      
      console.log("Request body:", req.body);
      console.log("Files:", req.files);
      
      // Extract story data and validate
      const storyData = {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        userId,
        characterPhotos: Array.isArray(req.files) && req.files.length > 0 
          ? [...req.files.map(file => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`)]
          : null
      };

      console.log("Story data prepared:", {
        title: storyData.title,
        category: storyData.category,
        content: storyData.content.substring(0, 50) + "...",
        userId: storyData.userId,
        hasPhotos: storyData.characterPhotos !== null
      });

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

  // Get chat messages for a specific story
  app.get("/api/stories/:id/chat", async (req, res) => {
    try {
      const storyId = parseInt(req.params.id);
      const story = await storage.getStory(storyId);
      
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      
      const messages = await storage.getChatMessagesByStoryId(storyId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  // Add a new chat message to a story
  app.post("/api/stories/:id/chat", async (req, res) => {
    try {
      const storyId = parseInt(req.params.id);
      const story = await storage.getStory(storyId);
      
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      
      // For this demo we'll use userId 1 as we don't have authentication
      const userId = 1;
      
      const messageData = {
        storyId,
        userId,
        isEditor: req.body.isEditor || false,
        message: req.body.message
      };
      
      // Validate the data
      const validatedData = insertChatMessageSchema.parse(messageData);
      
      // Save the message
      const message = await storage.createChatMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid message data", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating message:", error);
        res.status(500).json({ message: "Failed to create message" });
      }
    }
  });

  // Create a new contact submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        storyId: req.body.storyId ? parseInt(req.body.storyId) : null
      };
      
      console.log("Contact submission received:", {
        ...contactData,
        email: contactData.email ? "..." : null // Don't log full email for privacy
      });
      
      // Validate the data
      const validatedData = insertContactSubmissionSchema.parse(contactData);
      
      // Save the contact submission
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Contact information submitted successfully",
        id: submission.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid contact data", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating contact submission:", error);
        res.status(500).json({ message: "Failed to submit contact information" });
      }
    }
  });

  // Get all contact submissions (admin only route in a real app)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
