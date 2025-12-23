// app/blog/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostContent } from "../../../../lib/posts";
import { createGradientStyle, getCategoryImage } from "../../../../lib/blog-ui";
import { categoryIcons } from "../../../components/blog/CategoryIcons";
import ShareButton from "../component/ShareButton";
import ReadMoreLink from "../component/ReadMoreLink";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostContent(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="single-post-main">
      {/* Header */}
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

      {/* Main Content */}
      <div className="single-post-body">
        <div className="blog-container">
          <div className="post-content-wrapper">
            <div className="post-article">
              <div className="post-content">
                {post.contentHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                ) : (
                  <div>{post.content}</div>
                )}
              </div>

              {/* Actions */}
              <div
                className="post-actions"
                style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}
              >
                <ShareButton
                  url={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                  title={post.title}
                  text={post.excerpt}
                />
                <ReadMoreLink href={`/blog/${post.slug}`}>
                  Read More →
                </ReadMoreLink>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="post-sidebar">
              <div className="sidebar-section">
                <h3>Related Stories</h3>
                <div className="related-posts">
                  {relatedPosts.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="related-post-item"
                    >
                      <div
                        className="related-post-image"
                        style={{
                          backgroundImage: `url(${
                            r.image || getCategoryImage(r.category as any)
                          })`,
                        }}
                      />
                      <div className="related-post-content">
                        <h4>{r.title}</h4>
                        <div className="related-post-date">
                          {new Date(r.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
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
