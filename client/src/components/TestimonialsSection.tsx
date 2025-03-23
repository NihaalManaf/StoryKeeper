import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "My son's face lit up when he saw himself as the main character in our family camping story. It's become his favorite bedtime book, and I love how it preserves our special memory.",
    authorName: "Jennifer R.",
    authorRole: "Mother of two",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    text: "We created a book about our family's adoption journey to help explain it to our daughter. The illustrations captured our emotions perfectly, and now we have a beautiful way to share our story.",
    authorName: "David M.",
    authorRole: "Father of one",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    text: "I created a book about my grandmother's childhood stories that she used to tell me. Now that she's gone, this book helps keep her memory alive for my own children. The quality exceeded my expectations.",
    authorName: "Sophia T.",
    authorRole: "Mother of three",
    image:
      "https://images.unsplash.com/photo-1554727242-741c14fa561c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-['Quicksand'] mb-4">
            What Families Are Saying
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-gray-600">
            Hear from parents who have created lasting memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-[12px] shadow-lg"
            >
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-[#FFE66D] fill-[#FFE66D]"
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.authorName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">{testimonial.authorName}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.authorRole}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
