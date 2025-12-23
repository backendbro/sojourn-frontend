import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostContent } from "../../../../lib/posts";
import { getCategoryImage } from "../../../../lib/blog-ui";
import SinglePostHero from "../component/SinglePostHero";
import AdSlider from "../component/AdSlider";
import PostActions from "../component/PostActions";
import "./single-post-styles.css";

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Server Component
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostContent(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== params.slug)
    .slice(0, 3);

  return (
    <div className="single-post-main">
      {/* Extracted Hero Section */}
      <SinglePostHero post={post} />

      {/* Main Content */}
      <div className="single-post-body">
        <div className="container">
          <div className="post-content-wrapper">
            {/* Left Ad Sidebar */}
            <aside className="ad-section">
              <div className="ad-header">
                <h3>Featured Apartments</h3>
                <a
                  href="https://www.sojourn.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ad-link"
                >
                  View All →
                </a>
              </div>
              <AdSlider />
            </aside>

            {/* Main Article */}
            <article className="post-article">
              <div className="post-content">
                {post.contentHtml ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                    className="prose prose-lg max-w-none"
                  />
                ) : (
                  <div>{post.content}</div>
                )}
              </div>

              {/* Post Actions - Only Share button remains */}
              <PostActions post={post} />
            </article>

            {/* Right Sidebar - Related Stories */}
            <aside className="post-sidebar">
              <div className="sidebar-section">
                <h3>Related Stories</h3>
                <p className="sidebar-description">
                  Discover more stories from the same category
                </p>
                <div className="related-posts">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="related-post-item"
                    >
                      <div
                        className="related-post-image"
                        style={{
                          backgroundImage: `url(${
                            relatedPost.image ||
                            getCategoryImage(relatedPost.category as any)
                          })`,
                        }}
                      />
                      <div className="related-post-content">
                        <h4>{relatedPost.title}</h4>
                        <p className="related-post-excerpt">
                          {relatedPost.excerpt?.substring(0, 80)}...
                        </p>
                        <div className="related-post-date">
                          {new Date(relatedPost.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
