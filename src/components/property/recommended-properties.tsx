// "use client";

// import { ChevronDown } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { useState, MouseEvent, useCallback, useEffect } from "react";
// import { CITIES } from "@/constants";
// import Carousel from "react-multi-carousel";
// import RecommendedPropertiesCard from "./recommended-properties-card";
// import { PropertySkeleton } from "./loader-skeletons";
// import { getRecommendedPropertiesByCityName } from "@/http/api";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import React from "react";

// type CitiesType =
//   | "lagos"
//   | "abuja"
//   | "port harcourt"
//   | "akwa ibom"
//   | "delta"
//   | "oyo"
//   | "benin";

// export type PropertyCardType = {
//   country: string;
//   price: number;
//   contactName?: string;
//   title: string;
//   photos: string[];
//   city: string;
//   id: string;
//   houseNumber?: number;
//   numberOfRooms?: number;
//   wishlist: Array<{ userId: string; propertyId: string }>;
//   street?: string;
//   userId?: string;
//   typeOfProperty?: string;
//   reviews: { rating: number }[];
// };

// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 4,
//     slidesToSlide: 3, // optional, default to 1.
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//     slidesToSlide: 2, // optional, default to 1.
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     slidesToSlide: 1, // optional, default to 1.
//   },
// };

// export default () => {
//   const client = useQueryClient();
//   const [city, setCity] = useState<CitiesType>("lagos");

//   const {
//     data = [],
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["recommended"],
//     queryFn: () => {
//       return getRecommendedPropertiesByCityName(city, 8);
//     },
//   });

//   useEffect(() => {
//     async function refresh() {
//       await client.invalidateQueries({ queryKey: ["recommended"] });
//     }
//     refresh();
//   }, [city]);

//   function onClick(value: CitiesType) {
//     return (e: MouseEvent<HTMLDivElement>) => {
//       setCity(value);
//     };
//   }

//   if (isLoading)
//     return (
//       <>
//         <div className="w-full bg-white min-h-[200px] py-10 px-3 md:px-20 hidden md:grid md:grid-cols-3 max-w-[1400px]  mx-auto">
//           <PropertySkeleton length={3} />
//         </div>
//         <div className="w-full bg-white min-h-[500px] py-10 px-3 md:px-20 grid grid-rows-1 md:hidden">
//           <PropertySkeleton length={1} />
//         </div>
//       </>
//     );

//   return (
//     // <section className="w-full bg-white min-h-[500px] py-10 px-10 md:px-20 flex flex-col max-w-[1400px]  mx-auto">
//     //   <div className="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row items-center md:justify-between">
//     //     <div className="flex flex-col items-center text-center md:items-start text-left">
//     //       <h3 className=" font-[500] text-black text-[36px] font-[500] md:text-left">
//     //         Recommended Properties
//     //       </h3>
//     //       <p className="text-[#A4A4A4] font-[500] text-[20px] text-center md:text-left">
//     //         Featured home recommended for you from our Top Cities
//     //       </p>
//     //     </div>
//     //     <DropdownMenu>
//     //       <DropdownMenuTrigger className="w-[200px] md:w-auto flex items-center justify-between space-x-6 px-4 outline-none ring-0 focus:ring-0 py-2 bg-primary text-white font-[700] rounded-md">
//     //         <span className="capitalize">{city}</span>
//     //         <ChevronDown color="white" size={16} />
//     //       </DropdownMenuTrigger>
//     //       <DropdownMenuContent>
//     //         {CITIES.map((city: { key: string; value: string }, idx: number) => (
//     //           <DropdownMenuItem
//     //             onClick={onClick(city.value as CitiesType)}
//     //             key={idx}
//     //             className="capitalize hover:bg-red-50"
//     //           >
//     //             {city.key}
//     //           </DropdownMenuItem>
//     //         ))}
//     //       </DropdownMenuContent>
//     //     </DropdownMenu>
//     //   </div>
//     //   <Carousel
//     //     swipeable={true}
//     //     draggable={true}
//     //     showDots={true}
//     //     responsive={responsive}
//     //     ssr={true} // means to render carousel on server-side.
//     //     infinite={true}
//     //     autoPlay
//     //     autoPlaySpeed={3000}
//     //     keyBoardControl={true}
//     //     transitionDuration={500}
//     //     containerClass="parent"
//     //     dotListClass="custom-dot-list-style"
//     //   >
//     //     {data.map((property: PropertyCardType, idx: number) => (
//     //       <RecommendedPropertiesCard key={idx} {...property} city={city} />
//     //     ))}
//     //   </Carousel>
//     // </section>

