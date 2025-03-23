import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Send, X } from 'lucide-react';

interface ChatMessage {
  id: number;
  storyId: number;
  userId: number;
  isEditor: boolean;
  message: string;
  createdAt: string;
}

interface ChatPanelProps {
  storyId: number;
}

export default function ChatPanel({ storyId }: ChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isEditor, setIsEditor] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch chat messages
  const { data: messages = [] } = useQuery<ChatMessage[]>({
    queryKey: ['/api/stories', storyId, 'chat'],
    queryFn: async () => {
      const res = await fetch(`/api/stories/${storyId}/chat`);
      if (!res.ok) throw new Error('Failed to fetch messages');
      return res.json();
    },
    enabled: isOpen,
    refetchInterval: isOpen ? 3000 : false // Poll for new messages when chat is open
  });

  // Send a message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      const response = await apiRequest("POST", `/api/stories/${storyId}/chat`, {
        message: messageText,
        isEditor
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/stories', storyId, 'chat'] });
      setNewMessage('');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to send message: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessageMutation.mutate(newMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 flex items-center justify-center bg-[#FF6B6B] hover:bg-[#ff5252] shadow-lg"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 z-50">
      {/* Chat header */}
      <div className="p-3 bg-[#FF6B6B] text-white flex justify-between items-center">
        <h3 className="font-bold">Story Feedback</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <span className="text-xs">Editor Mode</span>
            <input 
              type="checkbox" 
              checked={isEditor} 
              onChange={(e) => setIsEditor(e.target.checked)}
              className="rounded text-[#4ECDC4]"
            />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0 text-white hover:bg-[#ff5252] hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 h-full flex flex-col justify-center">
            <p>No messages yet.</p>
            <p className="text-sm">Start a conversation about your story!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isEditor ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex ${message.isEditor ? 'flex-row' : 'flex-row-reverse'} items-start gap-2 max-w-[80%]`}>
                <Avatar className={`h-8 w-8 ${message.isEditor ? 'bg-[#4ECDC4]' : 'bg-[#FF6B6B]'}`}>
                  <AvatarFallback>{message.isEditor ? 'ED' : 'ME'}</AvatarFallback>
                </Avatar>
                <div>
                  <div 
                    className={`rounded-lg p-3 ${
                      message.isEditor 
                        ? 'bg-[#4ECDC4] bg-opacity-10 text-gray-800' 
                        : 'bg-[#FF6B6B] bg-opacity-10 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(message.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex space-x-2 items-end">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 resize-none min-h-[60px] max-h-[120px] p-2 rounded-md border-gray-300 focus:border-[#FF6B6B] focus:ring-1 focus:ring-[#FF6B6B]"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sendMessageMutation.isPending}
            className="bg-[#FF6B6B] hover:bg-[#ff5252] h-10 w-10 p-0 rounded-full"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}