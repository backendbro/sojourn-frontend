"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { EXPLORE_CITIES } from "@/constants";
import ExploreCard from "./explore-card";
import { useState, useEffect } from "react";

const CITIES_DATA = [
  {
    title: "Abuja",
    imageUrl: "/assets/imgs/discover-abuja.png",
    description: EXPLORE_CITIES.abuja,
  },
  {
    title: "Lagos",
    imageUrl: "/assets/imgs/discover-lagos.png",
    description: EXPLORE_CITIES.lagos,
  },
  {
    title: "Portharcourt",
    imageUrl: "/assets/imgs/discover-portharcourt.png",
    description: EXPLORE_CITIES.portharcout,
  },
  {
    title: "AkwaIbom",
    imageUrl: "/assets/imgs/discover-akwaibom.jpg",
    description: EXPLORE_CITIES.akwa_ibom,
  },
  {
    title: "Delta",
    imageUrl: "/assets/imgs/discover-delta.jpg",
    description: EXPLORE_CITIES.delta,
  },
  {
    title: "Oyo",
    imageUrl: "/assets/imgs/discover-oyo.jpg",
    description: EXPLORE_CITIES.oyo,
  },
  {
    title: "Benin",
    imageUrl: "/assets/imgs/discover-benin.jpg",
    description: EXPLORE_CITIES.benin,
  },
];

export default function ExploreSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
      setShowSwipeHint(false);
    },
    created() {
      setLoaded(true);

      // Auto-hide swipe hint after 5 seconds
      setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);
    },
  });

  // Hide swipe hint when user interacts
  useEffect(() => {
    const handleInteraction = () => setShowSwipeHint(false);

    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("mousedown", handleInteraction);

    return () => {
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("mousedown", handleInteraction);
    };
  }, []);

  return (
    <section className="w-full flex flex-col min-h-[500px] items-center max-w-[1400px] mx-auto py-10">
      <div className="w-full flex flex-col items-center my-5 space-y-5 px-4 md:px-0">
        <h4 className="text-[36px] md:text-[48px] font-[700] m-0 p-0 text-center md:text-left">
          <span className="text-primary text-center md:text-left">
            Explore{" "}
          </span>
          the beautiful country of Nigeria
        </h4>
        <p className="font-[600] text-[24px] m-0 p-0 text-center md:text-left">
          These popular destinations have a lot to offer
        </p>
      </div>

      <div className="relative w-full md:w-5/6 my-10">
        {/* Navigation Arrows */}
        {loaded && slider.current && (
          <>
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-all hidden md:block"
              onClick={() => slider.current?.prev()}
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-all hidden md:block"
              onClick={() => slider.current?.next()}
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Swipe Hint - Mobile Only */}
        {showSwipeHint && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:hidden">
            <div className="flex items-center space-x-2 bg-black/70 text-white py-2 px-4 rounded-full animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 animate-bounce-horizontal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <span>Swipe to explore</span>
            </div>
          </div>
        )}

        {/* Slider Container */}
        <div ref={sliderRef} className="keen-slider">
          {CITIES_DATA.map((city, idx) => (
            <div key={idx} className="keen-slider__slide">
              <ExploreCard {...city} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {loaded && slider.current && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({
            length: slider.current.track.details.slides.length,
          }).map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === idx ? "bg-primary w-6" : "bg-gray-300"
              }`}
              onClick={() => slider.current?.moveToIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
