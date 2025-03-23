import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="py-24 bg-[#FF6B6B] text-white relative overflow-hidden">
      <div className="absolute -top-48 right-48 w-96 h-96 bg-white opacity-10 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-white opacity-10 rounded-full"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-['Quicksand'] mb-6">
            Ready to Create Your Family's Story?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Turn your special moments into magical books that will be treasured
            for generations
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#create-story">
              <Button className="bg-white text-[#FF6B6B] font-bold py-4 px-8 rounded-[12px] shadow-lg hover:shadow-xl hover:bg-[#FF6B6B] hover:text-white transition duration-300 h-auto w-full sm:w-auto border-2 border-white">
                Start Creating Now
              </Button>
            </a>
            <a href="#examples">
              <Button className="bg-white text-[#FF6B6B] font-bold py-4 px-8 rounded-[12px] shadow-lg hover:shadow-xl hover:bg-[#FF6B6B] hover:text-white transition duration-300 h-auto w-full sm:w-auto border-2 border-white">
                Browse Examples
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
