"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecommendedPropertiesByCityName } from "@/http/api";
import Image from "next/image";

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
                      style={{ objectFit: "cover" }}
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
                  {property.street || `${property.city}, ${property.country}`}
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