//     // <section className="w-full bg-white min-h-[500px] py-10 px-10 md:px-20 flex flex-col max-w-[1400px] mx-auto space-y-10">
//     //   <div className="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row items-center md:justify-between">
//     //     <div className="flex flex-col items-center text-center md:items-start text-left">
//     //       <h3 className="font-[500] text-black text-[36px] md:text-left">
//     //         Recommended Properties
//     //       </h3>
//     //       <p className="text-[#A4A4A4] font-[500] text-[20px] text-center md:text-left">
//     //         Featured homes recommended for you from our Top Cities
//     //       </p>
//     //     </div>
//     //     <DropdownMenu>
//     //       <DropdownMenuTrigger className="w-[200px] md:w-auto flex items-center justify-between space-x-6 px-4 outline-none ring-0 focus:ring-0 py-2 bg-primary text-white font-[700] rounded-md">
//     //         <span className="capitalize">{city}</span>
//     //         <ChevronDown color="white" size={16} />
//     //       </DropdownMenuTrigger>
//     //       <DropdownMenuContent>
//     //         {CITIES.map((city: { key: string; value: string }, idx: number) => (
//     //           <DropdownMenuItem
//     //             onClick={onClick(city.value as CitiesType)}
//     //             key={idx}
//     //             className="capitalize hover:bg-red-50"
//     //           >
//     //             {city.key}
//     //           </DropdownMenuItem>
//     //         ))}
//     //       </DropdownMenuContent>
//     //     </DropdownMenu>
//     //   </div>

//     //   {/* First Carousel - first 4 properties */}
//     //   <Carousel
//     //     swipeable
//     //     draggable
//     //     showDots
//     //     responsive={responsive}
//     //     ssr
//     //     infinite
//     //     autoPlay
//     //     autoPlaySpeed={3000}
//     //     keyBoardControl
//     //     transitionDuration={500}
//     //     containerClass="parent"
//     //     dotListClass="custom-dot-list-style"
//     //   >
//     //     {data.slice(0, 4).map((property: PropertyCardType, idx: number) => (
//     //       <RecommendedPropertiesCard
//     //         key={`carousel-1-${idx}`}
//     //         {...property}
//     //         city={city}
//     //       />
//     //     ))}
//     //   </Carousel>

//     //   {/* Second Carousel - remaining properties */}
//     //   {data.length > 4 && (
//     //     <Carousel
//     //       swipeable
//     //       draggable
//     //       showDots
//     //       responsive={responsive}
//     //       ssr
//     //       infinite
//     //       autoPlay
//     //       autoPlaySpeed={3000}
//     //       keyBoardControl
//     //       transitionDuration={500}
//     //       containerClass="parent"
//     //       dotListClass="custom-dot-list-style"
//     //     >
//     //       {data.slice(4).map((property: PropertyCardType, idx: number) => (
//     //         <RecommendedPropertiesCard
//     //           key={`carousel-2-${idx}`}
//     //           {...property}
//     //           city={city}
//     //         />
//     //       ))}
//     //     </Carousel>
//     //   )}
//     // </section>

