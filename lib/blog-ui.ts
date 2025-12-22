import { BlogPost } from "./types";

export const categoryImages = {
  travel: [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
  ],
  culture: [
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  ],
  lifestyle: [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  ],
  food: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561b1a?w=800&q=80",
  ],
};

export const gradientColors = {
  travel: ["#dc2626", "#991b1b"],
  culture: ["#ef4444", "#dc2626"],
  lifestyle: ["#f87171", "#dc2626"],
  food: ["#fca5a5", "#ef4444"],
};

export function createGradientStyle(category: keyof typeof gradientColors) {
  const [c1, c2] = gradientColors[category] || gradientColors.travel;
  return `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
}

export function getCategoryImage(
  category: keyof typeof categoryImages,
  index = 0
) {
  const images = categoryImages[category] || categoryImages.travel;
  return images[index % images.length];
}
