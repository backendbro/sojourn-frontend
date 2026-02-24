"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";
import { numberOfNights } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getPropertyById } from "@/http/api"; // ✅ adjust if needed

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
    console.log("📦 ListingDetails ticketData:", ticketData);

    if (!ticketData?.propertyId) return;

    const fetchProperty = async () => {
      try {
        console.log("🔎 Fetching property with ID:", ticketData.propertyId);

        const response = await getPropertyById(ticketData.propertyId);

        // 🔥 FULL RESPONSE
        console.log("✅ getPropertyById RESPONSE:", response);

        // 🔥 Amenities debug paths
        console.log("🧩 response.ammenities:", response?.ammenities);
        console.log("🧩 response.amenities:", response?.amenities);
        console.log("🧩 response.data?.amenities:", response?.data?.amenities);

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

  // 🔹 Fix for amenities (API returns "ammenities")
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
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-sm font-medium opacity-90">
                      Property Image
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

            <Link
              href={`/properties/${propertyId}`}
              target="_blank"
              className="absolute top-3 left-3 px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 z-10"
            >
              View Listing
            </Link>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-all duration-200 active:scale-95 z-20 shadow-md hover:shadow-lg"
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

        {/* ✅ Amenities Section */}
        {Array.isArray(amenities) && amenities.length > 0 && (
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Amenities
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {amenities.map((amenity: any, index: number) => (
                <div
                  key={index}
                  className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-700"
                >
                  {typeof amenity === "string"
                    ? amenity
                    : amenity?.name || JSON.stringify(amenity)}
                </div>
              ))}
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
                  ₦{new Number(price).toLocaleString()}
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

        {/* Payment details */}
        {amountPaid && (
          <div className="p-4 border-b border-gray-200 space-y-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Payment details
            </h4>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total</span>
              <span className="font-semibold">
                ₦{new Number(amountPaid).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Price</span>
              <span className="font-semibold">
                ₦{new Number(price).toLocaleString()}{" "}
                <span className="text-xs">/night</span>
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Caution fee</span>
              <span className="font-semibold">
                ₦{new Number(cautionFee).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Duration</span>
              <span className="font-semibold">{nights} nights</span>
            </div>
          </div>
        )}

        {/* Check-in/out */}
        {bookingCheckInDate && bookingCheckOutDate && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Check in</p>
                <p className="text-sm font-medium">{bookingCheckInDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Check out</p>
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
        <div className="p-4">
          <Link
            href="/terms-of-use#refund-policy"
            target="_blank"
            className="block"
          >
            <button className="flex items-center justify-between w-full text-left group p-2 -m-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Cancellation policy
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  {bookingCheckInDate ? "Flexible" : "Standard"}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
