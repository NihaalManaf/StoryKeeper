import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-['Quicksand'] mb-4">
            How It Works
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-gray-600">
            Create personalized storybooks in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-[12px] shadow-lg relative">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">
              1
            </div>
            <h3 className="text-2xl font-bold font-['Quicksand'] mb-4">
              Share Your Story
            </h3>
            <p className="text-gray-600">
              Write your family story or special memory in our simple editor. No
              writing experience needed!
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-[12px] shadow-lg relative">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#4ECDC4] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">
              2
            </div>
            <h3 className="text-2xl font-bold font-['Quicksand'] mb-4">
              Add Photos
            </h3>
            <p className="text-gray-600">
              Upload family photos to personalize the characters in your story
              and make it truly unique. This is optional.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-[12px] shadow-lg relative">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#FFE66D] rounded-full flex items-center justify-center text-[#2D3436] font-bold text-2xl shadow-md">
              3
            </div>
            <h3 className="text-2xl font-bold font-['Quicksand'] mb-4">
              Preview Your Book
            </h3>
            <p className="text-gray-600">
              See and edit a free preview of your first two pages beautifully
              illustrated with your characters to ensure you're happy with the
              story before we print it.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-8 rounded-[12px] shadow-lg relative">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">
              4
            </div>
            <h3 className="text-2xl font-bold font-['Quicksand'] mb-4">
              Order Your Book
            </h3>
            <p className="text-gray-600">
              Purchase your complete storybook and receive a beautiful printed
              copy delivered to your door within 3-4 weeks.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="#create-story">
            <Button className="bg-[#4ECDC4] text-white font-bold py-4 px-8 rounded-[12px] shadow-lg hover:shadow-xl transition duration-300 h-auto">
              Start Your Story Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
