"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";
import { numberOfNights } from "@/lib/utils";

interface ListingDetailsProps {
  ticketData: any; // Replace with proper type from your API if available
  onClose: () => void;
}

export default function ListingDetails({
  ticketData,
  onClose,
}: ListingDetailsProps) {
  // Debug: log the ticket data
  useEffect(() => {
    console.log("📦 ListingDetails ticketData:", ticketData);
    if (ticketData) {
      console.log("🔑 propertyId:", ticketData.propertyId);
    }
  }, [ticketData]);

  if (!ticketData) return null;

  // Destructure exactly as in message-viewer
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

  const nights =
    bookingCheckInDate && bookingCheckOutDate
      ? numberOfNights(
          new Date(bookingCheckInDate),
          new Date(bookingCheckOutDate),
        )
      : undefined;

  const bookingOrListing = bookingCheckInDate ? "Reservation" : "Listing";

  return (
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col h-full shadow-lg animate-slide-in">
      <div className="flex-1 overflow-y-auto">
        {/* Header with title and close button (exactly as in message-viewer) */}
        <div className="w-full flex items-center justify-between px-2 py-3 border-b border-b-gray-300">
          <h3 className="text-xl pl-3">{bookingOrListing}</h3>
          <button
            className="outline-none border-0 rounded-md bg-gray-100 p-1"
            onClick={onClose}
          >
            <X size={15} color="black" />
          </button>
        </div>

        {/* Property Image with View Listing link (same as message-viewer) */}
        <Link
          href={`/properties/${propertyId}`}
          target="_blank"
          className="font-semibold text-md block"
        >
          {propertyPhoto ? (
            <div className="w-full rounded-md overflow-hidden relative h-[150px] group">
              <div className="absolute bg-black opacity-40 w-full h-full top-0 left-0 z-10 ease duration-300 hover:opacity-20"></div>
              <div className="absolute px-3 py-2 top-4 left-4 z-50 isolate rounded-full bg-gray-200 shadow-md font-bold text-xs">
                View Listing
              </div>
              <Image
                src={propertyPhoto}
                alt="property_photo"
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="w-full h-[150px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-md">
              <svg
                className="w-16 h-16 text-white opacity-80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
          )}
        </Link>

        {/* Staying at (if no booking) */}
        {!bookingCheckInDate && (
          <div className="w-full flex flex-col p-3 pl-6 border-b border-b-gray-200 space-y-2">
            <h5 className="font-semibold text-md">Staying at</h5>
            <div className="capitalize">{propertyTitle}</div>
          </div>
        )}

        {/* Location */}
        <div className="w-full flex flex-col p-3 pl-6 border-b border-b-gray-200 space-y-2">
          <h5 className="font-semibold text-md">Location</h5>
          <div>{location}</div>
        </div>

        {/* Price per night (if no booking) */}
        {!bookingCheckInDate && price !== undefined && (
          <div className="w-full flex flex-col p-3 pl-6 border-b border-b-gray-200 space-y-2">
            <h5 className="font-semibold text-md">Price per night</h5>
            <div>₦{new Number(price).toLocaleString()}</div>
          </div>
        )}

        {/* Payment details (if booking) */}
        {amountPaid && (
          <div className="w-full flex flex-col p-3 pl-6 border-b border-b-gray-200 space-y-3">
            <h5 className="font-semibold text-md">Payment details</h5>
            <div className="w-full flex justify-between">
              <div className="font-inter">
                ₦{new Number(price).toLocaleString()}
              </div>
              <div className="flex items-center w-[108px] text-left">
                <X size={15} />
                {nights} nights
              </div>
            </div>
            <div className="w-full flex justify-between">
              <h5>Caution fee</h5>
              <div className="font-inter text-left w-[108px]">
                ₦{new Number(cautionFee).toLocaleString()}
              </div>
            </div>
            <div className="w-full flex justify-between">
              <h5 className="font-[700]">Total</h5>
              <div className="font-inter font-[700] text-left w-[108px]">
                ₦{new Number(amountPaid).toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* Check-in/out (if booking) */}
        {bookingCheckInDate && bookingCheckOutDate && (
          <div className="w-full flex justify-between p-3 pl-6 border-b border-b-gray-200">
            <div>
              <h5 className="font-semibold text-md">Check in</h5>
              <div>{bookingCheckInDate}</div>
            </div>
            <div className="w-[108px] flex flex-col">
              <h5 className="font-semibold text-md">Check out</h5>
              <div>{bookingCheckOutDate}</div>
            </div>
          </div>
        )}

        {/* Host / Guest Info (same as message-viewer) */}
        <div className="w-full flex items-center p-3 pl-6 border-b border-b-gray-200">
          <div className="cursor-pointer flex w-[45px] h-[45px] items-center bg-gray-200 rounded-full overflow-hidden relative mr-3">
            {hostPhoto ? (
              <Image
                src={hostPhoto}
                alt="host"
                fill
                priority
                className="object-cover"
              />
            ) : (
              <Image
                src="/assets/icons/person-placeholder.png"
                alt="person_placeholder"
                width={23}
                height={23}
              />
            )}
          </div>
          <span className="font-semibold text-lg">{hostFullName}</span>
        </div>

        {/* Cancellation policy */}
        <Link
          href="/terms-of-use#refund-policy"
          target="_blank"
          className="font-semibold text-md p-0 m-0 block border-b border-b-gray-200"
        >
          <div className="w-full flex items-center p-3 pl-6 justify-between h-full">
            <span>Cancellation policy</span>
            <ChevronRight size={16} />
          </div>
        </Link>
      </div>
    </div>
  );
}
