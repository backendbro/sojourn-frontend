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
      className="relative text-[18px] bg-white min-h-[50px] md:h-[50px] hero-search-shadow border border-slate-200 flex justify-between items-center rounded-full"
      /* Kill global word-break/overflow-wrap for this entire bar */
      style={{
        wordBreak: "normal",
        overflowWrap: "normal",
        WebkitLineClamp: "unset",
      }}
    >
      {/* Left inputs */}
      <div className="flex items-center flex-1">
        <ListingSearch showIcon={false} />
        <SearchCalendar showIcon={false} />
      </div>

      {/* Guests */}
      <button
        type="button"
        className="w-1/4 px-4 flex items-center space-x-2 font-[300] cursor-pointer hover:bg-red-50 rounded-full"
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
        /* prevent any wrapping in this button */
        style={{ whiteSpace: "nowrap" }}
      >
        <div
          className="w-full flex items-center justify-between h-full"
          style={{ whiteSpace: "nowrap" }}
        >
          <div
            className="flex items-center justify-between space-x-2 outline-none border-0"
            style={{ whiteSpace: "nowrap" }}
          >
            <div
              className="flex items-center space-x-1"
              style={{
                whiteSpace: "nowrap",
                wordBreak: "normal",
                overflowWrap: "normal",
              }}
            >
              <span className="font-semibold">{numberOfGuests}</span>
              <span>{guests}</span>
            </div>
            <ChevronDownIcon size={10} />
          </div>

          <ChildrenAndInfantCalculator />
        </div>
      </button>

      {/* Search button */}
      <div className="w-auto flex items-center py-2 px-2">
        <button
          ref={searchRef}
          type="submit"
          className="outline-none border-0 p-3 bg-primary ease duration-300 rounded-full w-auto hover:bg-green-500 flex items-center justify-center"
          /* make sure the button keeps size even if svg acts weird */
          style={{ lineHeight: 1 }}
          aria-label="Search"
        >
          <SearchIcon
            /* inline hard overrides so global.css can't hide/resize it */
            style={{
              display: "inline-block",
              width: 16,
              height: 16,
              color: "#ffffff",
              verticalAlign: "middle",
              flexShrink: 0,
            }}
            strokeWidth={2}
          />
        </button>
      </div>
    </form>
  );
};

export default PropertySearch;
