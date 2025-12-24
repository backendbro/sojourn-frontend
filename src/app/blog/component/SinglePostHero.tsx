// app/blog/[slug]/components/SinglePostHero.tsx
"use client";

import Link from "next/link";

interface SinglePostHeroProps {
  post: {
    slug: string;
    title: string;
    author: string;
    date: string;
    category: string;
    image?: string;
  };
}

export default function SinglePostHero({ post }: SinglePostHeroProps) {
  // Get category icon based on category
  const getCategoryIcon = (category: string) => {
    const icons = {
      travel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
        </svg>`,
      culture: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>`,
      lifestyle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>`,
      food: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>`,
    };
    return icons[category as keyof typeof icons] || icons.travel;
  };

  // Get placeholder image based on category
  const getPlaceholderImage = (category: string) => {
    const images = {
      travel: [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
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
    const categoryImages =
      images[category as keyof typeof images] || images.travel;
    return categoryImages[0];
  };

  const imageUrl = post.image || getPlaceholderImage(post.category);

  return (
    <header className="single-post-header">
      <div
        className="single-post-image"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="single-post-header-content">
        <div className="container">
          <div className="top-row">
            <Link href="/blog"  className="back-link mr-2">
              ← Back to Stories
            </Link>

            <div className="post-category-badge">
              <span
                className="category-icon"
                dangerouslySetInnerHTML={{
                  __html: getCategoryIcon(post.category),
                }}
              />
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </div>
          </div>

          <h1 className="single-post-title">{post.title}</h1>

          <div className="single-post-meta">
            <div className="post-author">
              <span>By {post.author}</span>
            </div>
            <span className="meta-separator">•</span>
            <div className="post-date">
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