//     <section className="w-full bg-white min-h-[500px] py-10 px-10 md:px-20 flex flex-col max-w-[1400px] mx-auto space-y-10">
//       <div className="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row items-center md:justify-between">
//         <div className="flex flex-col items-center text-center md:items-start text-left">
//           <h3 className="font-[500] text-black text-[36px] md:text-left">
//             Recommended Properties
//           </h3>
//           <p className="text-[#A4A4A4] font-[500] text-[20px] text-center md:text-left">
//             Featured homes recommended for you from our Top Cities
//           </p>
//         </div>
//         <DropdownMenu>
//           <DropdownMenuTrigger className="w-[200px] md:w-auto flex items-center justify-between space-x-6 px-4 outline-none ring-0 focus:ring-0 py-2 bg-primary text-white font-[700] rounded-md">
//             <span className="capitalize">{city}</span>
//             <ChevronDown color="white" size={16} />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             {CITIES.map((city: { key: string; value: string }, idx: number) => (
//               <DropdownMenuItem
//                 onClick={onClick(city.value as CitiesType)}
//                 key={idx}
//                 className="capitalize hover:bg-red-50"
//               >
//                 {city.key}
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       {/* First Carousel */}
//       <Carousel
//         swipeable
//         draggable
//         showDots
//         responsive={responsive}
//         ssr
//         infinite
//         autoPlay
//         autoPlaySpeed={3000}
//         keyBoardControl
//         transitionDuration={500}
//         containerClass="parent"
//         dotListClass="custom-dot-list-style"
//       >
//         {data.slice(0, 4).map((property: PropertyCardType, idx: number) => (
//           <RecommendedPropertiesCard
//             key={`carousel-1-${idx}`}
//             {...property}
//             city={city}
//           />
//         ))}
//       </Carousel>

//       {/* 🔴 RED DEMARCATION LINE */}
//       {data.length > 4 && (
//         <div className="w-full my-6">
//           <div className="w-full h-[2px] bg-red-500 rounded-full" />
//         </div>
//       )}

//       {/* Second Carousel */}
//       {data.length > 4 && (
//         <Carousel
//           swipeable
//           draggable
//           showDots
//           responsive={responsive}
//           ssr
//           infinite
//           autoPlay
//           autoPlaySpeed={3000}
//           keyBoardControl
//           transitionDuration={500}
//           containerClass="parent"
//           dotListClass="custom-dot-list-style"
//         >
//           {data.slice(4).map((property: PropertyCardType, idx: number) => (
//             <RecommendedPropertiesCard
//               key={`carousel-2-${idx}`}
//               {...property}
//               city={city}
//             />
//           ))}
//         </Carousel>
//       )}
//     </section>
//   );
// };


"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState, MouseEvent } from "react";
import { CITIES } from "@/constants";
import Carousel from "react-multi-carousel";
import RecommendedPropertiesCard from "./recommended-properties-card";
import { PropertySkeleton } from "./loader-skeletons";
import { getRecommendedPropertiesByCityName } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type CitiesType =
  | "lagos"
  | "abuja"
  | "port harcourt"
  | "akwa ibom"
  | "delta"
  | "oyo"
  | "benin";

