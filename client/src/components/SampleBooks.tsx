import { Button } from "@/components/ui/button";

const sampleBooks = [
  {
    id: 1,
    title: "The Forest Friends",
    category: "Adventure",
    description: "A magical adventure where Emma and her brother discover talking animals in their backyard forest.",
    authorName: "Sarah J.",
    authorComment: "My kids ask for this story every night!",
    image: "forest-friends"
  },
  {
    id: 2,
    title: "Journey to the Stars",
    category: "Space",
    description: "Liam dreams of being an astronaut, and one night his bedroom transforms into a spaceship!",
    authorName: "Michael T.",
    authorComment: "The personalized illustrations are amazing!",
    image: "space-journey"
  },
  {
    id: 3,
    title: "Mermaid's Treasure",
    category: "Ocean",
    description: "Sophia discovers she can talk to sea creatures during her family's beach vacation.",
    authorName: "Jessica K.",
    authorComment: "My daughter squealed when she saw herself as a mermaid!",
    image: "mermaid"
  }
];

const categoryColors = {
  "Adventure": "bg-[#4ECDC4] bg-opacity-20 text-[#4ECDC4]",
  "Space": "bg-[#FF6B6B] bg-opacity-20 text-[#FF6B6B]",
  "Ocean": "bg-[#FFE66D] bg-opacity-30 text-[#2D3436]"
};

export default function SampleBooks() {
  return (
    <section id="examples" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-['Quicksand'] mb-4">Magical Stories Created By Families Like Yours</h2>
          <p className="text-xl max-w-2xl mx-auto text-gray-600">Browse through some of our favorite books created by families on StoryKeeper</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleBooks.map((book) => (
            <div key={book.id} className="story-card bg-white rounded-[12px] shadow-lg overflow-hidden transition duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="h-56 overflow-hidden">
                <svg className="w-full h-full object-cover transition duration-300 hover:scale-105" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100%" height="100%" fill="#f8f9fa" />
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Quicksand" fontSize="20" fill="#2D3436">
                    {book.title} Illustration
                  </text>
                </svg>
              </div>
              <div className="p-6">
                <span className={`inline-block ${categoryColors[book.category as keyof typeof categoryColors]} px-3 py-1 rounded-full text-sm font-semibold mb-3`}>
                  {book.category}
                </span>
                <h3 className="text-xl font-bold font-['Quicksand'] mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-4">{book.description}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full mr-4 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-bold">{book.authorName.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{book.authorName}</p>
                    <p className="text-sm text-gray-500">"{book.authorComment}"</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="border-2 border-[#4ECDC4] text-[#4ECDC4] font-bold py-3 px-6 rounded-[12px] hover:bg-[#4ECDC4] hover:text-white transition duration-300">
            View More Stories
          </Button>
        </div>
      </div>
    </section>
  );
}
