"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState, MouseEvent, useCallback, useEffect } from "react";
import { CITIES } from "@/constants";
import Carousel from "react-multi-carousel";
import RecommendedPropertiesCard from "./recommended-properties-card";
import { PropertySkeleton } from "./loader-skeletons";
import { getRecommendedPropertiesByCityName } from "@/http/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default () => {
  const client = useQueryClient();
  const [city, setCity] = useState<CitiesType>("lagos");

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["recommended"],
    queryFn: () => {
      return getRecommendedPropertiesByCityName(city, 8);
    },
  });

  useEffect(() => {
    async function refresh() {
      await client.invalidateQueries({ queryKey: ["recommended"] });
    }
    refresh();
  }, [city]);

  function onClick(value: CitiesType) {
    return (e: MouseEvent<HTMLDivElement>) => {
      setCity(value);
    };
  }

  if (isLoading)
    return (
      <>
        <div className="w-full bg-white min-h-[200px] py-10 px-3 md:px-20 hidden md:grid md:grid-cols-3 max-w-[1400px]  mx-auto">
          <PropertySkeleton length={3} />
        </div>
        <div className="w-full bg-white min-h-[500px] py-10 px-3 md:px-20 grid grid-rows-1 md:hidden">
          <PropertySkeleton length={1} />
        </div>
      </>
    );

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

    <section className="w-full bg-white min-h-[500px] py-10 px-10 md:px-20 flex flex-col max-w-[1400px] mx-auto space-y-10">
      <div className="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row items-center md:justify-between">
        <div className="flex flex-col items-center text-center md:items-start text-left">
          <h3 className="font-[500] text-black text-[36px] md:text-left">
            Recommended Properties
          </h3>
          <p className="text-[#A4A4A4] font-[500] text-[20px] text-center md:text-left">
            Featured homes recommended for you from our Top Cities
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-[200px] md:w-auto flex items-center justify-between space-x-6 px-4 outline-none ring-0 focus:ring-0 py-2 bg-primary text-white font-[700] rounded-md">
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

      {/* First Carousel */}
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
        {data.slice(0, 4).map((property: PropertyCardType, idx: number) => (
          <RecommendedPropertiesCard
            key={`carousel-1-${idx}`}
            {...property}
            city={city}
          />
        ))}
      </Carousel>

      {/* 🔴 RED DEMARCATION LINE */}
      {data.length > 4 && (
        <div className="w-full my-6">
          <div className="w-full h-[2px] bg-red-500 rounded-full" />
        </div>
      )}

      {/* Second Carousel */}
      {data.length > 4 && (
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
          {data.slice(4).map((property: PropertyCardType, idx: number) => (
            <RecommendedPropertiesCard
              key={`carousel-2-${idx}`}
              {...property}
              city={city}
            />
          ))}
        </Carousel>
      )}
    </section>
  );
};
