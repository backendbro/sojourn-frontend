// components/blog/ReadMoreLink.tsx
"use client";

import Link from "next/link";

interface ReadMoreLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function ReadMoreLink({ href, children }: ReadMoreLinkProps) {
  return (
    <Link
      href={href}
      className="blog-action-btn"
      style={{
        backgroundColor: "#60a5fa",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        textAlign: "center",
        display: "inline-block",
        transition: "background-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#60a5fa")}
    >
      {children}
    </Link>
  );
}
