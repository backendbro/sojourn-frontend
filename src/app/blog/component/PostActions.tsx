// app/blog/[slug]/components/PostActions.tsx
"use client";

import { useState, useEffect } from "react";

interface PostActionsProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
  };
}

export default function PostActions({ post }: PostActionsProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    loadLikes();
  }, [post.slug]);

  const loadLikes = () => {
    try {
      const storedLikes = localStorage.getItem("blogPostLikes");
      const allLikes = storedLikes ? JSON.parse(storedLikes) : {};
      const postLikes = allLikes[post.slug] || { count: 0, liked: false };
      setLiked(postLikes.liked);
      setLikeCount(postLikes.count);
    } catch (error) {
      console.error("Error loading likes:", error);
    }
  };

  const handleLike = () => {
    try {
      const storedLikes = localStorage.getItem("blogPostLikes");
      const allLikes = storedLikes ? JSON.parse(storedLikes) : {};

      if (!allLikes[post.slug]) {
        allLikes[post.slug] = { count: 0, liked: false };
      }

      if (liked) {
        allLikes[post.slug].liked = false;
        allLikes[post.slug].count = Math.max(0, allLikes[post.slug].count - 1);
      } else {
        allLikes[post.slug].liked = true;
        allLikes[post.slug].count += 1;
      }

      localStorage.setItem("blogPostLikes", JSON.stringify(allLikes));
      setLiked(allLikes[post.slug].liked);
      setLikeCount(allLikes[post.slug].count);
    } catch (error) {
      console.error("Error saving like:", error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Error copying:", error);
      }
    }
  };

  return (
    <div className="post-actions">
      <button
        className={`post-action-btn like-btn-post ${liked ? "liked" : ""}`}
        onClick={handleLike}
      >
        <svg
          viewBox="0 0 24 24"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span>
          {liked ? "Liked" : "Like"} ({likeCount})
        </span>
      </button>

      <button className="post-action-btn share-btn-post" onClick={handleShare}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        <span>Share</span>
      </button>
    </div>
  );
}
