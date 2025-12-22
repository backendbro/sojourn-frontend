import { getAllPosts, BlogPost } from "../../../lib/posts";

import BlogHomeClient from "./component/BlogHomeClient";

export default function BlogPage() {
  const posts: BlogPost[] = getAllPosts();

  return <BlogHomeClient posts={posts} />;
}
