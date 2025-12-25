import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostContent } from "../../../../lib/posts";
import { getCategoryImage } from "../../../../lib/blog-ui";
import SinglePostHero from "../component/SinglePostHero";
import PostActions from "../component/PostActions";
import AdsSection from "../component/AdsSection";
import "./single-post-styles.css";
import Footer from "../../../components/ui/footer";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostContent(params.slug);

  if (!post) notFound();

  const relatedPosts = getAllPosts()
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div>
      <div className="single-post-main">
        <SinglePostHero post={post} />

        <div className="single-post-body">
          <div className="container">
            <div className="post-content-wrapper">
              {/* LEFT ADS */}
              <AdsSection />

              {/* ARTICLE */}
              <article className="post-article">
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
                <PostActions post={post} />
              </article>

              {/* RIGHT SIDEBAR */}
              <aside className="post-sidebar">
                <div className="sidebar-section">
                  <h3>Related Stories</h3>
                  <p className="sidebar-description">More from this category</p>

                  <div className="related-posts">
                    {relatedPosts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="related-post-item"
                      >
                        <div
                          className="related-post-image"
                          style={{
                            backgroundImage: `url(${
                              p.image || getCategoryImage(p.category as any)
                            })`,
                          }}
                        />

                        <div className="related-post-content">
                          <h4>{p.title}</h4>
                          <div className="related-post-date">
                            {new Date(p.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <p className="related-post-excerpt">
                            {p.excerpt?.substring(0, 80)}…
                          </p>
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
      <Footer />
    </div>
  );
}
