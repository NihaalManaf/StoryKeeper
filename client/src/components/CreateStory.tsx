import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import ContactModal from "./ContactModal";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileInput } from "@/components/ui/file-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const storyFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  category: z.string().min(1, {
    message: "Please select a category",
  }),
  content: z.string().min(50, {
    message: "Story must be at least 50 characters long",
  }),
});

type StoryFormValues = z.infer<typeof storyFormSchema>;

export default function CreateStory() {
  const [characterPhotos, setCharacterPhotos] = useState<File[]>([]);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [newStoryId, setNewStoryId] = useState<number | null>(null);
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });
  
  const submitStoryMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/stories", null, {
        body: data,
        headers: {}, // Don't set Content-Type when sending FormData
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Story Created!",
        description: "Your story has been saved. Let's collect your contact information.",
      });
      
      // Store the new story ID and open the contact modal
      setNewStoryId(data.id);
      setContactModalOpen(true);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create story: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(data: StoryFormValues) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("content", data.content);
    
    // Add any character photos
    characterPhotos.forEach((file) => {
      formData.append("characterPhotos", file);
    });
    
    submitStoryMutation.mutate(formData);
  }
  
  const handlePhotoUpload = (index: number, files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "File size should not exceed 5MB",
          variant: "destructive",
        });
        return;
      }
      
      // Create a new array with the updated file at the specified index
      const newPhotos = [...characterPhotos];
      newPhotos[index] = file;
      setCharacterPhotos(newPhotos);
      
      toast({
        title: "Photo Uploaded",
        description: `Character ${index + 1} photo added!`,
      });
    }
  };
  
  return (
    <section id="create-story" className="py-20 bg-[#FF6B6B] bg-opacity-5 relative overflow-hidden">
      <div className="absolute -top-48 -left-48 w-96 h-96 bg-[#FF6B6B] opacity-10 rounded-full"></div>
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-[#4ECDC4] opacity-10 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-['Quicksand'] mb-4">Create Your Story</h2>
          <p className="text-xl max-w-2xl mx-auto text-gray-600">Begin your journey to create a cherished keepsake for your family</p>
        </div>
        
        <div className="bg-white p-8 md:p-10 rounded-[12px] shadow-xl max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#2D3436] font-bold font-['Quicksand']">Story Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="My Magical Adventure" 
                        className="px-4 py-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#2D3436] font-bold font-['Quicksand']">Story Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="px-4 py-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="animals">Animals & Nature</SelectItem>
                        <SelectItem value="family">Family Moments</SelectItem>
                        <SelectItem value="holidays">Holidays & Celebrations</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#2D3436] font-bold font-['Quicksand']">Your Story</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Once upon a time..." 
                        rows={6}
                        className="px-4 py-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                        {...field} 
                      />
                    </FormControl>
                    <p className="text-sm text-gray-500 mt-2">Write your story in simple sentences. Our illustrators will bring it to life!</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <label className="block text-[#2D3436] font-bold mb-2 font-['Quicksand']">Character Photos (Optional)</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                    <div 
                      key={index}
                      className="border-2 border-dashed border-gray-300 rounded-[12px] p-4 text-center hover:border-[#4ECDC4] transition duration-300 bg-white"
                    >
                      <div className="mb-3 w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        {characterPhotos[index] ? (
                          <img 
                            src={URL.createObjectURL(characterPhotos[index])} 
                            alt={`Character ${index + 1}`}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                      </div>
                      <p className="font-medium mb-2">{index === 0 ? 'Main Character' : index === 1 ? 'Second Character' : 'Third Character'}</p>
                      <div className="relative">
                        <FileInput 
                          id={`character-${index}`}
                          className="hidden"
                          accept="image/jpeg, image/png, image/jpg"
                          onFilesSelected={(files) => handlePhotoUpload(index, files)}
                        />
                        <label 
                          htmlFor={`character-${index}`}
                          className="text-[#4ECDC4] font-bold text-sm cursor-pointer"
                        >
                          + Upload Photo
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">Photos will be used to personalize character appearances in your story.</p>
              </div>
              
              <div className="text-center">
                <Button 
                  type="submit" 
                  className="bg-[#FF6B6B] text-white font-bold py-4 px-10 rounded-[12px] shadow-lg hover:shadow-xl transition duration-300 h-auto"
                  disabled={submitStoryMutation.isPending}
                >
                  {submitStoryMutation.isPending ? 'Generating Preview...' : 'Generate Preview'}
                </Button>
                <p className="text-sm text-gray-500 mt-3">Free preview shows your first 2 pages. No payment required.</p>
              </div>
            </form>
          </Form>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        storyId={newStoryId as number}
        onComplete={() => {
          // After contact form is submitted, navigate to the preview page
          if (newStoryId) {
            navigate(`/preview/${newStoryId}`);
          }
        }}
      />
    </section>
  );
}
