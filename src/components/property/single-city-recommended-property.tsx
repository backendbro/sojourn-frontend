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
  | "portharcourt"
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
  reviews?: { rating: number }[];
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

export default ({
  city,
  currentPropertyId,
}: {
  city: string;
  currentPropertyId: string;
}) => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["recommended"],
    queryFn: () => {
      return getRecommendedPropertiesByCityName(city, 4);
    },
  });

  if (error) {
    return (
      <div className="w-full flex">
        <p>Could not load items at this time..</p>
      </div>
    );
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
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass="parent"
      dotListClass="custom-dot-list-style"
    >
      {data.map((property: PropertyCardType, idx: number) => {
        if (property.id === currentPropertyId) return;
        return (
          <RecommendedPropertiesCard
            key={property.id}
            {...property}
            city={city}
            reviews={property.reviews ?? []}
          />
        );
      })}
    </Carousel>
  );
};
