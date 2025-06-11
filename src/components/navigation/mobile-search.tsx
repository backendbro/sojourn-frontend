"use client";

import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState, MouseEvent, useRef } from "react";
import PropertySearch from "../property/PropertySearch";
import useQueryString from "@/hooks/useQueryString";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CustomSearch from "../ui/custom-search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setMobileSearchStatus } from "@/store/features/mobile-search-slice";
import FilterSearch from "../property/filter-search";

export default () => {
  const { params } = useQueryString();

  const open = useSelector(
    (state: RootState) => state.mobileSearch.isMobileSearchOpen
  );

  const dispatch = useDispatch();

  const [tab, setTab] = useState<"filters" | "search">("search");

  const [openSearch, setOpen] = useState(false);

  const city = params.get("city") as string;
  const adults = Number(params.get("adults"));
  const children = Number(params.get("children"));
  const checkInDate = params.get("check-in") as unknown as Date;
  const checkOutDate = params.get("check-out") as unknown as Date;
  const infants = Number(params.get("infants"));

  const isSearchTabActive = tab === "search" ? "border-b-2 border-black" : "";
  const isFiltersTabActive = tab === "filters" ? "border-b-2 border-black" : "";

  const searchParams = {
    city,
    adults,
    children,
    checkInDate,
    checkOutDate,
    infants,
    cursor: 1,
  };

  const pathname = usePathname();

  const showMobileSearchAndFilter =
    !pathname.includes("hosts") && pathname.slice(0) !== "/";

  return (
    <>
      {open && (
        <div className="block md:hidden fixed top-0 left-0  w-full z-[9999] about-two h-screen bg-gray-50">
          <div className="w-full flex items-center justify-end p-3">
            <span
              onClick={(e: MouseEvent<HTMLSpanElement>) => {
                dispatch(setMobileSearchStatus(false));
              }}
              className="rounded-full border-[.7px] p-2 border-gray-400 cursor-pointer hover:shadow-xl hover:border-0"
            >
              <X color="black" size={13} strokeWidth={5} />
            </span>
            <div className="w-5/6 flex items-center justify-center space-x-10">
              <button
                onClick={(e) => {
                  setTab("search");
                }}
                className={`border-0 outline-none bg-transparent  ${isSearchTabActive} text-sm font-semibold py-1`}
              >
                Search
              </button>
              <button
                onClick={(e) => {
                  setTab("filters");
                }}
                className={`border-0 outline-none  bg-transparent ${isFiltersTabActive} text-sm font-semibold py-1`}
              >
                Filters
              </button>
            </div>
          </div>
          {tab === "search" ? (
            <div className="about-one w-full px-2 min-h-[76vh] flex items-center justify-center">
              <CustomSearch />
            </div>
          ) : (
            <div className="about-two w-full px-5  min-h-[76vh] flex items-center justify-center">
              <FilterSearch
                setMobileSearchStatus={setMobileSearchStatus}
                setOpen={setOpen}
              />
            </div>
          )}
        </div>
      )}
      <Link
        href="/"
        className={`w-current ${
          !showMobileSearchAndFilter ? "block" : "hidden"
        } sm:block`}
      >
        <Image
          src="/assets/logo/soj_logo.png"
          alt="sojourn logo"
          width={108.13}
          height={29.06}
          priority={true}
        />
      </Link>
      {showMobileSearchAndFilter && (
        <div
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            dispatch(setMobileSearchStatus(true));
          }}
          className="w-5/6 flex items-center pl-3 pr-4 flex bg-white cursor-pointer sm:hidden rounded-full sj-shadow h-[53px] border border-gray-200 hover:bg-gray-50"
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <Search color="#444" size={25} strokeWidth={3} />
              <div className="flex flex-col px-3 font-semibold">
                <span className="">Where to ?</span>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px]">Anywhere</span>
                  <span className="text-[10px]">Any week</span>
                  <span className="text-[10px]">Add guests</span>
                </div>
              </div>
            </div>
            <SlidersHorizontal color="#444" size={18} strokeWidth={3} />
          </div>
        </div>
      )}
    </>
  );
};
