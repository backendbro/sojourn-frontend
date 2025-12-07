import Link from "next/link";
import { getSortedPostsData } from "../../../lib/posts";

export default function BlogPage() {
  const allPosts = getSortedPostsData();

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
      <ul className="space-y-6">
        {allPosts.map(({ slug, title, date, description }) => (
          <li key={slug} className="border-b pb-4">
            <Link href={`/blog/${slug}`}>
              <h2 className="text-2xl font-semibold">{title}</h2>
            </Link>
            <p className="text-gray-600">{date}</p>
            <p className="mt-2">{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
