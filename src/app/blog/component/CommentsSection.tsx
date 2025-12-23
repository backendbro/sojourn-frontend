// app/blog/[slug]/components/CommentsSection.tsx
"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export default function CommentsSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, [postSlug]);

  const loadComments = () => {
    try {
      const storedComments = localStorage.getItem("blogPostComments");
      const allComments = storedComments ? JSON.parse(storedComments) : {};
      const postComments = allComments[postSlug] || [];
      setComments(postComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!author.trim() || !text.trim()) return;

    try {
      const storedComments = localStorage.getItem("blogPostComments");
      const allComments = storedComments ? JSON.parse(storedComments) : {};

      if (!allComments[postSlug]) {
        allComments[postSlug] = [];
      }

      const newComment: Comment = {
        id: Date.now(),
        author: author.trim(),
        text: text.trim(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };

      allComments[postSlug].push(newComment);
      localStorage.setItem("blogPostComments", JSON.stringify(allComments));

      setComments([...allComments[postSlug]]);
      setAuthor("");
      setText("");
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="post-comments-section-full">
      <div className="comments-header-full">
        <h3>Comments</h3>
      </div>

      <div className="comments-list-full">
        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="no-comments">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item-full">
              <div
                className="comment-author-full"
                data-initial={getInitial(comment.author)}
              >
                {comment.author}
              </div>
              <div className="comment-text-full">{comment.text}</div>
              <div className="comment-date-full">
                <span>{comment.date}</span>
              </div>
              <div className="comment-actions-full">
                <button
                  className="comment-action-btn-full"
                  aria-label="Like comment"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>Like</span>
                </button>
                <button
                  className="comment-action-btn-full"
                  aria-label="Reply to comment"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Reply</span>
                </button>
                <button
                  className="comment-action-btn-full"
                  aria-label="Share comment"
                >
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
            </div>
          ))
        )}
      </div>

      <form className="comment-form-full" onSubmit={handleSubmit}>
        <div className="comment-input-group-full">
          <input
            type="text"
            className="comment-author-input-full"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <textarea
            className="comment-text-input-full"
            placeholder="Write a comment..."
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="comment-submit-btn-full">
          Post Comment
        </button>
      </form>
    </div>
  );
}
