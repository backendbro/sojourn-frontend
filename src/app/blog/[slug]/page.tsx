// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllPosts,
  getPostContent,
  createGradientStyle,
  getCategoryImage,
} from "../../../../lib/posts";

import { categoryIcons } from "../../../components/blog/CategoryIcons";
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

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
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="single-post-main">
      {/* Single Post Header */}
      <header className="single-post-header">
        <div
          className="single-post-image"
          style={{
            backgroundImage: `url(${
              post.image || getCategoryImage(post.category as any)
            }), ${createGradientStyle(post.category as any)}`,
          }}
        />
        <div className="single-post-header-content blog-container">
          <Link href="/blog" className="back-link">
            ← Back to Stories
          </Link>
          <div className="post-category-badge">
            <span className="blog-category-icon">
              {categoryIcons[post.category as keyof typeof categoryIcons] ||
                categoryIcons.travel}
            </span>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </div>
          <h1 className="single-post-title">{post.title}</h1>
          <div className="single-post-meta">
            <span>By {post.author}</span>
            <span className="meta-separator">•</span>
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </header>

      <div className="single-post-body">
        <div className="blog-container">
          <div className="post-content-wrapper">
            {/* Main Content */}
            <div className="post-article">
              <div className="post-content">
                {/* Render MDX content */}
                {post.contentHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                ) : (
                  <div>{post.content}</div>
                )}
              </div>

              {/* Post Actions */}
              <div className="post-actions">
                <button
                  className="blog-post-action-btn share-btn"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      if (navigator.share) {
                        navigator.share({
                          title: post.title,
                          text: post.excerpt,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                      }
                    }
                  }}
                >
                  <svg
                    className="blog-action-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  Share
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="post-sidebar">
              <div className="sidebar-section">
                <h3>Related Stories</h3>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
