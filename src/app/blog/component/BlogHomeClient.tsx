"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createGradientStyle, getCategoryImage } from "../../../../lib/blog-ui";
import { categoryIcons } from "../../../components/blog/CategoryIcons";
import { BlogPost } from "../../../../lib/types";

interface BlogHomeClientProps {
  posts: BlogPost[];
}

export default function BlogHomeClient({ posts }: BlogHomeClientProps) {
  const [filter, setFilter] = useState("all");
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});

  // Initialize featured post & images
  useEffect(() => {
    if (!posts.length) return;

    const featured = posts.find((post) => post.featured) || posts[0];
    setFeaturedPost(featured);

    const indexes: Record<string, number> = {};
    posts.forEach((post) => {
      indexes[post.id] = 0;
    });
    setImageIndexes(indexes);

    setFilteredPosts(posts.filter((post) => post.id !== featured.id));
  }, [posts]);

  // Filter posts by category
  useEffect(() => {
    if (!featuredPost) return;

    let result = posts.filter((post) => post.id !== featuredPost.id);

    if (filter !== "all") {
      result = result.filter((post) => post.category === filter);
    }

    setFilteredPosts(result);
  }, [filter, featuredPost, posts]);

  const categories = ["all", "travel", "culture", "lifestyle", "food"];

  const nextImage = (postId: string) => {
    setImageIndexes((prev) => ({
      ...prev,
      [postId]: (prev[postId] + 1) % 3,
    }));
  };

  if (!featuredPost) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Blog Hero Section */}
      <header className="blog-hero">
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">Stories Worth Sharing</h1>
          <p className="blog-hero-subtitle">
            Discover journeys, experiences, and insights from around the world
          </p>
          <a href="#posts" className="blog-cta-button">
            Explore Stories
          </a>
        </div>
        <div className="blog-hero-overlay" />
      </header>

      <div className="blog-container">
        {/* Featured Post */}
        <section className="blog-featured-section">
          <h2 className="blog-section-title">Featured Story</h2>
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="blog-featured-post"
          >
            <div
              className="blog-featured-post-image"
              style={{
                backgroundImage: `url(${
                  featuredPost.image ||
                  getCategoryImage(featuredPost.category as any)
                }), ${createGradientStyle(featuredPost.category as any)}`,
              }}
            />
            <div className="blog-featured-post-content">
              <span className="blog-featured-post-category">
                <span className="blog-category-icon">
                  {categoryIcons[
                    featuredPost.category as keyof typeof categoryIcons
                  ] || categoryIcons.travel}
                </span>
                {featuredPost.category.charAt(0).toUpperCase() +
                  featuredPost.category.slice(1)}
              </span>
              <h2 className="blog-featured-post-title">{featuredPost.title}</h2>
              <p className="blog-featured-post-excerpt">
                {featuredPost.excerpt}
              </p>
              <div className="blog-featured-post-meta">
                <span>By {featuredPost.author}</span>
                <span>•</span>
                <span>
                  {new Date(featuredPost.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="blog-read-more-featured">Read Full Story →</div>
            </div>
          </Link>
        </section>

        {/* Blog Posts Grid */}
        <section className="blog-posts-section" id="posts">
          <div className="blog-section-header">
            <h2 className="blog-section-title">Latest Stories</h2>
            <div className="blog-filter-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`blog-filter-btn ${
                    filter === category ? "active" : ""
                  }`}
                  onClick={() => setFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-posts-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => {
                const currentImageIndex = imageIndexes[post.id] || 0;
                const postImages = Array.from({ length: 3 }, (_, i) =>
                  getCategoryImage(post.category as any, i)
                );

                return (
                  <article key={post.id} className="blog-post-item">
                    <div
                      className="blog-post-image-container"
                      onClick={() => nextImage(post.id)}
                    >
                      <div
                        className="blog-post-image-slide active"
                        style={{
                          backgroundImage: `url(${
                            post.image || postImages[currentImageIndex]
                          }), ${createGradientStyle(post.category as any)}`,
                        }}
                      />
                    </div>

                    <div className="blog-post-content">
                      <span className="blog-post-card-category">
                        <span className="blog-category-icon">
                          {categoryIcons[
                            post.category as keyof typeof categoryIcons
                          ] || categoryIcons.travel}
                        </span>
                        {post.category.charAt(0).toUpperCase() +
                          post.category.slice(1)}
                      </span>

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="blog-post-card-title">{post.title}</h3>
                      </Link>

                      {/* Darkened description */}
                      <p
                        className="blog-post-card-excerpt"
                        style={{ color: "#111", lineHeight: 1.6 }}
                      >
                        {post.excerpt}
                      </p>

                      {/* Date */}
                      <div
                        className="blog-post-card-date"
                        style={{
                          fontSize: "1rem",
                          color: "black",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>

                      {/* Grouped action buttons with background and colors */}
                      <div
                        className="blog-post-card-actions flex gap-2 mt-2"
                        style={{ flexWrap: "wrap" }}
                      >
                        <button
                          className="blog-action-btn"
                          style={{
                            backgroundColor: "#f87171",
                            color: "#fff",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#dc2626")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f87171")
                          }
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: post.title,
                                text: post.excerpt,
                                url: `${window.location.origin}/blog/${post.slug}`,
                              });
                            } else {
                              navigator.clipboard.writeText(
                                `${window.location.origin}/blog/${post.slug}`
                              );
                              alert("Link copied to clipboard!");
                            }
                          }}
                        >
                          Share
                        </button>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="blog-action-btn"
                          style={{
                            backgroundColor: "#60a5fa",
                            color: "#fff",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            textAlign: "center",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#2563eb")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#60a5fa")
                          }
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <p
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  padding: "2rem",
                  color: "var(--text-light)",
                }}
              >
                No posts found in this category.
              </p>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="blog-newsletter-section">
          <div className="blog-newsletter-content">
            <h2>Stay Updated</h2>
            <p className="text-white">
              Subscribe to our newsletter and never miss a story
            </p>
            <form
              className="blog-newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.target as any).elements[0].value;
                alert(`Thank you for subscribing with: ${email}`);
                (e.target as any).reset();
              }}
            >
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
