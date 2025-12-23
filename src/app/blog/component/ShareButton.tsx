// components/blog/ShareButton.tsx
"use client";

import React from "react";

interface ShareButtonProps {
  url: string;
  title: string;
  text: string;
}

export default function ShareButton({ url, title, text }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, text, url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="blog-post-action-btn share-btn"
      style={{
        backgroundColor: "#f87171",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        transition: "background-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f87171")}
    >
      Share
    </button>
  );
}
