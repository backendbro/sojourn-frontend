// "use client";

// import Image from "next/image";
// import { useLayoutEffect } from "react";
// import { usePathname } from "next/navigation";
// import { Search } from "lucide-react";
// import Link from "next/link";

// export default () => {
//   const pathname = usePathname();

//   const isHomePage = pathname.slice(0) !== "/";

//   useLayoutEffect(() => {
//     if (!isHomePage) {
//       const handleScroll = (e: Event) => {
//         const searchBox = document.querySelector(
//           "#menu-search-container"
//         ) as Element;
//         const pos = window.scrollY;

//         if (pos > 400) {
//           searchBox.classList.add("show-search");
//         } else {
//           searchBox.classList.remove("show-search");
//         }
//       };

//       document.addEventListener("scroll", handleScroll);
//       document.addEventListener("DOMContentLoaded", handleScroll);

//       return () => {
//         document.removeEventListener("scroll", handleScroll);
//         document.removeEventListener("DOMContentLoaded", handleScroll);
//       };
//     }
//   }, [pathname]);

//   return (
//     !isHomePage && (
//       <Link
//         href="#custom-search"
//         id="menu-search-container"
//         className={`bg-white items-center justify-start justify-center rounded-3xl py-[4px] px-6 slide-in-search-shadow space-x-2 hide-search`}
//       >
//         <span className="text-[18px] font-[500] text-gray-400">Search</span>
//         <button className="outline-none border-none  p-1 ease duration-300 bg-primary hover:bg-green-500 rounded-full">
//           <Search size={23} className="stroke-white" />
//         </button>
//       </Link>
//     )
//   );
// };

"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { useListingSearch } from "@/context/SearchContext";

const formatDate = (date: Date | null) => {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

export default () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHomePage = pathname === "/";
  const isPropertiesPage = pathname === "/properties";
  const isEnabled = isHomePage || isPropertiesPage;

  const [visible, setVisible] = useState(false);

  const { value, checkInDate, checkOutDate, adults, children, infants } =
    useListingSearch();

  const urlCity = searchParams.get("city") || "";
  const urlCheckIn = searchParams.get("check-in");
  const urlCheckOut = searchParams.get("check-out");
  const urlAdults = Number(searchParams.get("adults")) || 0;
  const urlChildren = Number(searchParams.get("children")) || 0;
  const urlInfants = Number(searchParams.get("infants")) || 0;

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    if (isHomePage) {
      setVisible(scrollY > window.innerHeight * 0.55);
    } else if (isPropertiesPage) {
      const searchBar = document.getElementById("properties-search-bar");
      if (searchBar) {
        const rect = searchBar.getBoundingClientRect();
        setVisible(rect.bottom < 80);
      } else {
        setVisible(scrollY > 160);
      }
    }
  }, [isHomePage, isPropertiesPage]);

  useEffect(() => {
    if (!isEnabled) {
      setVisible(false);
      return;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isEnabled, handleScroll]);

  if (!isEnabled) return null;

  const totalGuests = isPropertiesPage
    ? urlAdults + urlChildren
    : (adults || 0) + (children || 0);
  const infantCount = isPropertiesPage ? urlInfants : infants || 0;

  const locationText = isPropertiesPage
    ? urlCity || "Anywhere"
    : value || "Anywhere";

  const dateText = isPropertiesPage
    ? urlCheckIn && urlCheckOut
      ? `${formatDate(new Date(urlCheckIn))} – ${formatDate(new Date(urlCheckOut))}`
      : "Any dates"
    : checkInDate && checkOutDate
      ? `${formatDate(checkInDate)} – ${formatDate(checkOutDate)}`
      : "Any dates";

  const guestText = totalGuests
    ? `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}${infantCount > 0 ? `, ${infantCount} infant${infantCount !== 1 ? "s" : ""}` : ""}`
    : "Add guests";

  const scrollTarget = isPropertiesPage
    ? "#properties-search-bar"
    : "#custom-search";

  return (
    <a
      href={scrollTarget}
      className={`navbar-search-bar items-center rounded-full bg-white shadow-md overflow-hidden transition-all duration-300 ease-out hidden md:items-center ${
        visible
          ? "navbar-search-bar-visible md:flex max-w-[520px] opacity-100 translate-y-0"
          : "max-w-0 opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      {/* Location */}
      <div className="flex items-center gap-1.5 pl-4 pr-3 py-2 border-r border-gray-200">
        <MapPin size={14} className="text-primary shrink-0" />
        <span className="text-[13px] font-semibold text-gray-800 whitespace-nowrap capitalize">
          {locationText}
        </span>
      </div>

      {/* Dates */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-r border-gray-200">
        <Calendar size={14} className="text-primary shrink-0" />
        <span className="text-[13px] text-gray-600 whitespace-nowrap">
          {dateText}
        </span>
      </div>

      {/* Guests */}
      <div className="flex items-center gap-1.5 px-3 py-2">
        <Users size={14} className="text-primary shrink-0" />
        <span className="text-[13px] text-gray-600 whitespace-nowrap">
          {guestText}
        </span>
      </div>

      {/* Search icon */}
      <div className="pr-1.5 pl-1">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Search size={14} className="text-white" />
        </div>
      </div>
    </a>
  );
};
