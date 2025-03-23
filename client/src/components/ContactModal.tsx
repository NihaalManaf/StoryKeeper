import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyId?: number;
  onComplete?: () => void;
}

export default function ContactModal({
  isOpen,
  onClose,
  storyId,
  onComplete,
}: ContactModalProps) {
  const { toast } = useToast();
  const [isClosed, setIsClosed] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await apiRequest("POST", "/api/contact", {
        ...data,
        storyId,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description:
          "We've received your information and will get back to you soon.",
        variant: "default",
      });
      form.reset();
      handleClose();
      if (onComplete) onComplete();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to submit your information: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  const handleClose = () => {
    setIsClosed(true);
    onClose();
  };

  // Always submit contact info (even empty) to notify admin when someone clicked "Generate Preview"
  const handleSkip = () => {
    contactMutation.mutate({
      name: "Anonymous User",
      email: "no-email-provided@example.com",
      phone: "",
      message: "User skipped the contact form",
    });
  };

  return (
    <Dialog open={isOpen && !isClosed} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-[12px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Contact Information
          </DialogTitle>
          <DialogDescription className="text-center">
            Please fill in your details below or email us directly at{" "}
            <a
              href="mailto:nihaalmanaf@gmail.com"
              className="text-blue-600 font-semibold hover:underline"
            >
              nihaalmanaf@gmail.com
            </a>
            . We'll get back to you as soon as possible!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...form.register("name")}
              className="w-full"
              placeholder="Your name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              className="w-full"
              placeholder="your.email@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              {...form.register("phone")}
              className="w-full"
              placeholder="Your phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              {...form.register("message")}
              className="w-full min-h-[100px]"
              placeholder="Tell us about your story idea or any questions you have"
            />
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleSkip}
              className="w-full sm:w-auto"
              disabled={contactMutation.isPending}
            >
              Skip for now
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-[#FF6B6B] hover:bg-[#ff5252]"
              disabled={contactMutation.isPending}
            >
              {contactMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
