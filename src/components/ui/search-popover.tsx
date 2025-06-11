"use client";

import LocationIcon from "../svgs/LocationIcon";
import { useListingSearch } from "@/context/SearchContext";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCities } from "@/http/api";
import Spinner from "../svgs/Spinner";
import { toast } from "sonner";

export const SearchPopover = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cities"],
    queryFn: getAllCities,
  });

  const { open, setSearchValue } = useListingSearch();

  const modalRef: any = useRef();

  const closeModal = () => {
    setSearchValue((prevState) => ({
      ...prevState,
      searchValues: {
        ...prevState.searchValues,
        open: false,
      },
    }));
  };

  const handleClickOutside = (event: Event) => {
    //@ts-ignore
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
    event.stopPropagation();
  };

  const handleKeyDown = (event: {
    key: string;
    stopPropagation: () => void;
  }) => {
    if (event.key === "Escape") {
      closeModal();
    }
    event.stopPropagation();
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (isLoading && open)
    return (
      <div
        ref={modalRef}
        className="w-full bg-paper p-3 absolute shadow-lg left-0 w-auto z-[999999999] top-full rounded-lg sm:left-0"
      >
        <Spinner size={17} color="red" />
      </div>
    );

  if (error) {
    return (
      <div
        ref={modalRef}
        className="w-full bg-paper absolute shadow-lg left-0 w-auto z-[999999999] mt-[210px] rounded-lg py-1 sm:left-0"
      >
        <span className="text-red-700 text-xs">...</span>
      </div>
    );
  }

  useEffect(() => {
    if (error) {
      toast("App message", {
        description: "Cannot load cities at this time",
      });
    }
  }, [error]);

  return (
    open &&
    data && (
      <div
        ref={modalRef}
        className="w-full bg-paper absolute shadow-lg left-0 top-full min-h-[50px] w-auto z-[999999999] rounded-lg py-1 sm:left-0"
      >
        <ul className="w-auto overflow-hidden py-1 m-0">
          {data.map(({ city }: { city: string }, idx: number) => (
            <li
              onClick={(e) => {
                setSearchValue((prevState) => ({
                  ...prevState,
                  searchValues: {
                    ...prevState.searchValues,
                    value: city,
                    open: false,
                  },
                }));
              }}
              className="w-full  text-[16px] font-[300]  p-2 cursor-pointer group flex items-center space-x-4 hover:bg-red-50"
              key={idx}
            >
              <LocationIcon />
              <div className="capitalize">{city}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default SearchPopover;
