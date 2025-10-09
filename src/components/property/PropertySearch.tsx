"use client";

import ListingSearch from "@/components/ui/listing-search";
import { useListingSearch } from "@/context/SearchContext";
import SearchCalendar from "@/components/ui/search-calendar";
import ChildrenAndInfantCalculator from "@/components/ui/children-infant-calculator";
import ChevronDownIcon from "../svgs/chevronDownIcon";
import useQueryString from "@/hooks/useQueryString";
import { FormEvent } from "react";
import { Search as SearchIcon } from "lucide-react";
import { PropertySearchQueriesKeys } from "@/types/properties";
import { toast } from "sonner";

const PropertySearch = ({
  searchRef,
  searchParams: {
    city = "",
    checkInDate,
    checkOutDate,
    adults = 1,
    children = 0,
    infants = 0,
    amenities,
    price,
    typesOfProperty,
    numberOfRooms,
  },
}: {
  searchParams: PropertySearchQueriesKeys;
  searchRef?: any;
}) => {
  const { router } = useQueryString();

  const tomorrow = new Date(Date.now() + 86400000);
  const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);

  const searchValues = useListingSearch({
    searchValues: {
      value: city,
      checkInDate: checkInDate ? new Date(checkInDate) : tomorrow,
      checkOutDate: checkOutDate ? new Date(checkOutDate) : dayAfterTomorrow,
      adults,
      children: Number(children),
      infants,
      open: false,
      openChildrenCalculator: false,
    },
  });

  const checkInDateState = searchValues.checkInDate ?? checkInDate;
  const checkOutDateState = searchValues.checkOutDate ?? checkOutDate;
  const cityState = searchValues.value ?? city;
  const adultsState = searchValues.adults ?? adults;
  const childrenState = searchValues.children ?? children;
  const infantsState = searchValues.infants ?? infants;

  const numberOfGuests =
    (searchValues.adults || 0) +
    (searchValues.children || 0) +
    (searchValues.infants || 0);

  const guests = numberOfGuests > 1 ? "Guests" : "Guest";

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!checkInDateState || !cityState || !searchValues.value) {
      toast("Search Error.", {
        description: "You must submit at least a city and a check-in date.",
        action: { label: "Ok", onClick: () => null },
      });
    } else {
      router.push(
        `/properties?city=${cityState}&adults=${adultsState}&children=${childrenState}&infants=${infantsState}&check-in=${checkInDateState}&check-out=${checkOutDateState}&type_of_property=${typesOfProperty}&number_of_rooms=${numberOfRooms}&price=${
          price ? +price : ""
        }&amenities=${amenities ?? ""}`
      );
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative bg-white hero-search-shadow border border-slate-200 rounded-full flex items-center justify-between overflow-hidden"
      style={{
        minHeight: "55px",
        fontSize: "16px",
        wordBreak: "normal",
        overflowWrap: "normal",
      }}
    >
      {/* Wrapper for 3 equal input sections */}
      <div
        className="grid flex-1"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        {/* 1. City Search */}
        <div
          className="flex items-center justify-center px-4 border-r border-gray-200 h-full"
          style={{ whiteSpace: "nowrap" }}
        >
          <ListingSearch showIcon={false} />
        </div>

        {/* 2. Dates */}
        <div
          className="flex items-center justify-center px-4 border-r border-gray-200 h-full"
          style={{ whiteSpace: "nowrap" }}
        >
          <SearchCalendar showIcon={false} />
        </div>

        {/* 3. Guests */}
        <button
          type="button"
          className="flex items-center justify-between w-full px-4 font-[300] hover:bg-red-50 h-full"
          onClick={(e) => {
            e.preventDefault();
            searchValues.setSearchValue((prevState) => ({
              ...prevState,
              searchValues: {
                ...prevState.searchValues,
                openChildrenCalculator:
                  !prevState.searchValues.openChildrenCalculator,
              },
            }));
          }}
          style={{
            whiteSpace: "nowrap",
            wordBreak: "normal",
            overflowWrap: "normal",
          }}
        >
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{numberOfGuests}</span>
            <span>{guests}</span>
          </div>
          <ChevronDownIcon size={12} />
          <ChildrenAndInfantCalculator />
        </button>
      </div>

      {/* Search Button */}
      <div
        className="flex items-center justify-center bg-primary p-3 rounded-full mr-2 cursor-pointer hover:bg-green-500 transition-all duration-200"
        style={{
          width: "45px",
          height: "45px",
          flexShrink: 0,
        }}
      >
        <button
          ref={searchRef}
          type="submit"
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchIcon
            style={{
              display: "inline-block",
              width: 18,
              height: 18,
              color: "#fff",
              verticalAlign: "middle",
              flexShrink: 0,
            }}
          />
        </button>
      </div>
    </form>
  );
};

export default PropertySearch;
