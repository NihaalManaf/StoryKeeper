import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail, Phone, User } from "lucide-react";

interface ContactSubmission {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  storyId: number | null;
  createdAt: string;
}

export default function ContactSubmissions() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const { data: submissions = [], isLoading, error } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/contact'],
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#FF6B6B] border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-2xl font-['Quicksand'] font-bold">Loading submissions...</h2>
          <p className="text-gray-600 mt-2">This will just take a moment</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <AlertCircle className="h-16 w-16 text-[#FF6B6B] mb-4" />
            <h2 className="text-2xl font-['Quicksand'] font-bold mb-2">Error Loading Submissions</h2>
            <p className="text-gray-600 mb-6">We couldn't load the contact submissions.</p>
            <Button onClick={() => navigate('/')} className="bg-[#4ECDC4]">
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-['Quicksand'] font-bold">Contact Submissions</h2>
            <p className="text-gray-600 mt-2">All inquiries received from the contact form</p>
          </div>
          <Button 
            onClick={() => navigate('/')} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
        
        {submissions.length === 0 ? (
          <Card>
            <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <Mail className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">No submissions yet</h3>
              <p className="text-gray-500 max-w-md">
                When users fill out the contact form, their submissions will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                {submissions.length} {submissions.length === 1 ? 'Submission' : 'Submissions'} Received
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium">Name</TableHead>
                      <TableHead className="font-medium">Email</TableHead>
                      <TableHead className="font-medium">Phone</TableHead>
                      <TableHead className="font-medium">Message</TableHead>
                      <TableHead className="font-medium">Story ID</TableHead>
                      <TableHead className="font-medium">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            {submission.name || 'Anonymous'}
                          </div>
                        </TableCell>
                        <TableCell>
                          {submission.email ? (
                            <a 
                              href={`mailto:${submission.email}`} 
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <Mail className="h-3 w-3" />
                              {submission.email}
                            </a>
                          ) : (
                            <span className="text-gray-500">Not provided</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {submission.phone ? (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-gray-500" />
                              {submission.phone}
                            </div>
                          ) : (
                            <span className="text-gray-500">Not provided</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {submission.message || 'No message'}
                        </TableCell>
                        <TableCell>
                          {submission.storyId ? (
                            <a 
                              href={`/story/${submission.storyId}`} 
                              className="text-blue-600 hover:underline"
                            >
                              {submission.storyId}
                            </a>
                          ) : (
                            <span className="text-gray-500">None</span>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(submission.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}