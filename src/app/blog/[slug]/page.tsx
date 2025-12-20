import { getPostData, getAllPostSlugs } from "../../../../lib/posts";
import ClientMDX from "@/components/ui/ClientMDX";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.slug);
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostData(params.slug);

  return (
    <article className="single-post">
      <header className="single-post-header">
        <h1>{post.title}</h1>
        <p className="post-description">{post.description}</p>
        <div className="post-meta">
          <span>{post.readTime} min read</span>
          <span>•</span>
          <span>{post.published}</span>
        </div>
      </header>

      <div className="post-content">
        <ClientMDX mdxSource={post.mdxSource} />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}
