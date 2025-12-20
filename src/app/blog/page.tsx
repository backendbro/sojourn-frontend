import Link from "next/link";
import { getSortedPostsData } from "../../../lib/posts";

export default function BlogPage() {
  const posts = getSortedPostsData();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="blog-home">
      {/* HERO */}
      <section className="blog-hero">
        <h1 className="hero-title">
          Travel Smart, <span className="highlight">Stay Better</span>
        </h1>
        <p className="hero-subtitle">
          Practical shortlet guides, weekend itineraries, and city insights
          across Nigeria.
        </p>
      </section>

      {/* FEATURED POST */}
      {featured && (
        <section className="featured-post">
          <div className="featured-content">
            <span className="featured-badge">FEATURED</span>
            <h2 className="featured-title">
              <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p className="featured-description">{featured.description}</p>

            <div className="featured-meta">
              <span>{featured.readTime} min read</span>
              <span>•</span>
              <span>{featured.published}</span>
            </div>
          </div>

          <div className="featured-image">
            {featured.coverImage ? (
              <img src={featured.coverImage} alt={featured.title} />
            ) : (
              <div className="image-placeholder">✈️</div>
            )}
          </div>
        </section>
      )}

      {/* POSTS GRID */}
      <section className="posts-grid">
        {rest.map((post) => (
          <article key={post.slug} className="post-card">
            <div className="post-card-content">
              <h3 className="post-title">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              <p className="post-excerpt">{post.description}</p>

              <div className="post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="post-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="post-card-footer">
              <span>{post.readTime} min read</span>
              <span>•</span>
              <span>{post.published}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
