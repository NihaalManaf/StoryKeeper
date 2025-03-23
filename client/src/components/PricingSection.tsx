import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const pricingPlans = [
  {
    name: "Storybook Basic",
    description: "Perfect for a simple story with minimal customization",
    price: 29,
    features: [
      { name: "20-page illustrated book", included: true },
      { name: "Standard character styles", included: true },
      { name: "Digital preview (2 pages)", included: true },
      { name: "Softcover printing", included: true },
      { name: "Photo personalization", included: false },
      { name: "Digital copy included", included: false },
    ],
    popular: false,
    buttonText: "Choose Basic",
  },
  {
    name: "Storybook Premium",
    description: "Full customization with photo personalization",
    price: 49,
    features: [
      { name: "30-page illustrated book", included: true },
      { name: "Custom character designs", included: true },
      { name: "Digital preview (5 pages)", included: true },
      { name: "Hardcover printing", included: true },
      { name: "Photo personalization", included: true },
      { name: "Digital copy included", included: true },
    ],
    popular: true,
    buttonText: "Choose Premium",
  },
  {
    name: "Storybook Deluxe",
    description: "Our finest quality with special extras",
    price: 79,
    features: [
      { name: "40-page illustrated book", included: true },
      { name: "Premium character designs", included: true },
      { name: "Full digital preview", included: true },
      { name: "Hardcover Printing", included: true },
      { name: "Advanced photo personalization", included: true },
      { name: "Digital version", included: true },
    ],
    popular: false,
    buttonText: "Choose Deluxe",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-['Quicksand'] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-gray-600">
            Choose the perfect package for your family's story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-[12px] shadow-lg overflow-hidden transition duration-500 hover:shadow-xl ${
                plan.popular
                  ? "md:-translate-y-4 scale-105 shadow-2xl relative"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#FF6B6B] text-white px-4 py-1 font-bold">
                  Most Popular
                </div>
              )}
              <div className="p-8 border-b">
                <h3 className="text-2xl font-bold font-['Quicksand'] mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 ml-2">/ book</span>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-[#4ECDC4] mr-2" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mr-2" />
                      )}
                      <span className={feature.included ? "" : "text-gray-400"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-8 ${
                    plan.popular
                      ? "bg-[#FF6B6B] text-white"
                      : "border-2 border-[#FF6B6B] text-[#FF6B6B] bg-transparent hover:bg-[#FF6B6B] hover:text-white"
                  } font-bold py-3 rounded-[12px] transition duration-300 h-auto`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
