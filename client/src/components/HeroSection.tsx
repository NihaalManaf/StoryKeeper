import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#4ECDC4] rounded-full opacity-20 blur-[40px] z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FFE66D] rounded-full opacity-20 blur-[40px] z-0"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0 z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-['Quicksand'] mb-6">
              Turn Your Family Stories Into 
              <span className="text-[#FF6B6B]"> Magical</span> 
              Children's Books
            </h2>
            <p className="text-lg mb-8 font-['Open_Sans']">
              Preserve your family's precious moments as beautifully illustrated children's books that will be treasured for generations. Personalize characters with your family photos!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#create-story">
                <Button className="bg-[#FF6B6B] text-white font-bold py-4 px-8 rounded-[12px] text-center shadow-lg hover:shadow-xl transition duration-300 h-auto w-full sm:w-auto">
                  Create Your Story
                </Button>
              </a>
              <a href="#how-it-works">
                <Button variant="outline" className="border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold py-4 px-8 rounded-[12px] text-center hover:bg-[#4ECDC4] hover:text-white transition duration-300 h-auto w-full sm:w-auto">
                  See How It Works
                </Button>
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            {/* Main hero image */}
            <div className="relative z-10 rounded-[12px] overflow-hidden shadow-2xl animate-[float_6s_ease-in-out_infinite]">
              <svg className="w-full h-auto rounded-[12px] bg-gray-200" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f8f9fa" />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Quicksand" fontSize="24" fill="#2D3436">
                  Parent reading to child
                </text>
              </svg>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 z-20 w-36 h-36 bg-[#FFE66D] rounded-[12px] shadow-lg transform -rotate-12 animate-[float_8s_ease-in-out_infinite]">
              <svg className="w-full h-full object-cover rounded-[12px]" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#FFE66D" />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Quicksand" fontSize="16" fill="#2D3436">
                  Open colorful book
                </text>
              </svg>
            </div>
            <div className="absolute -top-8 -right-5 z-0 w-32 h-32 bg-[#4ECDC4] rounded-full shadow-lg animate-[float_6s_ease-in-out_infinite]">
              {/* Decorative circle */}
            </div>
          </div>
        </div>
        
        {/* Trusted By section */}
        <div className="mt-20 text-center">
          <p className="text-[#2D3436] text-lg font-medium mb-8">Trusted by thousands of happy families</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="w-24 h-12 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300">
              <span className="font-['Quicksand'] font-bold text-xl">ParentMag</span>
            </div>
            <div className="w-24 h-12 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300">
              <span className="font-['Quicksand'] font-bold text-xl">KidsTimes</span>
            </div>
            <div className="w-24 h-12 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300">
              <span className="font-['Quicksand'] font-bold text-xl">FamilyPlus</span>
            </div>
            <div className="w-24 h-12 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300">
              <span className="font-['Quicksand'] font-bold text-xl">StoryKeeper</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
