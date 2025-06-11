"use client";

import Image from "next/image";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import Link from "next/link";

export default () => {
  const pathname = usePathname();

  const isHomePage = pathname.slice(0) !== "/";

  useLayoutEffect(() => {
    if (!isHomePage) {
      const handleScroll = (e: Event) => {
        const searchBox = document.querySelector(
          "#menu-search-container"
        ) as Element;
        const pos = window.scrollY;

        if (pos > 400) {
          searchBox.classList.add("show-search");
        } else {
          searchBox.classList.remove("show-search");
        }
      };

      document.addEventListener("scroll", handleScroll);
      document.addEventListener("DOMContentLoaded", handleScroll);

      return () => {
        document.removeEventListener("scroll", handleScroll);
        document.removeEventListener("DOMContentLoaded", handleScroll);
      };
    }
  }, [pathname]);

  return (
    !isHomePage && (
      <Link
        href="#custom-search"
        id="menu-search-container"
        className={`bg-white items-center justify-start justify-center rounded-3xl py-[4px] px-6 slide-in-search-shadow space-x-2 hide-search`}
      >
        <span className="text-[18px] font-[500] text-gray-400">Search</span>
        <button className="outline-none border-none  p-1 ease duration-300 bg-primary hover:bg-green-500 rounded-full">
          <Search size={23} className="stroke-white" />
        </button>
      </Link>
    )
  );
};
