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
        console.error("❌ Failed to fetch property:", error);
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
  } = ticketData;

  // Fix for amenities (API returns "ammenities")
  const amenities =
    property?.ammenities ||
    property?.amenities ||
    property?.data?.amenities ||
    [];

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
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                Property Image
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

            <Link
              href={`/properties/${propertyId}`}
              target="_blank"
              className="absolute top-3 left-3 px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-50 transition shadow-md z-10"
            >
              View Listing
            </Link>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition z-20 shadow-md"
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

        {/* ✅ NEW PROPERTY DETAILS CARD */}
        {property && (
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Property Details
            </h4>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {property.numberOfRooms !== undefined && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <p className="text-xs text-blue-600 font-medium">Rooms</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {property.numberOfRooms}
                    </p>
                  </div>
                )}

                {property.maxNumberOfPeople !== undefined && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <p className="text-xs text-emerald-600 font-medium">
                      Max Guests
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {property.maxNumberOfPeople}
                    </p>
                  </div>
                )}

                {property.typeOfProperty && (
                  <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
                    <p className="text-xs text-purple-600 font-medium">Type</p>
                    <p className="text-sm font-semibold text-gray-900 capitalize">
                      {property.typeOfProperty}
                    </p>
                  </div>
                )}

                {amenities.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <p className="text-xs text-amber-600 font-medium">
                      Amenities
                    </p>
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
                    {amenities.map((amenity: string, index: number) => (
                      <div
                        key={index}
                        className="px-2.5 py-1.5 bg-gray-100 rounded-full border border-gray-200"
                      >
                        <span className="text-xs text-gray-700 font-medium capitalize">
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
                  ₦{Number(price).toLocaleString()}
                </p>
              </div>
              {nights && (
                <p className="text-sm text-gray-500">
                  × {nights} {nights === 1 ? "night" : "nights"}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Payment Details */}
        {amountPaid && (
          <div className="p-4 border-b border-gray-200 space-y-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Payment details
            </h4>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total</span>
              <span className="font-semibold">
                ₦{Number(amountPaid).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Price</span>
              <span className="font-semibold">
                ₦{Number(price).toLocaleString()}{" "}
                <span className="text-xs">/night</span>
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Caution fee</span>
              <span className="font-semibold">
                ₦{Number(cautionFee).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Duration</span>
              <span className="font-semibold">{nights} nights</span>
            </div>
          </div>
        )}

        {/* Guest */}
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

            <div>
              <p className="font-semibold text-sm text-gray-900">
                {hostFullName}
              </p>
              <p className="text-xs text-gray-500">Guest</p>
            </div>
          </div>
        </div>

        {/* Cancellation */}
        <div className="p-4">
          <Link href="/terms-of-use#refund-policy" target="_blank">
            <button className="flex items-center justify-between w-full text-left group">
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Cancellation policy
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  {bookingCheckInDate ? "Flexible" : "Standard"}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
