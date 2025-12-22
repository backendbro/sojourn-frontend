import { getAllPosts } from "../../../lib/posts";
import { BlogPost } from "../../../lib/types";

import BlogHomeClient from "./component/BlogHomeClient";

export default function BlogPage() {
  const posts: BlogPost[] = getAllPosts();

  return <BlogHomeClient posts={posts} />;
}
