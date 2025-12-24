// import { BlogPost } from "./types";

// export const categoryImages = {
//   travel: [
//     "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
//     "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
//     "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
//   ],
//   culture: [
//     "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
//     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
//     "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
//   ],
//   lifestyle: [
//     "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
//     "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
//     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
//   ],
//   food: [
//     "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
//     "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
//     "https://images.unsplash.com/photo-1555939594-58d7cb561b1a?w=800&q=80",
//   ],
// };

// export const gradientColors = {
//   travel: ["#dc2626", "#991b1b"],
//   culture: ["#ef4444", "#dc2626"],
//   lifestyle: ["#f87171", "#dc2626"],
//   food: ["#fca5a5", "#ef4444"],
// };

// export function createGradientStyle(category: keyof typeof gradientColors) {
//   const [c1, c2] = gradientColors[category] || gradientColors.travel;
//   return `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
// }

// export function getCategoryImage(
//   category: keyof typeof categoryImages,
//   index = 0
// ) {
//   const images = categoryImages[category] || categoryImages.travel;
//   return images[index % images.length];
// }

// export function getGradient(category: string) {
//   const gradients: Record<string, string> = {
//     travel: "linear-gradient(135deg, #dc2626, #991b1b)",
//     culture: "linear-gradient(135deg, #ef4444, #dc2626)",
//     lifestyle: "linear-gradient(135deg, #f87171, #dc2626)",
//     food: "linear-gradient(135deg, #fca5a5, #ef4444)",
//   };
//   return gradients[category] || gradients.travel;
// }
import { BlogPost } from "./types";

/**
 * IMPORTANT:
 * Categories used across the entire blog system.
 * These MUST stay in sync with content creation and filtering logic.
 */
export type BlogCategory =
  | "city-guides"
  | "booking-safety"
  | "decision-guides"
  | "lifestyle";

/**
 * CATEGORY IMAGES
 * Used for hero fallbacks, cards, and related posts
 */
export const categoryImages: Record<BlogCategory, string[]> = {
  "city-guides": [
    "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200&q=80",
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
  ],

  "booking-safety": [
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
    "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=1200&q=80",
    "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?w=1200&q=80",
  ],

  "decision-guides": [
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
  ],

  lifestyle: [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
  ],
};

/**
 * CATEGORY GRADIENT COLORS
 * Used for badges, overlays, and accents
 */
export const gradientColors: Record<BlogCategory, [string, string]> = {
  "city-guides": ["#0f172a", "#1e293b"],
  "booking-safety": ["#065f46", "#047857"],
  "decision-guides": ["#7c2d12", "#9a3412"],
  lifestyle: ["#dc2626", "#991b1b"],
};

/**
 * Returns a valid category key or fallback to 'lifestyle'
 */
function safeCategory(category: string): BlogCategory {
  const validCategories: BlogCategory[] = [
    "city-guides",
    "booking-safety",
    "decision-guides",
    "lifestyle",
  ];
  const lower = category.toLowerCase();
  return validCategories.includes(lower as BlogCategory)
    ? (lower as BlogCategory)
    : "lifestyle";
}

/**
 * Creates a gradient background style for a category safely
 */
export function createGradientStyle(category: string) {
  const cat = safeCategory(category);
  const [c1, c2] = gradientColors[cat];
  return `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
}

/**
 * Returns a deterministic image for a category safely
 */
export function getCategoryImage(category: string, index = 0) {
  const cat = safeCategory(category);
  const images = categoryImages[cat];
  return images[index % images.length];
}

/**
 * BACKWARD-COMPATIBLE GRADIENT HELPER
 */
export function getGradient(category: string) {
  const cat = safeCategory(category);
  const gradients: Record<BlogCategory, string> = {
    "city-guides": "linear-gradient(135deg, #0f172a, #1e293b)",
    "booking-safety": "linear-gradient(135deg, #065f46, #047857)",
    "decision-guides": "linear-gradient(135deg, #7c2d12, #9a3412)",
    lifestyle: "linear-gradient(135deg, #dc2626, #991b1b)",
  };
  return gradients[cat];
}
