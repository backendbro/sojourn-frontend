import "./blog.css";
import { getAllPosts } from "../../../lib/posts";
import BlogHero from "../../components/blog/BlogHero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogGrid from "@/components/blog/BlogGrid";
import CategoryFilter from "@/components/blog/CategoryFilter";

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];

  return (
    <main>
      <BlogHero />

      <section className="featured-section">
        <h2 className="section-title">Featured Story</h2>
        <FeaturedPost post={featured} />
      </section>

      <section className="posts-section" id="posts">
        <h2 className="section-title">Latest Stories</h2>
        <BlogGrid posts={posts.filter((p) => p.slug !== featured.slug)} />
      </section>
    </main>
  );
}
