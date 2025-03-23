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
              <span className="text-[#FF6B6B]"> Magical </span>
              Children's Books
            </h2>
            <p className="text-lg mb-8 font-['Open_Sans']">
              Preserve your family's precious memories as beautifully
              illustrated children's books that will be treasured for
              generations. Personalize characters your characers with images
              too!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#create-story">
                <Button className="bg-[#FF6B6B] text-white font-bold py-4 px-8 rounded-[12px] text-center shadow-lg hover:shadow-xl transition duration-300 h-auto w-full sm:w-auto">
                  Create Your Story
                </Button>
              </a>
              <a href="#how-it-works">
                <Button
                  variant="outline"
                  className="border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold py-4 px-8 rounded-[12px] text-center hover:bg-[#4ECDC4] hover:text-white transition duration-300 h-auto w-full sm:w-auto"
                >
                  See How It Works
                </Button>
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            {/* Main hero image */}
            <div className="relative z-10 rounded-[12px] overflow-hidden shadow-2xl animate-[float_6s_ease-in-out_infinite]">
              <img
                src="https://cdn.discordapp.com/attachments/849286462315036732/1353300524753227787/young-asian-mother-sitting-couch-home-reading-story-to-two-little-children-asian-mother-reading-story-to-two-children-106137934.png?ex=67e126d4&is=67dfd554&hm=454bc6a262da13957a32e537e8a07a1953e6ee763be630a97cee7b338d841a4b&"
                alt="Mother reading with her children"
                className="w-full h-auto rounded-[12px]"
              />
            </div>
            <div className="absolute -top-8 -right-5 z-0 w-32 h-32 bg-[#4ECDC4] rounded-full shadow-lg animate-[float_6s_ease-in-out_infinite]">
              {/* Decorative circle */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
