// "use client";

// import Spinner from "@/components/svgs/Spinner";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import useQueryString from "@/hooks/useQueryString";
// import { searchProperties } from "@/http/api";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState, MouseEvent } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { Map, X } from "lucide-react";
// import PropertySearch from "@/components/property/PropertySearch";
// import Filter from "@/components/property/Filter";
// import { PropertyCardType } from "@/components/property/recommended-properties";
// import React from "react";
// import SearchResultsGoogleMap from "@/components/maps/search-results-google-map";
// import SearchResultCard from "@/components/property/search-result-card";

// export default () => {
//   const client = useQueryClient();

//   const { params } = useQueryString();

//   const [page, setPage] = useState(1);

//   const city = params.get("city") as string;
//   const adults = Number(params.get("adults"));
//   const children = Number(params.get("children"));
//   const checkInDate = params.get("check-in") as unknown as Date;
//   const checkOutDate = params.get("check-out") as unknown as Date;
//   const infants = Number(params.get("infants"));
//   const typesOfProperty = params.get("types_of_property");
//   const numberOfRooms = params.get("number_of_rooms");
//   const price = params.get("price");
//   const amenities = params.get("amenities");

//   const searchParams = {
//     city,
//     adults,
//     children,
//     checkInDate,
//     checkOutDate,
//     infants,
//     cursor: +page - 1,
//     typesOfProperty: typesOfProperty ? typesOfProperty.split(",") : [],
//     numberOfRooms: numberOfRooms ? numberOfRooms.split(",") : [],
//     price: price ? +price : 0,
//     amenities: amenities ? amenities.split(",") : [],
//   };

//   const { data, error, isLoading, isRefetching } = useQuery({
//     queryKey: ["search-properties"],
//     queryFn: () => {
//       return searchProperties(searchParams);
//     },
//     refetchOnMount: true,
//     refetchOnWindowFocus: false,
//   });

//   const [viewMap, setViewMap] = useState(false);

//   const results = data ? data[0] : [];
//   const numberOfPages = data ? Math.ceil((data[1] as number) / 6) : 0;

//   const locations = results.length
//     ? results.map(
//         (r: {
//           title: any;
//           price: any;
//           house_number: any;
//           street: any;
//           zip: any;
//           city: any;
//           lat: string;
//           lng: string;
//           id: string;
//           photos: string[];
//           country: string;
//           reviews: string[];
//         }) => ({
//           title: r.title,
//           price: r.price,
//           address: `${r.house_number} ${r.street}  ${r.city}`,
//           coords: [+r.lat, +r.lng],
//           href: `/properties/${r.id}`,
//           photos: Array.isArray(r.photos) ? r.photos : [], // ✅ make sure it's always an array
//           city: r.city,
//           country: r.country,
//           reviews: r.reviews || [],
//         })
//       )
//     : [];

//   const getDataByPage = async (pageNumber: number) => {
//     setPage(pageNumber);
//   };

//   const previousPage = async (e: MouseEvent<HTMLLIElement>) => {
//     e.preventDefault();
//     if (page > 1) {
//       setPage((prevPage) => prevPage - 1);
//     }
//   };
//   const nextPage = async (e: MouseEvent<HTMLLIElement>) => {
//     e.preventDefault();
//     if (page < numberOfPages) {
//       setPage((prevPage) => prevPage + 1);
//     }
//     if (page === numberOfPages) {
//       setPage(numberOfPages);
//     }
//   };

//   useEffect(() => {
//     const invalidateQueries = async () => {
//       await client.invalidateQueries({ queryKey: ["search-properties"] });
//     };
//     invalidateQueries();
//   }, [
//     page,
//     city,
//     adults,
//     checkInDate,
//     checkOutDate,
//     children,
//     price,
//     amenities,
//     typesOfProperty,
//     numberOfRooms,
//   ]);

//   if (isLoading)
//     return (
//       <div className="w-full flex  items-center justify-center min-h-[88vh]">
//         <Spinner color="red" size={60} />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="w-full flex flex-col space-y-1 items-center justify-center min-h-[88vh] text-sm max-w-[1400px] mx-auto">
//         <p className=" font-[400]"> Could not get properties at this time.</p>
//         <button
//           onClick={(e) => {
//             location.reload();
//           }}
//           className="outline-none border py-2 px-4 border-0 rounded-full font-bold bg-primary text-white"
//         >
//           Reload
//         </button>
//       </div>
//     );

