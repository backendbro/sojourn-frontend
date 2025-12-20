"use client";

import { useState } from "react";

const neighborhoods = [
  {
    name: "Wuse 2",
    price: "₦25k-₦60k",
    vibe: "Social",
    bestFor: ["Nightlife", "Dining", "Young Travelers"],
    rating: 4.2,
    color: "#667eea",
  },
  {
    name: "Maitama",
    price: "₦45k-₦120k",
    vibe: "Luxury",
    bestFor: ["Privacy", "Security", "Special Occasions"],
    rating: 4.5,
    color: "#764ba2",
  },
  {
    name: "Jabi",
    price: "₦20k-₦50k",
    vibe: "Relaxed",
    bestFor: ["Families", "Leisure", "Lake Views"],
    rating: 4.3,
    color: "#38b2ac",
  },
  // Add more...
];

export default function NeighborhoodComparison() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Neighborhood</th>
            <th>Price Range/Night</th>
            <th>Vibe</th>
            <th>Best For</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {neighborhoods.map((area) => (
            <tr
              key={area.name}
              className={selected === area.name ? "selected" : ""}
              onClick={() => setSelected(area.name)}
            >
              <td>
                <div className="area-name">
                  <div
                    className="color-indicator"
                    style={{ backgroundColor: area.color }}
                  />
                  {area.name}
                </div>
              </td>
              <td>
                <span className="price-tag">{area.price}</span>
              </td>
              <td>
                <span className="vibe-tag">{area.vibe}</span>
              </td>
              <td>
                <div className="tags">
                  {area.bestFor.map((item) => (
                    <span key={item} className="small-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <div className="rating">
                  <span className="stars">
                    {"★".repeat(Math.floor(area.rating))}
                    {"☆".repeat(5 - Math.floor(area.rating))}
                  </span>
                  <span className="score">{area.rating}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
