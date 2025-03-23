import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";

const faqs = [
  {
    question: "How are the books made?",
    answer:
      "We use a combination of AI and human illustrators to create your book. The AI is used to create the illustrations, and the human illustrators are used to create the final illustrations. The book is then printed and shipped to you.",
  },
  {
    question: "How long does it take to create my book?",
    answer:
      "From submission to delivery, the process typically takes 2-3 weeks. After you submit your story and photos, our illustrators need about 7-10 business days to create your custom illustrations. Then production and shipping takes another 5-7 business days.",
  },
  {
    question: "Can I edit my story after submitting it?",
    answer:
      "You can edit your the illustrations and story during the creation process. Once the book is created and payment is made, no more changes can be made.",
  },
  {
    question: "What photo requirements do you have?",
    answer:
      "For best results, upload clear, well-lit photos where faces are easily visible. We recommend front-facing portraits with minimal backgrounds. Photos should be at least 1000x1000 pixels in resolution. If you're unsure about your photos, our team will contact you if there are any issues with using them for character creation.",
  },
  {
    question: "Can I order additional copies later?",
    answer:
      "Absolutely! We keep your book on file for 3 years, so you can easily order additional copies at any time. Reprints cost slightly less than your original book (about 20% discount) since the illustration work is already complete. This makes it easy to share your special story with grandparents, other family members, or replace a well-loved copy.",
  },
];

export default function FaqSection() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <section id="faq" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-['Quicksand'] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-gray-600">
            Everything you need to know about our storybook creation process
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-[12px] shadow-md hover:shadow-lg transition duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-bold font-['Quicksand'] text-lg data-[state=open]:rounded-t-[12px] data-[state=closed]:rounded-[12px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Have more questions?</p>
          <Button
            onClick={() => setContactModalOpen(true)}
            className="bg-[#4ECDC4] text-white font-bold py-3 px-8 rounded-[12px] hover:bg-opacity-90 transition duration-300 h-auto"
          >
            Contact Our Support Team
          </Button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        onComplete={() => {
          setContactModalOpen(false);
        }}
      />
    </section>
  );
}
