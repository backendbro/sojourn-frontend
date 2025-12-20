import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const postsDirectory = path.join(process.cwd(), "posts");

export type PostData = {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated?: string;
  coverImage?: string;
  tags: string[];
  readTime: number;
};

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      published: data.published,
      updated: data.updated,
      coverImage: data.coverImage,
      tags: data.tags ?? [],
      readTime: data.readTime ?? 5,
    };
  });

  return allPosts.sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );
}

export function getAllPostSlugs() {
  return fs.readdirSync(postsDirectory).map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    slug,
    mdxSource,
    title: data.title,
    description: data.description,
    published: data.published,
    updated: data.updated,
    coverImage: data.coverImage,
    tags: data.tags ?? [],
    readTime: data.readTime ?? 5,
  };
}
