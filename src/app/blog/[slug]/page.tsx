import { getAllPosts, getPostBySlug } from "../../../../lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  return (
    <article className="single-post">
      <div
        className="single-post-hero"
        style={{ backgroundImage: `url(${post.cover})` }}
      />

      <div className="container">
        <Link href="/blog">← Back</Link>

        <h1>{post.title}</h1>
        <p>
          By {post.author} • {post.date}
        </p>

        <div className="post-body">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
