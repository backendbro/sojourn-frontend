export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image?: string;
  featured?: boolean;
  content?: string;
}
