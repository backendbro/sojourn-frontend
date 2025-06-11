import Image from "next/image";
import { CardProps } from "@/types/properties";
import LocationIcon from "../svgs/LocationIcon";
import StarIcon from "../svgs/StarIcon";
import Link from "next/link";
import { Bed, Heart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { addToWishList } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { MouseEvent, useState } from "react";

export default ({
  data: {
    photos,
    title,
    price,
    typeOfProperty,
    country,
    city,
    houseNumber,
    street,
    queryParamString,
    id,
    numberOfRooms,
    wishlist = [],
  },
}: {
  data: CardProps & { queryParamString: string };
}) => {
  const guestId = useSelector((state: RootState) => state.user.me?.user?.id);

  const userLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

  const [wish, setWish] = useState(() =>
    wishlist.map((w) => w.userId).includes(guestId)
  );

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
      setWish((prevState) => !prevState);
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

  const heartCss = wish
    ? "stroke-red-500 fill-red-500 group-hover:stroke-red-500 group-hover:fill-red-500"
    : "stroke-black fill-black group-hover:stroke-red-500 group-hover:fill-red-500";
  return (
    <Carousel>
      <Link href={`/properties/${id}/${queryParamString}`} className="block">
        <CarouselContent
          className={`w-full h-[300px] p-0 m-0 sm:h-[300px] md:h-[300px] lg:h-[200px] shadow-md relative rounded-xl`}
        >
          <span
            role="button"
            onClick={addPropertyToWishlist}
            className="absolute z-50 top-3 right-3 group"
          >
            <Heart size={20} strokeWidth={3} className={heartCss} />
          </span>
          {wishlist?.length >= 1 && (
            <div className="min-w-[100px] text-center absolute z-50 top-3 left-3 rounded-3xl bg-gray-100 text-black shadow-md py-1 px-3">
              <span className="font-semibold text-[13px]">Guest favourite</span>
            </div>
          )}
          {photos.map((photo: string, idx: number) => {
            const url = photo;
            return (
              <CarouselItem key={idx} className="relative rounded-xl ">
                <Image
                  src={url}
                  alt="property image"
                  fill
                  className="rounded-xl"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="w-full flex flex-col py-3 space-y-1">
          <div className="w-full flex items-center justify-between">
            <h4 className="text-sm font-bold">{title}</h4>
            <div className="flex items-center space-x-1">
              <StarIcon size={14} />
              <span className="font-semibold">4.5</span>
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-1 text-sm">
              <span>{numberOfRooms}</span>
              <Bed color="#aaa" size={18} />
              <span className="capitalize text-xs">{typeOfProperty}</span>
            </div>
            {/* <Link
              href={`/properties/${id}/${queryParamString}`}
              className="block text-xs bg-green-600 font-semibold py-2 px-3 outline-none border-0 text-white rounded-md"
            >
              View listing
            </Link> */}
          </div>
          <p className="text-gray-400 text-xs capitalize">
            {city}, {country}
          </p>
          <div className="w-full flex items-center justify-between min-h-[20px]">
            <p className="flex items-center text-xs capitalize space-x-1">
              <LocationIcon size={15} color="stroke-gray-600" />
              <span>
                {houseNumber}, {street}
              </span>
            </p>
            <div className="flex items-center">
              <span className="font-bold text-sm font-inter text-lg">
                ₦{price.toLocaleString()}
              </span>
              <span className="text-[10px]">/night</span>
            </div>
          </div>
        </div>
      </Link>
      <CarouselPrevious color="#444" className="absolute top-1/3 left-5 " />
      <CarouselNext color="#444" className="absolute top-1/3  right-5  " />
    </Carousel>
  );
};
