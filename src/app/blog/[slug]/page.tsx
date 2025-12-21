import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "../../../../lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { meta, content } = post;

  return (
    <article className="single-post">
      <h1 className="single-post-title">{meta.title}</h1>
      <p className="single-post-meta">
        By {meta.author} • {meta.date}
      </p>

      <MDXRemote source={content} />
    </article>
  );
}
