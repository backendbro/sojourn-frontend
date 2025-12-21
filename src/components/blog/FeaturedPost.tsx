import Link from "next/link";
import { PostMeta } from "../../../lib/posts";

const gradients: Record<string, string> = {
  travel: "linear-gradient(135deg,#dc2626,#991b1b)",
  culture: "linear-gradient(135deg,#ef4444,#dc2626)",
  lifestyle: "linear-gradient(135deg,#f87171,#dc2626)",
  food: "linear-gradient(135deg,#fca5a5,#ef4444)",
};

export default function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <article className="featured-post">
      <div
        className="featured-post-image"
        style={{ background: gradients[post.category] }}
      />
      <div className="featured-post-content">
        <span className="featured-post-category">{post.category}</span>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <div className="featured-post-meta">
          <span>By {post.author}</span> • <span>{post.date}</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="read-more-featured">
          Read Full Story →
        </Link>
      </div>
    </article>
  );
}
