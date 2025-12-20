import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");

export function getAllPosts() {
  const files = fs.readdirSync(postsDir);

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(postsDir, file);
    const source = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(source);

    return {
      slug,
      content,
      ...(data as {
        title: string;
        excerpt: string;
        date: string;
        category: string;
        author: string;
        cover: string;
        featured?: boolean;
      }),
    };
  });
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(source);

  return {
    slug,
    content,
    ...(data as {
      title: string;
      excerpt: string;
      date: string;
      category: string;
      author: string;
      cover: string;
    }),
  };
}
