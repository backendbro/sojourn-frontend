"use client";

import Spinner from "@/components/svgs/Spinner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useQueryString from "@/hooks/useQueryString";
import { searchProperties } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { useState, MouseEvent } from "react";
import { Map, X, MapPin, SearchX } from "lucide-react";
import PropertySearch from "@/components/property/PropertySearch";
import Filter from "@/components/property/Filter";
import { PropertyCardType } from "@/components/property/recommended-properties";
import React from "react";
import SearchResultsGoogleMap from "@/components/maps/search-results-google-map";
import SearchResultCard from "@/components/property/search-result-card";

export default () => {
  const { params } = useQueryString();

  const [page, setPage] = useState(1);

  const city = params.get("city") as string;
  const adults = Number(params.get("adults"));
  const children = Number(params.get("children"));
  const checkInDate = params.get("check-in") as unknown as Date;
  const checkOutDate = params.get("check-out") as unknown as Date;
  const infants = Number(params.get("infants"));
  const typesOfProperty = params.get("types_of_property");
  const numberOfRooms = params.get("number_of_rooms");
  const price = params.get("price");
  const amenities = params.get("amenities");

  const searchParams = {
    city,
    adults,
    children,
    checkInDate,
    checkOutDate,
    infants,
    cursor: +page - 1,
    typesOfProperty: typesOfProperty ? typesOfProperty.split(",") : [],
    numberOfRooms: numberOfRooms ? numberOfRooms.split(",") : [],
    price: price ? +price : 0,
    amenities: amenities ? amenities.split(",") : [],
  };

  const { data, error, isLoading, isRefetching } = useQuery({
    queryKey: [
      "search-properties",
      city, adults, children, checkInDate, checkOutDate,
      typesOfProperty, numberOfRooms, price, amenities, page,
    ],
    queryFn: () => searchProperties(searchParams),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const [viewMap, setViewMap] = useState(false);

  const results = data ? data[0] : [];
  const numberOfPages = data ? Math.ceil((data[1] as number) / 6) : 0;

  const locations = results.length
    ? results.map(
        (r: {
          title: any;
          price: any;
          houseNumber: any;
          street: any;
          zip: any;
          city: any;
          lat: string;
          lng: string;
          id: string;
          photos: string[];
          country: string;
          reviews: { rating: number }[];
          numberOfRooms: number;
          typeOfProperty: string;
        }) => ({
          id: r.id,
          title: r.title,
          price: r.price,
          address: `${r.houseNumber} ${r.street}  ${r.city}`,
          coords: [+r.lat, +r.lng],
          href: `/properties/${r.id}`,
          photos: Array.isArray(r.photos) ? r.photos : [],
          city: r.city,
          country: r.country || "Nigeria",
          reviews: Array.isArray(r.reviews) ? r.reviews : [],
          numberOfRooms: r.numberOfRooms || 0,
          typeOfProperty: r.typeOfProperty || "",
        })
      )
    : [];

  const getDataByPage = async (pageNumber: number) => {
    setPage(pageNumber);
  };

  const previousPage = async (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  const nextPage = async (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (page < numberOfPages) {
      setPage((prevPage) => prevPage + 1);
    }
    if (page === numberOfPages) {
      setPage(numberOfPages);
    }
  };


  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center min-h-[88vh]">
        <Spinner color="red" size={60} />
      </div>
    );

  if (error)
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[88vh] gap-4">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
          <SearchX className="text-primary" size={28} />
        </div>
        <p className="text-gray-600 text-sm">
          Could not get properties at this time.
        </p>
        <button
          onClick={() => location.reload()}
          className="px-6 py-2.5 rounded-full font-semibold bg-primary text-white text-sm hover:bg-red-700 transition-colors"
        >
          Try again
        </button>
      </div>
    );

  const totalGuests = adults + children + infants;
  const guestLabel = totalGuests === 1 ? "guest" : "guests";

  return (
    <>
      {/* Mobile fullscreen map overlay */}
      {viewMap && (
        <div className="fixed w-full inset-0 z-[99999] bg-white block sm:hidden">
          <div className="w-full px-4 h-[50px] flex justify-center items-center">
            <span
              onClick={(e: MouseEvent<HTMLSpanElement>) => {
                setViewMap(false);
              }}
              className="rounded-full border-[.7px] p-2 border-gray-400 cursor-pointer hover:shadow-xl hover:border-0"
            >
              <X color="red" size={13} strokeWidth={5} />
            </span>
          </div>
          <SearchResultsGoogleMap locations={locations} />
        </div>
      )}

      <div className="w-full min-h-screen bg-gray-50/60">
        {/* Search bar — scrolls away, then compact version appears in the navbar */}
        <div
          id="properties-search-bar"
          className="w-full bg-white border-b border-gray-100 z-[100]"
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 py-3 sm:py-4">
              <div className="flex-1 min-w-0">
                <PropertySearch searchParams={searchParams} />
              </div>
              <Filter />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results header */}
          <div className="py-5 sm:py-6">
            {(results as number[]).length ? (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary shrink-0" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 capitalize">
                  {city}
                </h1>
                <span className="text-gray-400 font-light">|</span>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">
                    {(results as number[]).length}
                  </span>{" "}
                  {(results as number[]).length === 1 ? "property" : "properties"}{" "}
                  available
                  {totalGuests > 0 && (
                    <span className="hidden sm:inline">
                      {" "}
                      · {totalGuests} {guestLabel}
                    </span>
                  )}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                  <SearchX className="text-gray-400" size={24} />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-800 text-base">
                    No properties found
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Grid: Cards + Map */}
          {(results as number[]).length > 0 && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pb-10">
              {/* Property cards */}
              <div className="w-full order-2 lg:order-1">
                {isRefetching ? (
                  <div className="flex items-center justify-center py-20">
                    <Spinner size={30} color="red" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 content-start">
                    {results.map(
                      (property: PropertyCardType, idx: number) => (
                        <SearchResultCard
                          key={idx}
                          {...property}
                          city={property.city}
                        />
                      )
                    )}
                  </div>
                )}

                {/* Pagination */}
                {numberOfPages > 1 && (
                  <div className="mt-8 sm:mt-10 pb-4">
                    <Pagination>
                      <PaginationContent className="gap-1.5">
                        <PaginationItem
                          onClick={previousPage}
                          className="list-none"
                        >
                          <PaginationPrevious
                            href="#"
                            className={`hover:bg-red-50 border border-gray-200 rounded-lg text-xs sm:text-sm h-9 ${
                              page <= 1
                                ? "pointer-events-none opacity-40"
                                : ""
                            }`}
                          />
                        </PaginationItem>

                        {/* Mobile page indicator */}
                        <div className="flex md:hidden items-center px-3">
                          <span className="text-sm font-medium text-gray-600">
                            {page} / {numberOfPages}
                          </span>
                        </div>

                        {/* Desktop pagination numbers */}
                        <div className="hidden md:flex md:items-center gap-1">
                          <>
                            {page >= 6 ? (
                              <PaginationItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  getDataByPage(1);
                                }}
                                className="list-none"
                              >
                                <PaginationLink
                                  href="#"
                                  className={`list-none hover:bg-red-50 rounded-lg h-9 w-9 ${
                                    page === 1
                                      ? "bg-primary text-white hover:bg-primary hover:text-white"
                                      : "border border-gray-200"
                                  }`}
                                >
                                  1
                                </PaginationLink>
                              </PaginationItem>
                            ) : null}
                            {numberOfPages > 3 && page >= 6 && (
                              <PaginationItem className="list-none">
                                <PaginationEllipsis />
                              </PaginationItem>
                            )}
                            {page <= 3 &&
                              new Array(numberOfPages)
                                .fill(0)
                                .map((_, idx: number) => {
                                  const pageNumber = idx + 1;
                                  if (pageNumber > 3) return;
                                  return (
                                    <PaginationItem
                                      onClick={(
                                        e: MouseEvent<HTMLLIElement>
                                      ) => {
                                        e.preventDefault();
                                        getDataByPage(pageNumber);
                                      }}
                                      key={pageNumber}
                                      className="list-none"
                                    >
                                      <PaginationLink
                                        href="#"
                                        aria-current={
                                          page === pageNumber
                                            ? "page"
                                            : undefined
                                        }
                                        className={`hover:bg-red-50 rounded-lg h-9 w-9 ${
                                          page === pageNumber
                                            ? "bg-primary text-white hover:bg-primary hover:text-white"
                                            : "border border-gray-200"
                                        }`}
                                      >
                                        {pageNumber}
                                      </PaginationLink>
                                    </PaginationItem>
                                  );
                                })}
                            {page > 3 &&
                              new Array(3).fill(0).map((_, idx: number) => {
                                const pageNumber = page + idx;
                                if (
                                  pageNumber <= 3 ||
                                  pageNumber >= numberOfPages
                                )
                                  return;
                                return (
                                  <PaginationItem
                                    onClick={(e) => {
                                      e.preventDefault();
                                      getDataByPage(pageNumber);
                                    }}
                                    key={idx}
                                    className="list-none"
                                  >
                                    <PaginationLink
                                      href="#"
                                      className={`hover:bg-red-50 rounded-lg h-9 w-9 ${
                                        page === pageNumber
                                          ? "bg-primary text-white hover:bg-primary hover:text-white"
                                          : "border border-gray-200"
                                      }`}
                                    >
                                      {pageNumber}
                                    </PaginationLink>
                                  </PaginationItem>
                                );
                              })}
                          </>
                          {numberOfPages > 3 && page <= 3 && (
                            <PaginationItem className="list-none">
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                          {numberOfPages > 3 &&
                            page > 3 &&
                            page < numberOfPages - 3 && (
                              <PaginationItem className="list-none">
                                <PaginationEllipsis />
                              </PaginationItem>
                            )}
                          {numberOfPages > 3 ? (
                            <PaginationItem
                              onClick={(e) => {
                                e.preventDefault();
                                getDataByPage(numberOfPages);
                              }}
                              className="list-none"
                            >
                              <PaginationLink
                                href="#"
                                className={`list-none hover:bg-red-50 rounded-lg h-9 w-9 ${
                                  page === numberOfPages
                                    ? "bg-primary text-white hover:bg-primary hover:text-white"
                                    : "border border-gray-200"
                                }`}
                              >
                                {numberOfPages}
                              </PaginationLink>
                            </PaginationItem>
                          ) : null}
                        </div>

                        <PaginationItem
                          className="list-none"
                          onClick={nextPage}
                        >
                          <PaginationNext
                            href="#"
                            className={`hover:bg-red-50 border border-gray-200 rounded-lg text-xs sm:text-sm h-9 ${
                              page >= numberOfPages
                                ? "pointer-events-none opacity-40"
                                : ""
                            }`}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>

              {/* Map — perfect square on desktop, rectangular on tablet */}
              <div className="w-full order-1 lg:order-2 hidden sm:block">
                <div className="lg:sticky lg:top-[100px]">
                  {data ? (
                    <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-gray-200/60 bg-gray-200">
                      <SearchResultsGoogleMap locations={locations} />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Map FAB */}
        <button
          onClick={() => setViewMap(true)}
          className="fixed flex items-center gap-2 rounded-full py-3 px-6 shadow-xl z-[999] bg-gray-900 bottom-20 left-1/2 -translate-x-1/2 sm:hidden hover:bg-gray-800 transition-colors"
        >
          <Map color="white" size={16} />
          <span className="text-white font-semibold text-sm">Map</span>
        </button>
      </div>
    </>
  );
};
