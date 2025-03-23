import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Book, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatPanel from "@/components/ChatPanel";
import ContactModal from "@/components/ContactModal";

interface Story {
  id: number;
  title: string;
  category: string;
  content: string;
  characterPhotos?: string[];
  userId: number;
  previewGenerated: boolean;
  purchased: boolean;
  createdAt: string;
}

export default function StoryPreview() {
  const { id } = useParams<{ id: string }>();
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(0);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [isFromAdmin, setIsFromAdmin] = useState(false);
  
  // Check if user navigated from admin page
  useEffect(() => {
    // We can use document.referrer, sessionStorage, or just provide a way to pass this info
    // For simplicity, we'll check if the user got here by clicking our admin preview button
    const referrer = document.referrer;
    const fromAdminPage = referrer.includes('/admin/contact-submissions') || 
                          sessionStorage.getItem('fromAdmin') === 'true';
    
    if (fromAdminPage) {
      setIsFromAdmin(true);
      // Store this in session storage in case of page refresh
      sessionStorage.setItem('fromAdmin', 'true');
    }
  }, []);
  
  const { data: story, isLoading, error } = useQuery<Story>({
    queryKey: [`/api/stories/${id}`],
  });
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load your story preview.",
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#FF6B6B] border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-2xl font-['Quicksand'] font-bold">Loading your preview...</h2>
          <p className="text-gray-600 mt-2">This will just take a moment</p>
        </div>
      </div>
    );
  }
  
  if (!story) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <AlertCircle className="h-16 w-16 text-[#FF6B6B] mb-4" />
            <h2 className="text-2xl font-['Quicksand'] font-bold mb-2">Story Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find the story you're looking for.</p>
            <Button onClick={() => navigate('/')} className="bg-[#4ECDC4]">
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Generate mock preview pages
  const previewPages = [
    {
      text: "Once upon a time in a land not so far away...",
      image: "cover"
    },
    {
      text: story.content.split('.')[0] + ".",
      image: "page1"
    }
  ];
  
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < previewPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePurchase = () => {
    navigate(`/checkout/${id}`);
  };
  
  const handleGeneratePreview = () => {
    setContactModalOpen(true);
  };
  
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          {isFromAdmin ? (
            <Button 
              onClick={() => {
                navigate('/admin/contact-submissions');
                // Clear the from admin flag when navigating away
                sessionStorage.removeItem('fromAdmin');
              }} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Submissions
            </Button>
          ) : (
            <Button 
              onClick={() => navigate('/')} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          )}
          
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-['Quicksand'] font-bold mb-2">{story.title}</h2>
            <p className="text-gray-600">Preview your personalized storybook (2 pages of {story.purchased ? 'your complete book' : 'preview'})</p>
          </div>
          
          <div className="w-[120px]"></div> {/* Spacer div for alignment */}
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center rounded-full bg-[#4ECDC4] bg-opacity-20 px-4 py-1 text-sm font-medium text-[#4ECDC4]">
            <span className="capitalize">{story.category}</span>
          </div>
        </div>
        
        {/* Two-column layout for book preview and chat */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
          {/* Book preview column - takes 2/3 of available space on large screens */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="relative bg-white rounded-[12px] shadow-xl overflow-hidden flex-grow" style={{ minHeight: "450px" }}>
              {/* Book viewer */}
              <div className="h-full bg-gray-100 relative flex items-center justify-center">
                <svg className="w-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100%" height="100%" fill="#ffffff" />
                  <g transform="translate(400, 200)">
                    <rect x="-320" y="-180" width="640" height="360" rx="8" fill="#f8f9fa" stroke="#e9ecef" />
                    <text 
                      x="0" 
                      y="0" 
                      dominantBaseline="middle" 
                      textAnchor="middle" 
                      fontFamily="Quicksand" 
                      fontSize="24" 
                      fill="#2D3436"
                    >
                      {currentPage === 0 ? story.title : `Page ${currentPage}`}
                    </text>
                    <text 
                      x="0" 
                      y="40" 
                      dominantBaseline="middle" 
                      textAnchor="middle" 
                      fontFamily="Open Sans" 
                      fontSize="16" 
                      fill="#495057"
                    >
                      {previewPages[currentPage].text}
                    </text>
                  </g>
                </svg>
              </div>
              
              {/* Navigation controls */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-white shadow-md"
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-white shadow-md"
                  onClick={handleNextPage}
                  disabled={currentPage === previewPages.length - 1}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Page indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {previewPages.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full ${index === currentPage ? 'bg-[#FF6B6B]' : 'bg-gray-300'}`}
                    onClick={() => setCurrentPage(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Chat panel column - takes 1/3 of available space on large screens */}
          <div className="lg:col-span-1 flex flex-col" style={{ minHeight: "450px" }}>
            {story && <ChatPanel storyId={story.id} />}
          </div>
        </div>
        
        {/* Purchase section - centered under both columns */}
        <div className="mt-8 text-center">
          {story.purchased ? (
            <div className="p-4 bg-green-100 text-green-800 rounded-[12px] inline-flex items-center gap-2 mb-4">
              <Book className="h-5 w-5" />
              <span>You've purchased this book! Your complete story is available.</span>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                This is a preview of your first 2 pages. Purchase your complete book to see the full story beautifully illustrated with your characters!
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={handleGeneratePreview}
                  className="bg-[#4ECDC4] text-white font-bold py-4 px-8 rounded-[12px] shadow-lg hover:shadow-xl transition duration-300 h-auto"
                >
                  Generate Full Preview
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Note: We're currently in the testing phase. Purchase functionality will be available soon.
              </p>
            </>
          )}
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)}
        storyId={parseInt(id)}
        onComplete={() => {
          toast({
            title: "Preview Generation Started",
            description: "We're working on your full preview. We'll notify you when it's ready!",
            variant: "default",
          });
        }}
      />
    </div>
  );
}