export type PropertyCardType = {
  country: string;
  price: number;
  contactName?: string;
  title: string;
  photos: string[];
  city: string;
  id: string;
  houseNumber?: number;
  numberOfRooms?: number;
  wishlist: Array<{ userId: string; propertyId: string }>;
  street?: string;
  userId?: string;
  typeOfProperty?: string;
  reviews: { rating: number }[];
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    slidesToSlide: 2,
  },
  largeMobile: {
    breakpoint: { max: 640, min: 400 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 400, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default () => {
  const [city, setCity] = useState<CitiesType>("lagos");

  const {
    data = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recommended", city],
    queryFn: async () => {
      const timeoutMs = 12000;
      const result = await Promise.race([
        getRecommendedPropertiesByCityName(city, 8),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
        ),
      ]);
      return result;
    },
    retry: 1,
    staleTime: 60 * 1000,
  });

  function onClick(value: CitiesType) {
    return (e: MouseEvent<HTMLDivElement>) => {
      setCity(value);
    };
  }

  if (isLoading)
    return (
      <section className="w-full bg-white min-h-[300px] sm:min-h-[400px] pt-2 pb-6 sm:pb-8 md:pt-4 md:pb-10 px-3 sm:px-6 md:px-20 flex flex-col max-w-[1400px] mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        <div className="w-full flex flex-col space-y-3 sm:space-y-4 md:space-y-0 md:flex-row items-center md:justify-between">
          <h3 className="font-black text-gray-900 text-[24px] sm:text-[32px] md:text-[42px] lg:text-[52px] tracking-tight leading-[1]">Recommended Properties</h3>
          <div className="w-[160px] sm:w-[200px] h-9 sm:h-10 bg-neutral-200 rounded-md animate-pulse" />
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <PropertySkeleton length={4} />
        </div>
      </section>
    );

  if (error)
    return (
      <section className="w-full bg-white min-h-[200px] sm:min-h-[300px] pt-2 pb-6 sm:pb-8 md:pt-4 md:pb-10 px-3 sm:px-6 md:px-20 flex flex-col max-w-[1400px] mx-auto space-y-3 sm:space-y-4">
        <h3 className="font-black text-gray-900 text-[24px] sm:text-[32px] md:text-[42px] lg:text-[52px] tracking-tight leading-[1]">Recommended Properties</h3>
        <p className="text-[#A4A4A4] font-[500] text-[13px] sm:text-[15px] md:text-[18px] lg:text-[20px] max-w-[520px]">
          Could not load properties. The server may be starting up — wait a moment and retry, or try another city.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="w-fit px-5 sm:px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-red-800 transition-colors text-sm sm:text-base min-h-[40px]"
        >
          Retry
        </button>
      </section>
    );

  const properties = Array.isArray(data) ? data : [];

  return (
    // <section className="w-full bg-white min-h-[500px] py-10 px-10 md:px-20 flex flex-col max-w-[1400px]  mx-auto">
    //   <div className="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row items-center md:justify-between">
    //     <div className="flex flex-col items-center text-center md:items-start text-left">
    //       <h3 className=" font-[500] text-black text-[36px] font-[500] md:text-left">
    //         Recommended Properties
    //       </h3>
    //       <p className="text-[#A4A4A4] font-[500] text-[20px] text-center md:text-left">
    //         Featured home recommended for you from our Top Cities
    //       </p>
    //     </div>
    //     <DropdownMenu>
    //       <DropdownMenuTrigger className="w-[200px] md:w-auto flex items-center justify-between space-x-6 px-4 outline-none ring-0 focus:ring-0 py-2 bg-primary text-white font-[700] rounded-md">
    //         <span className="capitalize">{city}</span>
    //         <ChevronDown color="white" size={16} />
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent>
    //         {CITIES.map((city: { key: string; value: string }, idx: number) => (
    //           <DropdownMenuItem
    //             onClick={onClick(city.value as CitiesType)}
    //             key={idx}
    //             className="capitalize hover:bg-red-50"
    //           >
    //             {city.key}
    //           </DropdownMenuItem>
    //         ))}
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   </div>
    //   <Carousel
    //     swipeable={true}
    //     draggable={true}
    //     showDots={true}
    //     responsive={responsive}
    //     ssr={true} // means to render carousel on server-side.
    //     infinite={true}
    //     autoPlay
    //     autoPlaySpeed={3000}
    //     keyBoardControl={true}
    //     transitionDuration={500}
    //     containerClass="parent"
    //     dotListClass="custom-dot-list-style"
    //   >
    //     {data.map((property: PropertyCardType, idx: number) => (
    //       <RecommendedPropertiesCard key={idx} {...property} city={city} />
    //     ))}
    //   </Carousel>
    // </section>

    // <section className="w-full bg-white min-h-[500px] py-10 px-10 md:px-20 flex flex-col max-w-[1400px] mx-auto space-y-10">
    //   <div className="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row items-center md:justify-between">
    //     <div className="flex flex-col items-center text-center md:items-start text-left">
    //       <h3 className="font-[500] text-black text-[36px] md:text-left">
    //         Recommended Properties
    //       </h3>
    //       <p className="text-[#A4A4A4] font-[500] text-[20px] text-center md:text-left">
    //         Featured homes recommended for you from our Top Cities
    //       </p>
    //     </div>
    //     <DropdownMenu>
    //       <DropdownMenuTrigger className="w-[200px] md:w-auto flex items-center justify-between space-x-6 px-4 outline-none ring-0 focus:ring-0 py-2 bg-primary text-white font-[700] rounded-md">
    //         <span className="capitalize">{city}</span>
    //         <ChevronDown color="white" size={16} />
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent>
    //         {CITIES.map((city: { key: string; value: string }, idx: number) => (
    //           <DropdownMenuItem
    //             onClick={onClick(city.value as CitiesType)}
    //             key={idx}
    //             className="capitalize hover:bg-red-50"
    //           >
    //             {city.key}
    //           </DropdownMenuItem>
    //         ))}
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   </div>

    //   {/* First Carousel - first 4 properties */}
    //   <Carousel
    //     swipeable
    //     draggable
    //     showDots
    //     responsive={responsive}
    //     ssr
    //     infinite
    //     autoPlay
    //     autoPlaySpeed={3000}
    //     keyBoardControl
    //     transitionDuration={500}
    //     containerClass="parent"
    //     dotListClass="custom-dot-list-style"
    //   >
    //     {data.slice(0, 4).map((property: PropertyCardType, idx: number) => (
    //       <RecommendedPropertiesCard
    //         key={`carousel-1-${idx}`}
    //         {...property}
    //         city={city}
    //       />
    //     ))}
    //   </Carousel>

    //   {/* Second Carousel - remaining properties */}
    //   {data.length > 4 && (
    //     <Carousel
    //       swipeable
    //       draggable
    //       showDots
    //       responsive={responsive}
    //       ssr
    //       infinite
    //       autoPlay
    //       autoPlaySpeed={3000}
    //       keyBoardControl
    //       transitionDuration={500}
    //       containerClass="parent"
    //       dotListClass="custom-dot-list-style"
    //     >
    //       {data.slice(4).map((property: PropertyCardType, idx: number) => (
    //         <RecommendedPropertiesCard
    //           key={`carousel-2-${idx}`}
    //           {...property}
    //           city={city}
    //         />
    //       ))}
    //     </Carousel>
    //   )}
    // </section>

    <section className="w-full bg-white min-h-[300px] sm:min-h-[400px] pt-2 pb-6 sm:pb-8 md:pt-4 md:pb-10 px-3 sm:px-6 md:px-20 flex flex-col max-w-[1400px] mx-auto space-y-4 sm:space-y-6 md:space-y-8">
      <div className="w-full flex flex-col space-y-3 sm:space-y-4 md:space-y-0 md:flex-row items-center md:justify-between">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h3 className="font-black text-gray-900 text-[24px] sm:text-[32px] md:text-[42px] lg:text-[52px] tracking-tight leading-[1]">
            Recommended Properties
          </h3>
          <p className="text-gray-400 font-medium text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-center md:text-left mt-1 sm:mt-2">
            Featured homes recommended for you from our Top Cities
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full sm:w-[200px] md:w-auto flex items-center justify-between space-x-4 sm:space-x-6 px-3 sm:px-4 outline-none ring-0 focus:ring-0 py-2 sm:py-2.5 bg-primary text-white font-[700] rounded-md text-sm sm:text-base">
            <span className="capitalize">{city}</span>
            <ChevronDown color="white" size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {CITIES.map((city: { key: string; value: string }, idx: number) => (
              <DropdownMenuItem
                onClick={onClick(city.value as CitiesType)}
                key={idx}
                className="capitalize hover:bg-red-50"
              >
                {city.key}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Property listings - grid when we have data, message when empty */}
      {properties.length === 0 ? (
        <p className="text-[#A4A4A4] font-[500] text-[18px]">
          No properties found for this city yet. Try selecting another city.
        </p>
      ) : (
        <>
          <Carousel
            swipeable
            draggable
            showDots
            responsive={responsive}
            ssr
            infinite={properties.length >= 4}
            autoPlay={properties.length >= 2}
            autoPlaySpeed={3000}
            keyBoardControl
            transitionDuration={500}
            containerClass="parent"
            dotListClass="custom-dot-list-style"
          >
            {properties.slice(0, 4).map((property: PropertyCardType, idx: number) => (
              <RecommendedPropertiesCard
                key={property?.id ?? `carousel-1-${idx}`}
                {...property}
                city={city}
              />
            ))}
          </Carousel>

          {properties.length > 4 && (
            <>
              <div className="w-full my-6">
                <div className="w-full h-[2px] bg-primary/20 rounded-full" />
              </div>
              <Carousel
                swipeable
                draggable
                showDots
                responsive={responsive}
                ssr
                infinite
                autoPlay
                autoPlaySpeed={3000}
                keyBoardControl
                transitionDuration={500}
                containerClass="parent"
                dotListClass="custom-dot-list-style"
              >
                {properties.slice(4).map((property: PropertyCardType, idx: number) => (
                  <RecommendedPropertiesCard
                    key={property?.id ?? `carousel-2-${idx}`}
                    {...property}
                    city={city}
                  />
                ))}
              </Carousel>
            </>
          )}
        </>
      )}
    </section>
  );
};
