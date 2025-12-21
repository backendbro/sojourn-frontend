export const blogPosts = [
  {
    id: 1,
    title: "Discovering Hidden Gems in West Africa",
    excerpt:
      "A journey through the vibrant markets, rich cultures, and breathtaking landscapes that make West Africa a traveler's paradise.",
    category: "travel",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    featured: true,
  },
  {
    id: 2,
    title: "The Art of Slow Living: Lessons from Rural Communities",
    excerpt:
      "What we can learn from communities that prioritize connection, simplicity, and mindfulness in their daily lives.",
    category: "lifestyle",
    author: "Michael Chen",
    date: "March 12, 2024",
    featured: false,
  },
  {
    id: 3,
    title: "Street Food Adventures: A Culinary Journey Through Lagos",
    excerpt:
      "Exploring the diverse and delicious street food scene in Nigeria's bustling commercial capital.",
    category: "food",
    author: "Amina Okafor",
    date: "March 10, 2024",
    featured: false,
  },
  {
    id: 4,
    title: "Traditional Festivals: Celebrating Heritage and Community",
    excerpt:
      "An exploration of how traditional festivals bring communities together and preserve cultural identity.",
    category: "culture",
    author: "David Okonkwo",
    date: "March 8, 2024",
    featured: false,
  },
  {
    id: 5,
    title: "Mountain Hiking: Finding Peace Above the Clouds",
    excerpt:
      "A personal account of hiking adventures and the mental clarity that comes from challenging physical pursuits.",
    category: "travel",
    author: "Emma Williams",
    date: "March 5, 2024",
    featured: false,
  },
];

export const placeholderImages: Record<string, string[]> = {
  travel: [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  ],
  culture: [
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
  ],
  lifestyle: [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
  ],
  food: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  ],
};

export function getGradient(category: string) {
  const gradients: Record<string, string> = {
    travel: "linear-gradient(135deg, #dc2626, #991b1b)",
    culture: "linear-gradient(135deg, #ef4444, #dc2626)",
    lifestyle: "linear-gradient(135deg, #f87171, #dc2626)",
    food: "linear-gradient(135deg, #fca5a5, #ef4444)",
  };
  return gradients[category] || gradients.travel;
}
