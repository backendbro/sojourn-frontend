import Link from "next/link";
import { PostMeta } from "../../../lib/posts";

export default function BlogGrid({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <article key={post.slug} className="post-item">
          <div className="post-content">
            <span className="post-card-category">{post.category}</span>
            <h3 className="post-card-title">{post.title}</h3>
            <p className="post-card-excerpt">{post.excerpt}</p>
            <div className="post-card-meta">
              <span>{post.date}</span>
              <Link href={`/blog/${post.slug}`} className="read-more">
                Read More →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
