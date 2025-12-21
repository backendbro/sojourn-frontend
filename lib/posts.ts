import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export type PostMeta = {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: "travel" | "culture" | "lifestyle" | "food";
  featured?: boolean;
  slug: string;
};

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory);

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(postsDirectory, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        ...(data as Omit<PostMeta, "slug">),
        slug,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  if (!data?.title) {
    throw new Error(`Post "${slug}" is missing a title in frontmatter`);
  }

  return {
    content,
    meta: {
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      date: data.date ?? "",
      author: data.author ?? "",
      category: data.category ?? "uncategorized",
      featured: data.featured ?? false,
      coverImage: data.coverImage ?? null,
      images: data.images ?? [],
      slug,
    },
  };
}