//   return (
//     <>
//       {viewMap && (
//         <div className="fixed w-full inset-0 z-[99999] bg-white block sm:hidden ">
//           <div className="w-full px-4 h-[50px] flex justify-center items-center">
//             <span
//               onClick={(e: MouseEvent<HTMLSpanElement>) => {
//                 setViewMap(false);
//               }}
//               className="rounded-full border-[.7px] p-2  border-gray-400 cursor-pointer hover:shadow-xl hover:border-0"
//             >
//               <X color="red" size={13} strokeWidth={5} />
//             </span>
//           </div>
//           <SearchResultsGoogleMap locations={locations} />
//         </div>
//       )}
//       <div className="w-full flex flex-col min-h-[88vh] py-10 bg-white px-5 md:px-5 lg:px-0 max-w-[1400px] mx-auto">
//         <button
//           onClick={(e) => {
//             setViewMap(true);
//           }}
//           className="fixed flex items-center rounded-full py-2  px-4 space-x-3 shadow-md  z-[999] bg-gray-800 bottom-24 left-1/2 -translate-x-1/2 sm:hidden"
//         >
//           <Map color="white" />
//           <span className="text-white font-bold">view map</span>
//         </button>
//         <div className="min-h-[80px] hidden sm:flex w-full justify-center items-center space-x-3">
//           <PropertySearch searchParams={searchParams} />
//           <Filter />
//         </div>
//         {(results as number[]).length ? (
//           <p className="font-[600] text-[16px] p-3 my-2">
//             {(results as number[])?.length} properties available
//           </p>
//         ) : (
//           <p className="font-[600] text-[16px] p-3 my-2">
//             Sorry, we couldn't find any matching results.
//           </p>
//         )}
//         <div className="w-full relative grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 min-h-[400px] gap-8 md:gap-4">
//           <div className="w-full min-h-[400px] grid grid-cols-1 sm:col-span-5 md:col-span-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-x-7 lg:col-span-3 px-5">
//             {isRefetching ? (
//               <Spinner size={15} color="red" />
//             ) : (
//               results.map((property: PropertyCardType, idx: number) => (
//                 <SearchResultCard
//                   key={idx}
//                   {...property}
//                   city={property.city}
//                 />
//               ))
//             )}
//           </div>
//           <div className="w-full relative md:sticky md:top-[170px] h-[400px] hidden order-first col-span-5 sm:block lg:col-span-2 lg:order-none">
//             {data ? (
//               <div className="w-full h-full bg-gray-300 rounded-md  lg:rounded-none">
//                 <SearchResultsGoogleMap locations={locations} />
//               </div>
//             ) : null}
//           </div>
//         </div>
//         {numberOfPages ? (
//           <Pagination>
//             <PaginationContent className="mt-10">
//               <PaginationItem onClick={previousPage} className="list-none">
//                 <PaginationPrevious href="#" className="hover:bg-red-50" />
//               </PaginationItem>
//               <div className="hidden md:flex md:items-center">
//                 <>
//                   {page >= 6 ? (
//                     <PaginationItem
//                       onClick={(e) => {
//                         e.preventDefault();
//                         getDataByPage(1);
//                       }}
//                       className="list-none"
//                     >
//                       <PaginationLink
//                         href="#"
//                         className={`list-none hover:bg-red-50 ${
//                           page === 1
//                             ? "bg-primary  text-white hover:bg-primary hover:text-white"
//                             : ""
//                         }`}
//                       >
//                         1
//                       </PaginationLink>
//                     </PaginationItem>
//                   ) : null}
//                   {numberOfPages > 3 && page >= 6 && (
//                     <PaginationItem className="list-none">
//                       <PaginationEllipsis />
//                     </PaginationItem>
//                   )}
//                   {page <= 3 &&
//                     new Array(numberOfPages).fill(0).map((_, idx: number) => {
//                       const pageNumber = idx + 1;
//                       if (pageNumber > 3) return;
//                       return (
//                         <PaginationItem
//                           onClick={(e: MouseEvent<HTMLLIElement>) => {
//                             e.preventDefault();
//                             getDataByPage(pageNumber);
//                           }}
//                           key={pageNumber}
//                           className="list-none"
//                         >
//                           <PaginationLink
//                             href="#"
//                             aria-current={
//                               page === pageNumber ? "page" : undefined
//                             }
//                             className={`hover:bg-red-50 ${
//                               page === pageNumber
//                                 ? "bg-primary  text-white hover:bg-primary hover:text-white"
//                                 : ""
//                             }`}
//                           >
//                             {pageNumber}
//                           </PaginationLink>
//                         </PaginationItem>
//                       );
//                     })}
//                   {page > 3 &&
//                     new Array(3).fill(0).map((_, idx: number) => {
//                       const pageNumber = page + idx;
//                       if (pageNumber <= 3 || pageNumber >= numberOfPages)
//                         return;
//                       return (
//                         <PaginationItem
//                           onClick={(e) => {
//                             e.preventDefault();
//                             getDataByPage(pageNumber);
//                           }}
//                           key={idx}
//                           className="list-none"
//                         >
//                           <PaginationLink
//                             href="#"
//                             className={`hover:bg-red-50 ${
//                               page === pageNumber
//                                 ? "bg-primary  text-white hover:bg-primary hover:text-white"
//                                 : ""
//                             }`}
//                           >
//                             {pageNumber}
//                           </PaginationLink>
//                         </PaginationItem>
//                       );
//                     })}
//                 </>
//                 {numberOfPages > 3 && page <= 3 && (
//                   <PaginationItem className="list-none">
//                     <PaginationEllipsis />
//                   </PaginationItem>
//                 )}
//                 {numberOfPages > 3 && page > 3 && page < numberOfPages - 3 && (
//                   <PaginationItem className="list-none">
//                     <PaginationEllipsis />
//                   </PaginationItem>
//                 )}
//                 {numberOfPages > 3 ? (
//                   <PaginationItem
//                     onClick={(e) => {
//                       e.preventDefault();
//                       getDataByPage(numberOfPages);
//                     }}
//                     className="list-none"
//                   >
//                     <PaginationLink
//                       href="#"
//                       className={`list-none hover:bg-red-50 ${
//                         page === numberOfPages
//                           ? "bg-primary  text-white hover:bg-primary hover:text-white"
//                           : ""
//                       }`}
//                     >
//                       {numberOfPages}
//                     </PaginationLink>
//                   </PaginationItem>
//                 ) : null}
//               </div>
//               <PaginationItem className="list-none" onClick={nextPage}>
//                 <PaginationNext href="#" className="hover:bg-red-50" />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         ) : null}
//       </div>
//     </>
//   );
// };



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
import { Map, X } from "lucide-react";
import PropertySearch from "@/components/property/PropertySearch";
import Filter from "@/components/property/Filter";
import { PropertyCardType } from "@/components/property/recommended-properties";
import SearchResultsGoogleMap from "@/components/maps/search-results-google-map";
import SearchResultCard from "@/components/property/search-result-card";

