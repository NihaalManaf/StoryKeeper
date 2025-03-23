import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, ChevronsRight } from "lucide-react";

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

export default function Checkout() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { data: story, isLoading, error } = useQuery<Story>({
    queryKey: [`/api/stories/${id}`],
  });
  
  const purchaseMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/stories/${id}/purchase`);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`/api/stories/${id}`] });
      
      toast({
        title: "Purchase Successful!",
        description: "Your storybook will be delivered soon.",
      });
      
      // Simulate payment processing
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        navigate(`/preview/${id}`);
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "Payment Failed",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#FF6B6B] border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-2xl font-['Quicksand'] font-bold">Loading checkout...</h2>
        </div>
      </div>
    );
  }
  
  if (error || !story) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-['Quicksand']">Checkout Error</CardTitle>
            <CardDescription>We couldn't find the story you're trying to purchase.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate('/')} className="w-full">
              Return Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (story.purchased) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-['Quicksand']">Already Purchased</CardTitle>
            <CardDescription>You've already purchased this storybook!</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/')}>
              Create Another Story
            </Button>
            <Button onClick={() => navigate(`/preview/${id}`)}>
              View Your Book
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    purchaseMutation.mutate();
  };
  
  // Calculate price based on the selected package (using "premium" as default for demo)
  const packagePrice = 49;
  const shippingPrice = 4.99;
  const totalPrice = packagePrice + shippingPrice;
  
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-['Quicksand'] font-bold mb-2">Checkout</h2>
          <p className="text-gray-600">Complete your purchase to receive your full storybook</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">{story.title}</span>
                <span>${packagePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Storybook Premium Package</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">What's included:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 30-page illustrated book</li>
                  <li>• Custom character designs</li>
                  <li>• Hardcover printing</li>
                  <li>• Photo personalization</li>
                  <li>• Digital copy included</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Complete your payment to receive your storybook</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-['Quicksand'] font-medium">Shipping Address</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" required />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required />
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" required />
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>
                
                <Separator />
                
                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-['Quicksand'] font-medium">Payment Method</h3>
                  
                  <RadioGroup 
                    defaultValue="credit-card" 
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Credit Card
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <Label htmlFor="expMonth">Month</Label>
                          <Input id="expMonth" placeholder="MM" required />
                        </div>
                        <div className="col-span-1">
                          <Label htmlFor="expYear">Year</Label>
                          <Input id="expYear" placeholder="YY" required />
                        </div>
                        <div className="col-span-1">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input id="nameOnCard" required />
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate(`/preview/${id}`)}>
                Back to Preview
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isProcessing || purchaseMutation.isPending}
                className="bg-[#FF6B6B]"
              >
                {isProcessing || purchaseMutation.isPending ? (
                  <div className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Complete Purchase 
                    <ChevronsRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
