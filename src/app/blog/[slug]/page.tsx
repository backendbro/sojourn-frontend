import { getPostBySlug, getAllPosts } from "../../../../lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { content, meta } = getPostBySlug(params.slug);

  return (
    <article className="single-post">
      <h1>{meta.title}</h1>
      <p className="post-meta">
        By {meta.author} • {meta.date}
      </p>
      <MDXRemote source={content} />
    </article>
  );
}
