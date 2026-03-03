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
import { useEffect, useState, MouseEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Map, X } from "lucide-react";
import PropertySearch from "@/components/property/PropertySearch";
import Filter from "@/components/property/Filter";
import { PropertyCardType } from "@/components/property/recommended-properties";
import React from "react";
import SearchResultsGoogleMap from "@/components/maps/search-results-google-map";
import SearchResultCard from "@/components/property/search-result-card";

export default () => {
  const client = useQueryClient();
  const { params } = useQueryString();
  const [page, setPage] = useState(1);
  const [viewMap, setViewMap] = useState(false);

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
    queryKey: ["search-properties"],
    queryFn: () => {
      return searchProperties(searchParams);
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const results = data ? data[0] : [];
  const numberOfPages = data ? Math.ceil((data[1] as number) / 6) : 0;

  const locations = results.length
    ? results.map(
        (r: {
          title: any;
          price: any;
          house_number: any;
          street: any;
          zip: any;
          city: any;
          lat: string;
          lng: string;
          id: string;
          photos: string[];
          country: string;
          reviews: string[];
        }) => ({
          title: r.title,
          price: r.price,
          address: `${r.house_number} ${r.street}  ${r.city}`,
          coords: [+r.lat, +r.lng],
          href: `/properties/${r.id}`,
          photos: Array.isArray(r.photos) ? r.photos : [],
          city: r.city,
          country: r.country,
          reviews: r.reviews || [],
          id: r.id,
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

  useEffect(() => {
    const invalidateQueries = async () => {
      await client.invalidateQueries({ queryKey: ["search-properties"] });
    };
    invalidateQueries();
  }, [
    page,
    city,
    adults,
    checkInDate,
    checkOutDate,
    children,
    price,
    amenities,
    typesOfProperty,
    numberOfRooms,
  ]);

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center min-h-[88vh]">
        <Spinner color="red" size={60} />
      </div>
    );

  if (error)
    return (
      <div className="w-full flex flex-col space-y-1 items-center justify-center min-h-[88vh] text-sm max-w-[1400px] mx-auto px-4">
        <p className="font-[400]"> Could not get properties at this time.</p>
        <button
          onClick={(e) => {
            location.reload();
          }}
          className="outline-none border py-2 px-4 border-0 rounded-full font-bold bg-primary text-white"
        >
          Reload
        </button>
      </div>
    );

  return (
    <>
      {/* Mobile Map Modal */}
      {viewMap && (
        <div className="fixed inset-0 z-[99999] bg-white block lg:hidden flex flex-col">
          <div className="w-full px-4 h-[60px] flex justify-between items-center border-b">
            <span className="font-semibold">{locations.length} properties nearby</span>
            <button
              onClick={() => setViewMap(false)}
              className="rounded-full border p-2 border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Close map"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 w-full">
            <SearchResultsGoogleMap locations={locations} />
          </div>
        </div>
      )}

      <div className="w-full min-h-[88vh] bg-white">
        {/* Mobile View Map Button - Fixed at bottom */}
        <button
          onClick={() => setViewMap(true)}
          className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          <Map size={20} />
          <span className="font-medium">View on map</span>
        </button>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          {/* Search and Filter Bar - Desktop only */}
          <div className="hidden lg:flex justify-center items-center gap-3 mb-8">
            <PropertySearch searchParams={searchParams} />
            <Filter />
          </div>

          {/* Results count */}
          {(results as number[]).length ? (
            <p className="font-semibold text-lg mb-4">
              {results.length} {results.length === 1 ? 'property' : 'properties'} available
            </p>
          ) : (
            <p className="font-semibold text-lg mb-4">
              Sorry, we couldn't find any matching results.
            </p>
          )}

          {/* Main Content Grid */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Property Cards Section */}
            <div className="flex-1">
              {isRefetching ? (
                <div className="flex justify-center py-12">
                  <Spinner size={30} color="red" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {results.map((property: PropertyCardType, idx: number) => (
                    <SearchResultCard
                      key={property.id || idx}
                      {...property}
                      city={property.city}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {numberOfPages > 0 && (
                <div className="mt-10">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem onClick={previousPage}>
                        <PaginationPrevious href="#" className="hover:bg-red-50" />
                      </PaginationItem>
                      
                      <div className="hidden md:flex items-center gap-1">
                        {Array.from({ length: Math.min(5, numberOfPages) }, (_, i) => {
                          let pageNumber = i + 1;
                          if (numberOfPages > 5) {
                            if (page > 3) {
                              pageNumber = page - 3 + i;
                            }
                          }
                          
                          if (pageNumber <= numberOfPages) {
                            return (
                              <PaginationItem key={pageNumber}>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    getDataByPage(pageNumber);
                                  }}
                                  className={`hover:bg-red-50 ${
                                    page === pageNumber
                                      ? "bg-primary text-white hover:bg-primary hover:text-white"
                                      : ""
                                  }`}
                                >
                                  {pageNumber}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          }
                          return null;
                        })}
                        
                        {numberOfPages > 5 && page < numberOfPages - 2 && (
                          <>
                            <PaginationEllipsis />
                            <PaginationItem>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  getDataByPage(numberOfPages);
                                }}
                                className={`hover:bg-red-50 ${
                                  page === numberOfPages
                                    ? "bg-primary text-white hover:bg-primary hover:text-white"
                                    : ""
                                }`}
                              >
                                {numberOfPages}
                              </PaginationLink>
                            </PaginationItem>
                          </>
                        )}
                      </div>
                      
                      <PaginationItem onClick={nextPage}>
                        <PaginationNext href="#" className="hover:bg-red-50" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>

            {/* Desktop Map Section - Sticky */}
            <div className="hidden lg:block lg:w-[380px] xl:w-[450px] flex-shrink-0">
              <div className="sticky top-24 h-[calc(100vh-120px)] rounded-lg overflow-hidden shadow-lg border border-gray-200">
                {data && locations.length > 0 && (
                  <SearchResultsGoogleMap locations={locations} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};