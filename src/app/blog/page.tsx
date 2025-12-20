"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllPosts } from "../../../lib/posts";
import { placeholderImages, getGradient } from "../../../lib/blogData";
import "./blog.css";

export default function BlogPage() {
  const [filter, setFilter] = useState("all");

  // 🔹 Load MDX posts
  const allPosts = getAllPosts();

  const featured = allPosts.find((p) => p.featured);
  const posts = allPosts.filter(
    (p) => !p.featured && (filter === "all" || p.category === filter)
  );

  // 🔹 Slider logic (unchanged)
  useEffect(() => {
    const sliders = document.querySelectorAll(".post-image-slider");

    sliders.forEach((slider) => {
      const slides = slider.querySelectorAll(".slide");
      let index = 0;

      const interval = setInterval(() => {
        slides.forEach((s) => s.classList.remove("active"));
        slides[index].classList.add("active");
        index = (index + 1) % slides.length;
      }, 4000);

      return () => clearInterval(interval);
    });
  }, [filter]);

  return (
    <>
      <nav className="navbar">
        <div className="container nav-wrapper">
          <span className="logo">Sojourn</span>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1>Stories Worth Sharing</h1>
          <p>Journeys, culture & lifestyle</p>
        </div>
      </header>

      <main className="container">
        {/* ⭐ FEATURED POST */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="featured-post">
            <div
              className="featured-post-image"
              style={{
                backgroundImage: `${getGradient(featured.category)}, url(${
                  featured.cover
                })`,
              }}
            />
            <div className="featured-post-content">
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
            </div>
          </Link>
        )}

        {/* 🔹 FILTER TABS */}
        <div className="filter-tabs">
          {["all", "travel", "culture", "lifestyle", "food"].map((c) => (
            <button
              key={c}
              className={filter === c ? "active" : ""}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* 🔹 POSTS GRID */}
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.slug} className="post-item">
              <div className="post-image-slider">
                {(placeholderImages[post.category] || [post.cover]).map(
                  (img, i) => (
                    <div
                      key={i}
                      className={`slide ${i === 0 ? "active" : ""}`}
                      style={{
                        backgroundImage: `${getGradient(
                          post.category
                        )}, url(${img})`,
                      }}
                    />
                  )
                )}
              </div>

              <div className="post-content">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="read-more">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
