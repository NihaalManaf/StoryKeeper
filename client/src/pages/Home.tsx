import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import SampleBooks from "@/components/SampleBooks";
import CreateStory from "@/components/CreateStory";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <div className="bg-white">
      <Analytics />
      <HeroSection />
      <HowItWorks />
      <SampleBooks />
      <CreateStory />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
