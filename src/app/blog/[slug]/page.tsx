import { getAllPostSlugs, getPostData, PostData } from "../../../../lib/posts";
import Head from "next/head";
import ClientMDX from "@/components/ui/ClientMDX"; // import the client wrapper

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

interface PostPageProps {
  params: { slug: string };
}

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
        <ClientMDX {...postData.mdxSource} components={components} />
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}
