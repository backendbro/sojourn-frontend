"use client";

import { BedDouble, Wifi, Tv, ShowerHead, Star } from "lucide-react";

type Props = {
  title: string;
  city: string;
  country: string;
  price: number;
  photos: string[];
  reviews: { rating: number }[];
  numberOfRooms?: number;
  typeOfProperty?: string;
};

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  "prime-inn": "Prime Inn",
  "town-house": "Town House",
};

export default function SearchResultCardRedesign({
  title,
  price,
  photos,
  reviews,
  numberOfRooms,
  typeOfProperty,
}: Props) {
  const rating =
    reviews && reviews.length
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  const typeLabel = typeOfProperty
    ? PROPERTY_TYPE_LABELS[typeOfProperty] || typeOfProperty
    : null;

  return (
    <div className="w-[220px] h-[220px] rounded-xl overflow-hidden bg-white shadow-2xl flex flex-col">
      {/* Square image — takes exactly half */}
      <div className="w-full h-[110px] relative overflow-hidden bg-gray-100 shrink-0">
        {photos?.[0] ? (
          <img
            src={photos[0]}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No image
          </div>
        )}
        {/* Price badge */}
        <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-md px-2 py-0.5 shadow">
          <span className="text-xs font-bold text-gray-900">
            ₦{price.toLocaleString()}
          </span>
          <span className="text-[9px] text-gray-500 ml-0.5">/night</span>
        </div>
        {/* Rating badge */}
        {rating && (
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm rounded-md px-1.5 py-0.5 shadow flex items-center gap-0.5">
            <Star size={10} fill="#000" strokeWidth={0} />
            <span className="text-[10px] font-semibold">{rating}</span>
          </div>
        )}
      </div>

      {/* Info — takes the other half */}
      <div className="flex-1 px-3 py-2 flex flex-col justify-between">
        <div>
          <h4 className="text-[13px] font-semibold leading-tight truncate text-gray-900">
            {title}
          </h4>
          {typeLabel && (
            <p className="text-[10px] text-gray-500 mt-0.5">{typeLabel}</p>
          )}
        </div>

        {/* Details */}
        <div className="flex items-center justify-between">
          {numberOfRooms !== undefined && numberOfRooms > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-gray-600">
              <BedDouble size={12} className="text-gray-400" />
              {numberOfRooms} {numberOfRooms === 1 ? "Bed" : "Beds"}
            </span>
          )}
          <div className="flex items-center gap-1.5">
            <Wifi size={11} className="text-gray-400" />
            <Tv size={11} className="text-gray-400" />
            <ShowerHead size={11} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
