// components/AdsSection.tsx
"use client";

import { useState } from "react";
import AdSlider from "./AdSlider";

export default function AdsSection() {
  const [isVisible, setIsVisible] = useState(true);

  // Optional: Add a close button for the ad section
  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="ad-section relative">
      <div className="ad-header">
        <div className="flex justify-between items-center">
          <div>
            <h3>Featured Properties</h3>
            
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-sm"
              aria-label="Close ads"
            >
              ×
            </button>
            <a
              href="https://www.sojourn.ng/properties"
              target="_blank"
              rel="noopener noreferrer"
              className="ad-link"
            >
              View All Properties →
            </a>
          </div>
        </div>
      </div>
      <AdSlider />
    </aside>
  );
}