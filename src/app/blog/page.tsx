import Link from "next/link";
import { getAllPosts } from "../../../lib/posts";
import { placeholderImages, getGradient } from "../../../lib/blogData";
import BlogSlider from "./BlogSlider"; // Client component for slider logic
import "./blog.css";

export default function BlogPage() {
  const allPosts = getAllPosts(); // ✅ Server-side
  const featured = allPosts.find((p) => p.featured);
  const posts = allPosts.filter((p) => !p.featured);

  return (
    <>
      <nav className="navbar">
        <div className="container nav-wrapper">
          <span className="logo">Sojourn</span>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1>Stories Worth Sharing</h1>
          <p>Journeys, culture & lifestyle</p>
        </div>
      </header>

      <main className="container">
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="featured-post">
            <div
              className="featured-post-image"
              style={{
                backgroundImage: `${getGradient(featured.category)}, url(${
                  featured.cover
                })`,
              }}
            />
            <div className="featured-post-content">
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
            </div>
          </Link>
        )}

        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.slug} className="post-item">
              <BlogSlider
                images={placeholderImages[post.category] || [post.cover]}
                category={post.category}
              />

              <div className="post-content">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="read-more">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
