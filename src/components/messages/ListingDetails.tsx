"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";
import { numberOfNights } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getPropertyById } from "@/http/api";

interface ListingDetailsProps {
  ticketData: any;
  onClose: () => void;
}

export default function ListingDetails({
  ticketData,
  onClose,
}: ListingDetailsProps) {
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    if (!ticketData?.propertyId) return;

    const fetchProperty = async () => {
      try {
        const response = await getPropertyById(ticketData.propertyId);
        setProperty(response);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      }
    };

    fetchProperty();
  }, [ticketData]);

  if (!ticketData) return null;

  const {
    propertyId,
    propertyPhoto,
    propertyTitle,
    location,
    price,
    amountPaid,
    cautionFee,
    bookingCheckInDate,
    bookingCheckOutDate,
    hostFullName,
    hostPhoto,
    bedrooms,
    bathrooms,
    maxGuests,
    cancellationPolicy,
  } = ticketData;

  const amenities = property?.amenities || property?.data?.amenities || [];

  const nights =
    bookingCheckInDate && bookingCheckOutDate
      ? numberOfNights(
          new Date(bookingCheckInDate),
          new Date(bookingCheckOutDate),
        )
      : undefined;

  return (
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col h-full shadow-lg animate-slide-in">
      <div className="flex-1 overflow-y-auto">
        {/* Property Image */}
        <div className="p-4">
          <div className="relative w-full h-64 bg-gray-200 rounded-lg border-4 border-white shadow-xl overflow-hidden group">
            {propertyPhoto ? (
              <Image
                src={propertyPhoto}
                alt={propertyTitle}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm font-medium text-white opacity-90">
                    Property Image
                  </p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
            <Link
              href={`/properties/${propertyId}`}
              target="_blank"
              className="absolute top-3 left-3 px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-50 shadow-md z-10"
            >
              View Listing
            </Link>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full z-20 shadow-md"
              aria-label="Close listing details"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Property Title */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-gray-900 mb-1">
            {propertyTitle}
          </h2>
          {location && (
            <p className="text-sm text-gray-600 capitalize">{location}</p>
          )}
        </div>

        {/* Property Details Card */}
        {(bedrooms || bathrooms || maxGuests || amenities.length > 0) && (
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Property Details
            </h4>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {bedrooms !== undefined && (
                  <div className="flex items-center gap-2.5">
                    <p className="text-xs text-gray-500">Bedrooms</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {bedrooms}
                    </p>
                  </div>
                )}
                {bathrooms !== undefined && (
                  <div className="flex items-center gap-2.5">
                    <p className="text-xs text-gray-500">Bathrooms</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {bathrooms}
                    </p>
                  </div>
                )}
                {maxGuests !== undefined && (
                  <div className="flex items-center gap-2.5">
                    <p className="text-xs text-gray-500">Max Guests</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {maxGuests}
                    </p>
                  </div>
                )}
                {amenities.length > 0 && (
                  <div className="flex items-center gap-2.5">
                    <p className="text-xs text-gray-500">Amenities</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {amenities.length}
                    </p>
                  </div>
                )}
              </div>

              {/* Amenities List */}
              {amenities.length > 0 && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Amenities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-xs text-gray-700 font-medium">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pricing */}
        {price !== undefined && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-baseline">
              <div>
                <p className="text-xs text-gray-500 mb-1">Price per night</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₦{price.toLocaleString()}
                </p>
              </div>
              {nights && (
                <p className="text-sm text-gray-500">
                  × {nights} {nights === 1 ? "night" : "nights"}
                </p>
              )}
            </div>

            {/* Payment details */}
            {(amountPaid || cautionFee) && (
              <div className="mt-3 space-y-2">
                {amountPaid && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Paid</span>
                    <span className="font-semibold">
                      ₦{amountPaid.toLocaleString()}
                    </span>
                  </div>
                )}
                {cautionFee && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Caution Fee</span>
                    <span className="font-semibold">
                      ₦{cautionFee.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Check-in/out */}
        {bookingCheckInDate && bookingCheckOutDate && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Check-in</p>
                <p className="text-sm font-medium">{bookingCheckInDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Check-out</p>
                <p className="text-sm font-medium">{bookingCheckOutDate}</p>
              </div>
            </div>
          </div>
        )}

        {/* Guest Information */}
        <div className="p-4 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Guest
          </p>
          <div className="flex items-center gap-3">
            {hostPhoto ? (
              <Image
                src={hostPhoto}
                alt={hostFullName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                {hostFullName?.charAt(0) || "?"}
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900">
                {hostFullName}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Guest</p>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        {cancellationPolicy && (
          <div className="p-4">
            <Link href="/terms-of-use#refund-policy" target="_blank">
              <button className="flex items-center justify-between w-full text-left group p-2 -m-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    Cancellation policy
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    {cancellationPolicy}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
