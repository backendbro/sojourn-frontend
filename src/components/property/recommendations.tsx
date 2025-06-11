"use client";

import Image from "next/image";
import { TabsContent } from "../ui/tabs";
import { FC, MouseEvent } from "react";
import { PropertySkeleton } from "./loader-skeletons";
import StarIcon from "../svgs/StarIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToWishList, getRecommendedPropertiesByCityName } from "@/http/api";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "sonner";

type PropertyCardType = {
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
};

const tomorrow = new Date(Date.now() + 86400000);
const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);

export const PropertyCard: FC<{ property: PropertyCardType }> = ({
  property: { title, price, country, photos, city, id, wishlist },
}) => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-to-wishlist"],
    mutationFn: addToWishList,
    async onSuccess() {
      toast("updated wishlist", {
        action: {
          label: "Ok",
          onClick() {
            return null;
          },
        },
      });
      await client.invalidateQueries({ queryKey: ["recommended"] });
    },
    onError() {
      toast("Cannot add to wish list at the moment.", {
        action: {
          label: "Ok",
          onClick() {
            return null;
          },
        },
      });
    },
  });

  const guestId = useSelector((state: RootState) => state.user.me?.user?.id);

  const userLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

  function addPropertyToWishlist(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (userLoggedIn) mutation.mutate({ userId: guestId, propertyId: id });
    else
      toast("You have to be logged in to add to wishist.", {
        action: {
          label: "Ok",
          onClick() {
            return null;
          },
        },
      });
  }

  const isWishListAvailable = wishlist
    ? wishlist.map((w) => w.userId).includes(guestId)
    : false;

  const heartCss = isWishListAvailable
    ? "stroke-red-500 fill-red-500 group-hover:stroke-red-500 group-hover:fill-red-500"
    : "stroke-black fill-black group-hover:stroke-red-500 group-hover:fill-red-500";

  const photoUrl = photos ? photos[0] : "";
  const url = photoUrl;
  return (
    <Link href={`/properties/${id}`}>
      <div className="w-full py-2 min-h-[280px] cursor-pointer ease duration-300">
        <div className="relative w-full h-[300px] md:h-[350px] lg:h-[200px]">
          <span
            role="button"
            onClick={addPropertyToWishlist}
            className="absolute z-50 top-3 right-3 group"
          >
            <Heart size={20} strokeWidth={3} className={heartCss} />
          </span>
          {wishlist.length >= 1 && (
            <div className="min-w-[100px] text-center absolute z-50 top-3 left-3 rounded-3xl bg-gray-100 text-black shadow-md py-1 px-3">
              <span className="font-semibold text-[13px]">Guest favourite</span>
            </div>
          )}
          <Image
            src={url}
            alt="house interior image"
            fill
            className="object-cover  rounded-xl sm:h-2/3 shadow-md"
          />
        </div>
        <div className="w-full h-2/6 grid grid-cols-2 pt-2">
          <div className="w-full h-full flex flex-col justify-between">
            <div className="w-full flex flex-col">
              <h4 className="text-[15px] font-[700]">{title}</h4>
              <p className="text-[14px] font-[400] text-gray-600">
                {city}, {country}
              </p>
            </div>
            <p className="font-[400] text-black">
              <span className="font-bold font-inter text-lg">
                N{price.toLocaleString()}
              </span>
              /<span className="text-[10px]">night</span>
            </p>
          </div>
          <div className="w-full h-full flex items-start justify-end">
            <div className="flex items-center">
              <StarIcon size={13} />
              <span className="ml-1 text-[13px]">4.5/(12)</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const RecommendedProperties: FC<{ city: string; limit?: number }> = ({
  city,
  limit = 8,
}) => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["recommended"],
    queryFn: () => {
      return getRecommendedPropertiesByCityName(city, limit);
    },
  });

  if (isLoading)
    return (
      <>
        {new Array(4).fill(0).map((_, key: number) => (
          <PropertySkeleton key={key} />
        ))}
      </>
    );

  return data.map((property: PropertyCardType, idx: number) => (
    <PropertyCard key={idx} property={{ ...property, city }} />
  ));
};

const RecommendedPropertiesCarousel: FC<{
  city: string;
  limit?: number;
}> = ({ city = "", limit = 8 }) => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["recommended"],
    queryFn: () => {
      return getRecommendedPropertiesByCityName(city, limit);
    },
  });

  if (isLoading)
    return (
      <>
        {new Array(1).fill(0).map((_, key: number) => (
          <PropertySkeleton key={key} length={1} />
        ))}
      </>
    );

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {data.map((property: PropertyCardType, idx: number) => (
          <CarouselItem key={idx}>
            <PropertyCard property={{ ...property, city }} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        color="#DE5353"
        className="absolute top-[100%] mt-7 left-0 "
      />
      <CarouselNext
        color="#DE5353"
        className="absolute top-[100%] mt-7 right-0 "
      />
    </Carousel>
  );
};

export const SuggestedProperties: FC<{ city: string }> = ({ city }) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full h-full flex flex-col items-center justify-between sm:w-full">
        <div className="hidden w-full h-auto grid-cols-2 grid-rows-1 gap-4 mb-[80px] sm:grid lg:grid-cols-4">
          <RecommendedProperties city={city} limit={4} />
        </div>
        <div className="w-full block mb-20 h-full sm:hidden sm:mb-0">
          <RecommendedPropertiesCarousel city={city} limit={4} />
        </div>
      </div>
    </div>
  );
};

export const Lagos: FC<{ city: string }> = ({ city }) => {
  return (
    <TabsContent value={city}>
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-full h-full flex flex-col items-center justify-between sm:w-full">
          <div className="hidden w-full h-auto grid-cols-2 gap-4 mb-[80px] sm:grid lg:grid-cols-4">
            <RecommendedProperties city={city} />
          </div>
          <div className="w-full block mb-20 h-full sm:hidden sm:mb-0">
            <RecommendedPropertiesCarousel city={city} />
          </div>
          <Link
            href={`/properties?city=${city}&adults=1&children=0&infants=0&check-in=${tomorrow}&check-out=${dayAfterTomorrow}`}
            className="w-[350px] block text-center capitalize outline-none border-none rounded-full p-5 bg-primary text-white text-[18px] ease duration-300 hover:opacity-50"
          >
            See more {city} properties
          </Link>
        </div>
      </div>
    </TabsContent>
  );
};
