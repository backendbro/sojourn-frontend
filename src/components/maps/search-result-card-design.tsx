"use client";

import { Star } from "lucide-react";

type Props = {
  title: string;
  city: string;
  country: string;
  price: number;
  photos: string[];
  reviews: { rating: number }[];
};

export default function SearchResultCardRedesign({
  title,
  city,
  country,
  price,
  photos,
  reviews,
}: Props) {
  const rating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1
      )
    : null;

  return (
    <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 w-full bg-white">
      <div className="h-[160px] w-full overflow-hidden">
        {photos?.[0] ? (
          <img
            src={photos[0]}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-semibold leading-4">{title}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {city}, {country}
            </p>
          </div>
          {rating && (
            <div className="flex items-center space-x-1 text-sm text-gray-800">
              <Star size={14} fill="black" strokeWidth={0} />
              <span className="text-[13px]">{rating}</span>
              <span className="text-[12px] text-gray-500">
                ({reviews.length})
              </span>
            </div>
          )}
        </div>
        <p className="text-sm font-bold mt-2">
          ₦{price.toLocaleString()}{" "}
          <span className="font-normal text-sm text-gray-600">night</span>
        </p>
      </div>
    </div>
  );
}
