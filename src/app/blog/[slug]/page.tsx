import { getAllPostSlugs, getPostData, PostData } from "../../../../lib/posts";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";

// Typed props for the dynamic route
interface PostPageProps {
  params: {
    slug: string;
  };
}

// MDX components
const components = {
  MyButton: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      style={{ padding: "8px", background: "blue", color: "white" }}
      {...props}
    >
      Click me!
    </button>
  ),
};

export default async function PostPage({ params }: PostPageProps) {
  const postData: PostData & { mdxSource: any } = await getPostData(
    params.slug
  );

  return (
    <>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.description} />
      </Head>
      <article style={{ padding: "2rem" }}>
        <h1>{postData.title}</h1>
        <MDXRemote {...postData.mdxSource} components={components} />
      </article>
    </>
  );
}

// Static generation for dynamic posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}
