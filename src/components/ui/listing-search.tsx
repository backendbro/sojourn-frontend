"use client";
import { useListingSearch } from "@/context/SearchContext";

import SearchPopover from "./search-popover";
import { FC } from "react";
import useQueryString from "@/hooks/useQueryString";
import { MapPin } from "lucide-react";
import React from "react";

const ListingSearch: FC<{ showIcon?: boolean }> = ({ showIcon = true }) => {
  const { pathname } = useQueryString();

  const landingPageCss = pathname === "/" ? "py-5" : "";

  const containerCss = pathname === "/" ? "lg:w-1/3" : "sm:w-2/3";

  const { value, open, setSearchValue } = useListingSearch();

  const bgInputField = open ? "bg-red-50" : "bg-white";

  return (
    <>
      <div
        className={`w-full relative min-h-[48px] flex items-center ${bgInputField} rounded-3xl   ${containerCss} border-b-0 pl-6 lg:px-2`}
      >
        {showIcon && <MapPin size={20} className="stroke-primary" />}
        <input
          onClick={(_e) => {
            setSearchValue((prevState) => ({
              ...prevState,
              searchValues: {
                ...prevState.searchValues,
                open: true,
              },
            }));
          }}
          onChange={(e) => {
            setSearchValue((prevState) => ({
              ...prevState,
              searchValues: {
                ...prevState.searchValues,
                value: e.target.value,
              },
            }));
          }}
          value={value}
          className={`w-full text-[16px] outline-0 border-0 ${landingPageCss} px-2 ${bgInputField} rounded-t-3xl placeholder:text-gray-400  placeholder:font-[700] placeholder:text-[16px] focus:outline-none lg:py-0 placeholder:font-sans placeholder:font-[300] lg:px-4`}
          placeholder="Where are you going?"
        />
        <SearchPopover />
      </div>
    </>
  );
};

export default ListingSearch;
