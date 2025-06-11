"use client";

import ListingSearch from "@/components/ui/listing-search";
import { useListingSearch } from "@/context/SearchContext";
import SearchCalendar from "@/components/ui/search-calendar";
import ChildrenAndInfantCalculator from "@/components/ui/children-infant-calculator";
import ChevronDownIcon from "../svgs/chevronDownIcon";
import useQueryString from "@/hooks/useQueryString";
import { FormEvent } from "react";
import { Search } from "lucide-react";
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
    searchValues.adults + searchValues.children + searchValues.infants;

  const guests = numberOfGuests > 1 ? "Guests" : "Guest";

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!checkInDateState || !cityState || !searchValues.value) {
      toast("Search Error.", {
        description: "You must submit atleast a city and a check in date.",
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    } else {
      router.push(
        `/properties?city=${cityState}&adults=${adultsState}&children=${childrenState}&infants=${infantsState}&check-in=${checkInDateState}&check-out=${checkOutDateState}
      &type_of_property=${typesOfProperty}
  &number_of_rooms=${numberOfRooms}&price=${
          price ? +price : null
        }&amenities=${amenities}
      `
      );
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative text-[18px] bg-white min-h-[50px] md:h-[50px] hero-search-shadow  border border-slate-200 flex justify-between rounded-full"
    >
      <ListingSearch showIcon={false} />
      <SearchCalendar showIcon={false} />
      <button
        className="w-1/4 px-4 flex items-center space-x-2 font-[300] cursor-pointer hover:bg-red-50"
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
      >
        <div className="w-full flex py-0 items-center justify-between h-full">
          <div className="w-full h-full  flex">
            <div className="flex items-center justify-between space-x-2 outline-none border-0 py-4 lg:px-2 lg:py-2">
              <div className="space-x-1">
                <span className="font-semibold">{numberOfGuests}</span>
                <span>{guests}</span>
              </div>
              <ChevronDownIcon size={10} />
            </div>
            <ChildrenAndInfantCalculator />
          </div>
        </div>
      </button>
      <div className="w-auto flex items-center py-2 px-2 group">
        <button
          ref={searchRef}
          className="outline-none border-0 p-3 bg-primary ease duration-300 rounded-full w-auto group-hover:bg-green-500"
        >
          <Search size={16} color="white" />
        </button>
      </div>
    </form>
  );
};

export default PropertySearch;
