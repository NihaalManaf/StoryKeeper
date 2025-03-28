import { 
  users, type User, type InsertUser,
  stories, type Story, type InsertStory,
  chatMessages, type ChatMessage, type InsertChatMessage,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission
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
  
  getChatMessagesByStoryId(storyId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stories: Map<number, Story>;
  private chatMessages: Map<number, ChatMessage>;
  private contactSubmissions: Map<number, ContactSubmission>;
  currentUserId: number;
  currentStoryId: number;
  currentChatMessageId: number;
  currentContactSubmissionId: number;

  constructor() {
    this.users = new Map();
    this.stories = new Map();
    this.chatMessages = new Map();
    this.contactSubmissions = new Map();
    this.currentUserId = 1;
    this.currentStoryId = 1;
    this.currentChatMessageId = 1;
    this.currentContactSubmissionId = 1;
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
    const characterPhotos = insertStory.characterPhotos 
      ? Array.isArray(insertStory.characterPhotos) 
        ? insertStory.characterPhotos as string[]
        : Array.from(insertStory.characterPhotos) as string[]
      : null;
    
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
  
  async getChatMessagesByStoryId(storyId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter((message) => message.storyId === storyId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }
  
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const createdAt = new Date().toISOString();
    
    // Ensure isEditor is properly handled
    const isEditor = insertMessage.isEditor === undefined ? false : insertMessage.isEditor;
    
    const message: ChatMessage = {
      ...insertMessage,
      isEditor,
      id,
      createdAt
    };
    
    this.chatMessages.set(id, message);
    return message;
  }
  
  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactSubmissionId++;
    const createdAt = new Date().toISOString();
    
    const submission: ContactSubmission = {
      id,
      name: insertSubmission.name || null,
      email: insertSubmission.email || null,
      phone: insertSubmission.phone || null,
      message: insertSubmission.message || null,
      storyId: insertSubmission.storyId || null,
      createdAt
    };
    
    this.contactSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
