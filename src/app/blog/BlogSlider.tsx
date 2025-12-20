"use client";

import { useEffect } from "react";

export default function BlogSlider({
  images,
  category,
}: {
  images: string[];
  category: string;
}) {
  useEffect(() => {
    const sliders = document.querySelectorAll(".post-image-slider");
    sliders.forEach((slider) => {
      const slides = slider.querySelectorAll(".slide");
      if (!slides.length) return;
      let index = 0;
      const interval = setInterval(() => {
        slides.forEach((s) => s.classList.remove("active"));
        slides[index].classList.add("active");
        index = (index + 1) % slides.length;
      }, 4000);

      return () => clearInterval(interval);
    });
  }, []);

  return (
    <div className="post-image-slider">
      {images.map((img, i) => (
        <div
          key={i}
          className={`slide ${i === 0 ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
    </div>
  );
}
