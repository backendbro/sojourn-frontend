import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

// Folder where your MDX posts live
const postsDirectory = path.join(process.cwd(), "posts");

// TypeScript type for a post
export type PostData = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

// Return all posts sorted by date
export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData: PostData[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
    };
  });

  // Sort by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Return an array of all slugs for dynamic routes
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.mdx$/, ""),
  }));
}

// Get the content of a single post as MDX
export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content);

  return {
    slug,
    mdxSource,
    title: data.title,
    date: data.date,
    description: data.description,
  };
}
