import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-[#FF6B6B] font-['Quicksand']">StoryKeeper</a>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="font-medium text-[#2D3436] hover:text-[#FF6B6B] transition duration-300">
              How It Works
            </a>
            <a href="#examples" className="font-medium text-[#2D3436] hover:text-[#FF6B6B] transition duration-300">
              Examples
            </a>
            <a href="#pricing" className="font-medium text-[#2D3436] hover:text-[#FF6B6B] transition duration-300">
              Pricing
            </a>
            <a href="#faq" className="font-medium text-[#2D3436] hover:text-[#FF6B6B] transition duration-300">
              FAQ
            </a>
            <a href="#create-story">
              <Button className="font-medium bg-[#FF6B6B] text-white px-5 py-2 rounded-[12px] hover:bg-opacity-90 transition duration-300">
                Get Started
              </Button>
            </a>
          </div>
          
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#2D3436]">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-6 mt-8">
                  <a 
                    href="#how-it-works" 
                    className="font-medium text-[#2D3436] hover:text-[#FF6B6B] text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    How It Works
                  </a>
                  <a 
                    href="#examples" 
                    className="font-medium text-[#2D3436] hover:text-[#FF6B6B] text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Examples
                  </a>
                  <a 
                    href="#pricing" 
                    className="font-medium text-[#2D3436] hover:text-[#FF6B6B] text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </a>
                  <a 
                    href="#faq" 
                    className="font-medium text-[#2D3436] hover:text-[#FF6B6B] text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    FAQ
                  </a>
                  <a href="#create-story" onClick={() => setIsOpen(false)}>
                    <Button className="w-full font-medium bg-[#FF6B6B] text-white px-5 py-2 rounded-[12px] hover:bg-opacity-90 transition duration-300">
                      Get Started
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
