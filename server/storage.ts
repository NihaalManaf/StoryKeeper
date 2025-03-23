import { 
  users, type User, type InsertUser,
  stories, type Story, type InsertStory 
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getStory(id: number): Promise<Story | undefined>;
  getStoriesByUserId(userId: number): Promise<Story[]>;
  createStory(story: InsertStory): Promise<Story>;
  updateStoryPreviewStatus(id: number, previewGenerated: boolean): Promise<Story | undefined>;
  updateStoryPurchaseStatus(id: number, purchased: boolean): Promise<Story | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stories: Map<number, Story>;
  currentUserId: number;
  currentStoryId: number;

  constructor() {
    this.users = new Map();
    this.stories = new Map();
    this.currentUserId = 1;
    this.currentStoryId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getStory(id: number): Promise<Story | undefined> {
    return this.stories.get(id);
  }

  async getStoriesByUserId(userId: number): Promise<Story[]> {
    return Array.from(this.stories.values()).filter(
      (story) => story.userId === userId,
    );
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.currentStoryId++;
    const createdAt = new Date().toISOString();
    
    // Ensure characterPhotos is properly handled as string[] | null
    const characterPhotos = insertStory.characterPhotos || null;
    
    const story: Story = { 
      ...insertStory, 
      characterPhotos,
      id, 
      previewGenerated: false, 
      purchased: false, 
      createdAt 
    };
    this.stories.set(id, story);
    return story;
  }

  async updateStoryPreviewStatus(id: number, previewGenerated: boolean): Promise<Story | undefined> {
    const story = await this.getStory(id);
    if (!story) return undefined;
    
    const updatedStory = { ...story, previewGenerated };
    this.stories.set(id, updatedStory);
    return updatedStory;
  }

  async updateStoryPurchaseStatus(id: number, purchased: boolean): Promise<Story | undefined> {
    const story = await this.getStory(id);
    if (!story) return undefined;
    
    const updatedStory = { ...story, purchased };
    this.stories.set(id, updatedStory);
    return updatedStory;
  }
}

export const storage = new MemStorage();
