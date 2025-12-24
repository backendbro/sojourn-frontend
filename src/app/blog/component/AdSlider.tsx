// // app/blog/[slug]/components/AdSlider.tsx
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";

// interface Apartment {
//   id: number;
//   title: string;
//   location: string;
//   price: string;
//   image: string;
// }

// export default function AdSlider() {
//   const [apartments, setApartments] = useState<Apartment[]>([
//     {
//       id: 1,
//       title: "Luxury 3-Bedroom Apartment",
//       location: "Ikoyi, Lagos",
//       price: "₦8,500,000/year",
//       image:
//         "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
//     },
//     {
//       id: 2,
//       title: "Modern 2-Bedroom Flat",
//       location: "Victoria Island, Lagos",
//       price: "₦6,200,000/year",
//       image:
//         "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
//     },
//     {
//       id: 3,
//       title: "Spacious 4-Bedroom Duplex",
//       location: "Lekki, Lagos",
//       price: "₦12,000,000/year",
//       image:
//         "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     },
//     {
//       id: 4,
//       title: "Cozy 1-Bedroom Studio",
//       location: "Yaba, Lagos",
//       price: "₦3,500,000/year",
//       image:
//         "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
//     },
//     {
//       id: 5,
//       title: "Elegant 3-Bedroom Penthouse",
//       location: "Banana Island, Lagos",
//       price: "₦15,000,000/year",
//       image:
//         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
//     },
//     {
//       id: 6,
//       title: "Family 5-Bedroom Villa",
//       location: "Gbagada, Lagos",
//       price: "₦9,800,000/year",
//       image:
//         "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
//     },
//   ]);

//   // Create a duplicated list for infinite scroll effect
//   const duplicatedApartments = [...apartments, ...apartments];

//   return (
//     <div className="ad-slider-container">
//       <div className="ad-slider-track">
//         {duplicatedApartments.map((apt, index) => (
//           <a
//             key={`${apt.id}-${index}`}
//             href="https://www.sojourn.ng"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="ad-item"
//             style={{ "--card-index": index } as React.CSSProperties}
//           >
//             <div
//               className="ad-item-image"
//               style={{ backgroundImage: `url('${apt.image}')` }}
//             />
//             <div className="ad-item-content">
//               <h4>{apt.title}</h4>
//               <p className="ad-location">{apt.location}</p>
//               <p className="ad-price">{apt.price}</p>
//             </div>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }


// app/blog/[slug]/components/AdSlider.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getRecommendedPropertiesByCityName } from "@/http/api";
import Image from "next/image";
import { Star } from "lucide-react";

// Define the property type based on your existing structure
export type PropertyCardType = {
  country: string;
  price: number;
  contactName?: string;
  title: string;
  photos: string[];
  city: string;
  id: string;
  houseNumber?: number;
  numberOfRooms?: number;
  wishlist: Array<{ userId: string; propertyId: string }>;
  street?: string;
  userId?: string;
  typeOfProperty?: string;
  reviews: { rating: number }[];
};

export default function AdSlider() {
  // Fetch real properties data
  const {
    data: properties = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ad-properties"],
    queryFn: () => {
      // Fetch properties for Lagos as default, adjust limit as needed
      return getRecommendedPropertiesByCityName("lagos", 8);
    },
  });

  // Calculate average rating for a property
  const getAverageRating = (reviews: { rating: number }[]) => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(total / reviews.length);
  };

  // Format price with Naira symbol
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  // Create a duplicated list for infinite scroll effect
  const duplicatedProperties = [...properties, ...properties];
  

  // Show loading state
  if (isLoading) {
    return (
      <div className="ad-slider-container">
        <div className="ad-slider-track">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className="ad-item"
              style={{ "--card-index": index } as React.CSSProperties}
            >
              <div className="ad-item-image bg-gray-200 animate-pulse" />
              <div className="ad-item-content">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="ad-slider-container">
        <div className="text-center py-8 text-red-500">
          Failed to load properties. Please try again.
        </div>
      </div>
    );
  }

  // Show empty state
  if (properties.length === 0) {
    return (
      <div className="ad-slider-container">
        <div className="text-center py-8 text-gray-500">
          No properties available at the moment.
        </div>
      </div>
    );
  }

  return (
    <div className="ad-slider-container">
      <div className="ad-slider-track">
        {duplicatedProperties.map((property: PropertyCardType, index) => {
          const formattedPrice = formatPrice(property.price);
          
          return (
            <a
              key={`${property.id}-${index}`}
              href={`https://www.sojourn.ng/properties/${property.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ad-item"
              style={{ "--card-index": index } as React.CSSProperties}
            >
              <div className="ad-item-image">
                {property.photos && property.photos.length > 0 ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={property.photos[0]}
                      alt={property.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              <div className="ad-item-content">
                <h4 className="truncate">{property.title}</h4>
                <p className="ad-location truncate">
                  {property.street}
                </p>
                
               
                
                <p className="ad-price">
                  {formattedPrice}
                  <span className="text-xs text-gray-500 ml-1">/night</span>
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}