export default function SearchPage() {
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
    cursor: page - 1,
    typesOfProperty: typesOfProperty ? typesOfProperty.split(",") : [],
    numberOfRooms: numberOfRooms ? numberOfRooms.split(",") : [],
    price: price ? +price : 0,
    amenities: amenities ? amenities.split(",") : [],
  };

  const { data, error, isLoading, isRefetching } = useQuery({
    queryKey: ["search-properties", searchParams],
    queryFn: () => searchProperties(searchParams),
    refetchOnWindowFocus: false,
  });

  const results = data ? data[0] : [];
  const numberOfPages = data ? Math.ceil((data[1] as number) / 6) : 0;

  const locations =
    results?.map((r: any) => ({
      title: r.title,
      price: r.price,
      address: `${r.house_number} ${r.street} ${r.city}`,
      coords: [+r.lat, +r.lng],
      href: `/properties/${r.id}`,
      photos: Array.isArray(r.photos) ? r.photos : [],
      city: r.city,
      country: r.country,
      reviews: r.reviews || [],
    })) || [];

  const previousPage = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (page > 1) setPage((prev) => prev - 1);
  };

  const nextPage = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (page < numberOfPages) setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[88vh]">
        <Spinner color="red" size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[88vh] space-y-4">
        <p>Could not get properties at this time.</p>
        <button
          onClick={() => location.reload()}
          className="bg-primary text-white px-6 py-2 rounded-full"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <>
      {/* MOBILE FULLSCREEN MAP */}
      {viewMap && (
        <div className="fixed inset-0 bg-white z-[9999] lg:hidden">
          <div className="h-[60px] flex items-center justify-center border-b">
            <button
              onClick={() => setViewMap(false)}
              className="p-2 border rounded-full"
            >
              <X size={16} />
            </button>
          </div>
          <div className="h-[calc(100%-60px)]">
            <SearchResultsGoogleMap locations={locations} />
          </div>
        </div>
      )}

      <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-0 py-10 min-h-[88vh]">

        {/* SEARCH BAR */}
        <div className="hidden sm:flex items-center justify-center gap-4 mb-6">
          <PropertySearch searchParams={searchParams} />
          <Filter />
        </div>

        {/* RESULT COUNT */}
        <p className="font-semibold text-lg mb-6">
          {results.length
            ? `${results.length} properties available`
            : "Sorry, we couldn't find any matching results."}
        </p>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* LEFT: CARDS */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {isRefetching ? (
                <div className="w-full flex justify-center py-10">
                  <Spinner size={30} color="red" />
                </div>
              ) : (
                results.map((property: PropertyCardType, idx: number) => (
                  <SearchResultCard
                    key={idx}
                    {...property}
                    city={property.city}
                  />
                ))
              )}
            </div>
          </div>

          {/* RIGHT: STICKY MAP (DESKTOP ONLY) */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-[120px] h-[calc(100vh-140px)] rounded-xl overflow-hidden shadow">
              <SearchResultsGoogleMap locations={locations} />
            </div>
          </div>

        </div>

        {/* PAGINATION */}
        {numberOfPages > 1 && (
          <Pagination>
            <PaginationContent className="mt-10">
              <PaginationItem onClick={previousPage}>
                <PaginationPrevious href="#" />
              </PaginationItem>

              {Array.from({ length: numberOfPages }, (_, i) => (
                <PaginationItem
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(i + 1);
                  }}
                >
                  <PaginationLink
                    href="#"
                    isActive={page === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem onClick={nextPage}>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {/* MOBILE FLOATING MAP BUTTON */}
        <button
          onClick={() => setViewMap(true)}
          className="fixed lg:hidden bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <Map size={18} />
          View Map
        </button>
      </div>
    </>
  );
}