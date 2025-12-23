// app/blog/[slug]/components/AdSlider.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Apartment {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
}

export default function AdSlider() {
  const [apartments, setApartments] = useState<Apartment[]>([
    {
      id: 1,
      title: "Luxury 3-Bedroom Apartment",
      location: "Ikoyi, Lagos",
      price: "₦8,500,000/year",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Modern 2-Bedroom Flat",
      location: "Victoria Island, Lagos",
      price: "₦6,200,000/year",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Spacious 4-Bedroom Duplex",
      location: "Lekki, Lagos",
      price: "₦12,000,000/year",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Cozy 1-Bedroom Studio",
      location: "Yaba, Lagos",
      price: "₦3,500,000/year",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "Elegant 3-Bedroom Penthouse",
      location: "Banana Island, Lagos",
      price: "₦15,000,000/year",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      title: "Family 5-Bedroom Villa",
      location: "Gbagada, Lagos",
      price: "₦9,800,000/year",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    },
  ]);

  // Create a duplicated list for infinite scroll effect
  const duplicatedApartments = [...apartments, ...apartments];

  return (
    <div className="ad-slider-container">
      <div className="ad-slider-track">
        {duplicatedApartments.map((apt, index) => (
          <a
            key={`${apt.id}-${index}`}
            href="https://www.sojourn.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="ad-item"
            style={{ "--card-index": index } as React.CSSProperties}
          >
            <div
              className="ad-item-image"
              style={{ backgroundImage: `url('${apt.image}')` }}
            />
            <div className="ad-item-content">
              <h4>{apt.title}</h4>
              <p className="ad-location">{apt.location}</p>
              <p className="ad-price">{apt.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
