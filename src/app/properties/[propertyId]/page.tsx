"use client";

import GoogleMap from "@/components/maps/google-map";
import Filter from "@/components/property/Filter";
import PropertyDescription from "@/components/property/property-description";
import PropertySearch from "@/components/property/PropertySearch";
import Rating from "@/components/property/rating";
import SingleCityRecommendedProperty from "@/components/property/single-city-recommended-property";
import LocationIcon from "@/components/svgs/LocationIcon";
import Spinner from "@/components/svgs/Spinner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageViewer from "@/components/ui/image-viewer";
import SplideCarousel from "@/components/ui/splide-carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { MONTHS_OF_THE_YEAR } from "@/constants";
import useQueryString from "@/hooks/useQueryString";
import { addToWishList, createTicket, getPropertyById } from "@/http/api";
import { RootState } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Heart,
  Mail,
  ShieldBan,
  X,
  Shield,
  Home,
} from "lucide-react";
import dynamicImport from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { ChangeEvent, FormEvent, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export const dynamic = "force-dynamic";

const ReservationCalculator = dynamicImport(
  () => import("@/components/property/reservation-calculator"),
  { ssr: false }
);

export default ({
  params: { propertyId },
}: {
  params: { propertyId: string };
}) => {
  const { router } = useQueryString();
  const userId = useSelector((state: RootState) => state.user?.me?.user?.id);

  const isLoggedIn = useSelector((state: RootState) => state.user?.loggedIn);

  const { params } = useQueryString();

  const city = (params.get("city") as string) ?? "";
  const adults = params.get("adults") ? Number(params.get("adults")) : 1;
  const children = params.get("children") ? Number(params.get("children")) : 0;
  const infants = params.get("infants") ? Number(params.get("infants")) : 0;
  const tomorrow = new Date(Date.now() + 86400000);
  const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);

  const normalizeDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const checkInDate = params.get("check-in")
    ? normalizeDate(params.get("check-in") as string)
    : tomorrow;
  const checkOutDate = params.get("check-out")
    ? normalizeDate(params.get("check-out") as string)
    : dayAfterTomorrow;
  const typesOfProperty = params.get("types_of_property");
  const numberOfRooms = params.get("number_of_rooms");
  const price = params.get("price");
  const amenities = params.get("amenities");

  const searchParams = {
    city,
    adults: isNaN(adults) ? 1 : adults,
    children: isNaN(children) ? 0 : children,
    checkInDate: checkInDate ? new Date(checkInDate) : tomorrow,
    checkOutDate: checkOutDate ? new Date(checkOutDate) : dayAfterTomorrow,
    infants: isNaN(infants) ? 0 : infants,
    cursor: 0,
    typesOfProperty: typesOfProperty ? JSON.parse(typesOfProperty) : [],
    numberOfRooms: numberOfRooms ? JSON.parse(numberOfRooms) : [],
    price: price ? +price : 0,
    amenities: amenities ? JSON.parse(amenities) : [],
  };

  const calculatorParams = {
    city,
    adults: isNaN(adults) ? 1 : adults,
    children: isNaN(children) ? 0 : children,
    checkInDate: checkInDate ? new Date(checkInDate) : tomorrow,
    checkOutDate: checkOutDate ? new Date(checkOutDate) : dayAfterTomorrow,
    infants: isNaN(infants) ? 0 : infants,
    cursor: 0,
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["single-property"],
    queryFn: () => {
      return getPropertyById(propertyId);
    },
  });

  const photoUrl = data ? data.photos[0] : "";
  const firstImageUrl = photoUrl;

  const images = data
    ? data.photos.map((photo: string, idx: number) => {
        return photo;
      })
    : [];

  const hostUrl = data?.photo
    ? data.photo
    : "/assets/icons/person-placeholder.png";

  const ticket = useMutation({
    mutationKey: ["create-ticket"],
    mutationFn: createTicket,
    async onSuccess() {
      router.push("/dashboard/inbox");
    },
    onError() {
      toast("Error message", {
        description: "Soory, we could not send your message at this time.",
        action: {
          label: "OK",
          onClick: () => null,
        },
      });
    },
  });

  function createNewTicket(e: FormEvent) {
    e.preventDefault();
    if (!isLoggedIn) {
      return toast("Login Error", {
        description: "You have to be logged in",
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    } else if (!newChat.title || !newChat.message) {
      return toast("Message Host Error", {
        description: "No field can be left empty",
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    } else {
      ticket.mutate({
        senderId: userId,
        userId: userId,
        message: newChat.message,
        hostId: newChat.hostId,
        title: newChat.title,
        propertyId: propertyId,
      });
    }
  }

  const [newChat, setNewChatDetails] = useState({
    title: "",
    message: "",
    hostId: "",
  });

  const guestId = useSelector((state: RootState) => state.user.me?.user?.id);

  const userLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

  const [wish, setWish] = useState(() =>
    data
      ? data.wishlist.map((w: { userId: any }) => w.userId).includes(guestId)
      : false
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
      setWish((prevState: any) => !prevState);
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

  function addPropertyToWishlist(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (userLoggedIn) mutation.mutate({ userId: guestId, propertyId });
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
    : "stroke-black group-hover:stroke-red-500 group-hover:fill-red-500";

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setNewChatDetails((prevState) => ({ ...prevState, [name]: value }));
  }

  useEffect(() => {
    if (data) {
      const isSaved = data.wishlist
        .map((w: { userId: string }) => w.userId)
        .includes(guestId);
      setWish(isSaved);
    }
  }, [data]);

  const reviews = data ? data.reviews : [];

  let averageRating = 0;

  reviews.forEach((review: { rating: string | number }) => {
    averageRating += +review.rating;
  });

  if (reviews.length)
    averageRating = Math.round(averageRating / reviews.length);

  if (isLoading)
    return (
      <div className="w-full flex flex-col items-center min-h-[88vh] py-10 bg-white px-5 md:px-5 lg:px-20 max-w-[1400px] mx-auto">
        <div className="mt-10">
          <Spinner color="red" size={20} />
        </div>
      </div>
    );

  return (
    <>
      <div className="w-full flex flex-col min-h-[88vh] py-10 bg-paper px-5 md:px-5 lg:px-20 max-w-[1400px] mx-auto">
        <div className="min-h-[80px] hidden sm:flex w-full  items-center justify-center space-x-3 mb-3">
          <PropertySearch searchParams={searchParams} />
          <Filter />
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex space-y-2 md:space-y-0 md:flex-row items-center justify-between">
            <div className="w-4/6 flex flex-col">
              <h3 className="text-[20px] font-semibold capitalize">
                {data?.title}
              </h3>
              <div className="w-full flex items-center mt-2">
                <Rating
                  rating={averageRating === 0 ? 5 : averageRating}
                  numberOfComments={reviews.length}
                />
                <p className="text-xs font-semibold capitalize truncate">
                  {data.zip}, {data.city}
                </p>
              </div>
            </div>
            <div
              role="button"
              onClick={addPropertyToWishlist}
              className="w-auto items-center md:items-left flex flex-col space-y-1 cursor-pointer md:items-center"
            >
              <Heart className={heartCss} />
              <span>{wish ? "Saved" : "Save"}</span>
            </div>
          </div>
          <Carousel className="w-full block mb-24 mt-5 sm:hidden">
            <CarouselContent>
              {data.photos.map((photo: string, idx: number) => {
                return (
                  <CarouselItem key={idx}>
                    <ImageViewer images={images} url={photo}>
                      <div
                        className={`w-full overflow-hidden group h-[300px] md:h-[200px] relative rounded-xl cursor-pointer ease duration-300 after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-5 after:z-2 after:rounded-xl after:hidden hover:after:block`}
                      >
                        <Image
                          src={photo}
                          alt="property image"
                          fill
                          className="rounded-xl ease duration-300 group-hover:scale-[1.05]"
                        />
                      </div>
                    </ImageViewer>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious
              color="#000"
              className="absolute top-[100%] mt-7 left-0 "
            />
            <CarouselNext
              color="#000"
              className="absolute top-[100%] mt-7 right-0 "
            />
          </Carousel>
          <div className="hidden w-full min-h-[400px] grid grid-cols-1 grid-rows-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 mt-[20px] mb-[50px] sm:grid">
            <div className="w-full h-full lg:col-span-2 lg:row-span-2 relative rounded-xl cursor-pointer ease duration-300">
              <SplideCarousel images={images} url={firstImageUrl}>
                <Image
                  src={firstImageUrl}
                  alt="property listing"
                  fill
                  className="rounded-xl"
                />
              </SplideCarousel>
              {data?.photos?.length > 5 ? (
                <SplideCarousel images={images} url={data.photos[5]}>
                  <div className="absolute bottom-4 left-4  px-5 py-3 rounded-full bg-white shadow-md text-black font-semibold text-center ease duration-300 hover:bg-red-100">
                    Show more photos
                  </div>
                </SplideCarousel>
              ) : null}
            </div>
            {data.photos.map((photo: string, idx: number) => {
              if (idx === 0) return;
              if (idx === 5) return;
              return (
                <SplideCarousel images={images} url={photo}>
                  <div
                    key={idx}
                    className={`w-full h-full relative rounded-xl cursor-pointer ease duration-300`}
                  >
                    <Image
                      src={photo}
                      alt="property listing"
                      fill
                      className="rounded-xl"
                    />
                  </div>
                </SplideCarousel>
              );
            })}
          </div>

          <div className="w-full flex min-h-[300px] flex flex-col pb-5 border-b-2 border-b-secondary md:flex-row">
            <article className="w-full h-full lg:w-3/5">
              <div className="w-full flex mb-4 flex-col md:flex-row md:justify-between shadow-md bg-white rounded-md p-4 ">
                {/* <div className="w-full py-4 flex flex-col space-y-3 md:space-y-0 md:flex-row items-center md:items-start justify-between">
                  <div className="w-full flex flex-col space-y-2 md:space-y-0 md:flex-row items-center md:space-x-2">
                    <div className="w-[130px] h-[130px] md:w-[80px] md:h-[80px] relative rounded-full overflow-hidden">
                      <Image src={hostUrl} alt="host_profile_photo" fill />
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                      <div>
                        <span className="text-xl"> Hosted by </span>
                        <span className="font-semibold text-xl">
                          {data.contactName}
                        </span>
                      </div>
                      <div className="flex flex-col   items-center md:items-start space-y-2 mt-2">
                        <Rating numberOfComments={12} rating={4} />
                        <div className="space-x-2">
                          <span className="text-md md:text-sm">
                            Hosting since
                          </span>
                          <span className="font-semibold text-md md:text-sm ">
                            {
                              MONTHS_OF_THE_YEAR[
                                new Date(data.createdAt).getMonth()
                              ]
                            }
                          </span>
                          <span className="font-semibold text-md md:text-sm">
                            {new Date(data.createdAt).getFullYear()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>


                  <Tooltip>
                    <Dialog>
                      <DialogTrigger className="py-2 px-3 bg-black text-white rounded-md flex items-center justify-center">
                        <TooltipTrigger className="w-full h-full flex items-center justify-center space-x-2">
                          <span className="text-md">Message</span>
                          <Mail color="white" size={16} />
                        </TooltipTrigger>
                      </DialogTrigger>
                      <DialogContent className="md:w-[400px]">
                        <div className="w-full flex justify-between z-[99999999]">
                          <DialogHeader className="w-auto flex flex-col">
                            <DialogTitle className="text-left p-0 m-0">
                              New Chat
                            </DialogTitle>
                            <DialogDescription>
                              Adds a new Ticket
                            </DialogDescription>
                          </DialogHeader>
                        </div>
                        <form
                          className="w-full space-y-3"
                          onSubmit={createNewTicket}
                        >
                          <div className="w-full flex flex-col">
                            <label htmlFor="title">
                              What do you want to talk about ?
                            </label>
                            <input
                              id="title"
                              name="title"
                              onChange={handleChange}
                              value={newChat.title}
                              className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
                            />
                          </div>
                          <div className="w-full flex flex-col">
                            <textarea
                              value={newChat.message}
                              onChange={handleChange}
                              name="message"
                              className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400"
                              placeholder="type message..."
                            />
                          </div>
                          <button
                            role="button"
                            className="w-full p-2 rounded-full flex space-x-2 items-center justify-center outline-none bg-black text-white"
                          >
                            {ticket.isPending ? (
                              <Spinner color="red" size={20} />
                            ) : (
                              <>
                                <span>Send message</span>
                                <ArrowRight />
                              </>
                            )}
                          </button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <TooltipContent>Message host</TooltipContent>
                  </Tooltip>
                </div> */}

                <div className="w-full flex flex-col space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden ring-2 ring-offset-2 ring-gray-100">
                      <Image
                        src={hostUrl}
                        alt={`${data.contactName}'s profile photo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xl font-medium">
                        Hosted by{" "}
                        <span className="font-semibold">
                          {data.contactName}
                        </span>
                      </h3>
                      <div className="flex flex-col mt-2 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Rating
                            numberOfComments={data.numberOfReviews || 0}
                            rating={4}
                          />
                        </div>
                        <p className="text-gray-600 text-sm">
                          Hosting since{" "}
                          {new Date(data.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "long", year: "numeric" }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">Identity verified</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Home className="w-4 h-4 text-primary" />
                      <span className="text-gray-600">Superhost</span>
                    </div>
                  </div>

                  <Dialog>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DialogTrigger className="w-full md:w-auto flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4" />
                              <span className="font-medium">Message host</span>
                            </div>
                          </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Send a message to the host</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <DialogContent className="md:max-w-md">
                      <div className="w-full flex justify-between items-center">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold">
                            Message the Host
                          </DialogTitle>
                          <DialogDescription className="text-gray-600">
                            Send a message to {data.contactName}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                          <X className="w-4 h-4" />
                        </DialogClose>
                      </div>
                      <form
                        className="w-full space-y-4 mt-4"
                        onSubmit={createNewTicket}
                      >
                        <div className="w-full">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Subject
                          </label>
                          <input
                            id="title"
                            name="title"
                            onChange={handleChange}
                            value={newChat.title}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="What would you like to discuss?"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={newChat.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="Type your message here..."
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-lg flex items-center justify-center space-x-2 bg-primary text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {ticket.isPending ? (
                            <Spinner color="white" size={20} />
                          ) : (
                            <>
                              <span>Send message</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="w-full flex flex-col shadow-md bg-white rounded-md p-4">
                <PropertyDescription type={data.typeOfProperty} />
              </div>
              <p className="w-full leading-7 lg:w-4/5 font-[500] mt-6 italicize">
                {data.description}
              </p>
            </article>
            <div className="w-full h-full mt-5 flex justify-end lg:w-2/5 md:px-4 md:mt-0">
              <ReservationCalculator
                cautionFee={data.cautionFee}
                propertyId={propertyId}
                price={data.price}
                {...calculatorParams}
              />
            </div>
          </div>
          <div className="w-full flex flex-col space-y-5 mt-5">
            <div className="w-full items-center space-x-2">
              <span className="font-semibold text-[20px]">Number of rooms</span>
              <span className="text-[20px]">{data.numberOfRooms}</span>
            </div>
            <div className="w-full items-center space-x-2">
              <span className="font-semibold text-[20px]">
                Max. number of people allowed in your house
              </span>
              <span className="text-[20px]">{data.maxNumberOfPeople}</span>
            </div>
          </div>
          <div className="w-full min-h-[100px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-2 mt-10 lg:w-1/2">
            <div className="col-span-2 md:col-span-3">
              <h4 className="text-[20px] font-semibold">What is near</h4>
            </div>
            {data.nearbyPlaces.map((place: string, idx: number) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircle size={14} />
                <span className="capitalize font-[500]">{place}</span>
              </div>
            ))}
          </div>
          <div className="w-full my-10 pb-10 border-b-2 border-b-secondary">
            <div className="w-full min-h-[100px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 lg:gap-y-3 gap-3 md:w-4/5">
              <div className="col-span-2 md:col-span-3 lg:col-span-5 ">
                <h4 className="text-[20px] font-semibold">
                  Available Amenities
                </h4>
              </div>
              {data.ammenities.map((ammenity: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 py-1 px-4 rounded-md bg-white shadow-md"
                >
                  <CheckCircle size={14} color="green" strokeWidth={3} />
                  <span className="capitalize font-[500]">{ammenity}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full  pb-10 border-b-2 border-b-secondary">
            <div className="w-full flex flex-col space-y-5 text-[14px[">
              <h4 className="text-[20px] font-semibold">House Rules</h4>
              <p className="text-md w-full">
                You'll be staying in someone's home, so please treat it with
                care and respect.
              </p>
            </div>
            <div className="w-full flex flex-col space-y-5  my-10">
              <div className="flex items-center space-x-3">
                <Clock size={20} />
                <h4 className="text-md">Check-in after</h4>
                <span className="text-md font-inter">{data.checkInAfter}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={20} />
                <h4 className="text-md">Checkout before</h4>
                <span className="text-md font-inter">
                  {data.checkOutBefore}
                </span>
              </div>
            </div>
            <div className="w-full min-h-[100px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:w-4/5">
              {data.houseRules.map((rule: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <ShieldBan size={14} />
                  <span className="capitalize text-[14px] ">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col py-4 mt-2 space-y-2 border-b-2 border-b-secondary">
            <div className="flex items-center space-x-1">
              <LocationIcon size={15} />
              <p className="text-sm font-semibold capitalize">
                {data.zip} {data.city}
              </p>
            </div>
            <div className="w-full h-[600px] md:w-full md:h-[450px]">
              <GoogleMap
                title={data.title}
                address={`${data.houseNumber}, ${data.street} ${data.zip} ${data.city}`}
                coords={[+data.lat, +data.lng]}
              />
            </div>
          </div>
          <div className="w-full flex flex-col py-4 mt-5 space-y-2 border-b-2 border-b-secondary">
            <h4 className="text-[20px] font-semibold">Cancellation Policy</h4>
            <p>Free cancellations up until 48hrs before booking date</p>
            <p>
              Reviews the Host's full{" "}
              <Link
                href="/terms-of-use#refund-policy"
                className="font-bold underline"
              >
                Cancellation Policy
              </Link>
            </p>
          </div>
          <div className="w-full flex flex-col py-4 mt-2 space-y-2 border-b-2 border-b-secondary">
            <h4 className="text-[20px] font-semibold">Recommended</h4>
            <SingleCityRecommendedProperty
              currentPropertyId={propertyId}
              city={data.city}
            />
          </div>
        </div>
      </div>
    </>
  );
};
