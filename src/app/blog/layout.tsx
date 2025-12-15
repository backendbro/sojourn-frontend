// app/blog/layout.tsx
import "./blog.css";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="crayons-article__main">
      <article className="crayons-article__body">{children}</article>
    </main>
  );
}
