// lib/posts.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogPost } from "./types";

const postsDirectory = path.join(process.cwd(), "posts");

/**
 * Read all blog posts from /posts directory
 */
export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((file) => file.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        id: slug,
        slug,
        title: data.title ?? "Untitled",
        excerpt: data.excerpt ?? "",
        category: data.category ?? "travel",
        author: data.author ?? "Anonymous",
        date: data.date ?? new Date().toISOString(),
        image: data.image,
        featured: Boolean(data.featured),
        content,
      } satisfies BlogPost;
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id: slug,
      slug,
      title: data.title ?? "Untitled",
      excerpt: data.excerpt ?? "",
      category: data.category ?? "travel",
      author: data.author ?? "Anonymous",
      date: data.date ?? new Date().toISOString(),
      image: data.image,
      featured: Boolean(data.featured),
      content,
    };
  } catch {
    return null;
  }
}

/**
 * Convert markdown content to HTML
 */
export async function getPostContent(slug: string) {
  const post = getPostBySlug(slug);
  if (!post || !post.content) return null;

  const processed = await remark().use(html).process(post.content);

  return {
    ...post,
    contentHtml: processed.toString(),
  };
}

/**
 * Get unique categories from posts
 */
export function getCategories(): string[] {
  const posts = getAllPosts();
  return Array.from(new Set(posts.map((post) => post.category)));
}
