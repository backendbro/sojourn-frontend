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
import useCurrency from "@/hooks/useCurrency";
import { RootState } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Heart,
  Mail,
  MailCheck,
  Mailbox,
  ShieldBan,
  X,
  Shield,
  Home,
  Church,
  TreeDeciduous,
  Store,
  Plane,
  UtensilsCrossed,
  ShoppingCart,
  Beer,
  View,
  Send,
  MessageCircle,
} from "lucide-react";
import dynamicImport from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useCallback } from "react";
import { ChangeEvent, FormEvent, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export const dynamic = "force-dynamic";

const ReservationCalculator = dynamicImport(
  () => import("@/components/property/reservation-calculator"),
  { ssr: false }
);

const VirtualTourViewer = dynamicImport(
  () => import("@/components/property/virtual-tour-viewer"),
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

  const getPlaceIcon = (place: string) => {
    const placeMap: { [key: string]: any } = {
      church: Church,
      park: TreeDeciduous,
      market: Store,
      airport: Plane,
      restaurant: UtensilsCrossed,
      mall: ShoppingCart,
      "bar/club": Beer,
    };

    const Icon = placeMap[place.toLowerCase()] || CheckCircle;
    return <Icon size={16} className="text-primary" />;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["single-property", propertyId],
    queryFn: () => getPropertyById(propertyId),
  });

  const photos: string[] = data?.photos ?? [];
  const photoUrl = photos[0] ?? "";
  const firstImageUrl = photoUrl;

  const images = photos;

  const hostUrl = data?.photo
    ? data.photo
    : "/assets/icons/person-placeholder.png";

  const ticket = useMutation({
    mutationKey: ["create-ticket"],
    mutationFn: createTicket,
    async onSuccess() {
      setNewChatDetails((prev) => ({ ...prev, message: "" }));
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
        router.push("/dashboard/inbox");
      }, 2800);
    },
    onError(error: any) {
      const status = error?.response?.status;
      if (status === 401) {
        toast("Session expired", {
          description: "Please log in again to send a message.",
          action: {
            label: "Log in",
            onClick: () => router.push("/login"),
          },
        });
      } else {
        toast("Could not send message", {
          description: "Something went wrong. Please try again.",
          action: {
            label: "OK",
            onClick: () => null,
          },
        });
      }
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
    } else if (!newChat.message.trim()) {
      return toast("Message Host Error", {
        description: "Please enter a message",
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    } else {
      const hostId = data?.hostId || newChat.hostId;
      ticket.mutate({
        senderId: userId,
        userId: userId,
        message: newChat.message,
        hostId,
        title: newChat.title || "Property Inquiry",
        propertyId: propertyId,
      });
    }
  }

  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [showStickyBook, setShowStickyBook] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);


  const bookingCardRef = useRef<HTMLDivElement>(null);

  const { exchangeRate, loading: currencyLoading } = useCurrency();
  const currency = useSelector((state: RootState) => state.currency?.currency);
  const currSymbol = currency === "NGN" ? "₦" : "$";

  useEffect(() => {
    if (!bookingCardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBook(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(bookingCardRef.current);
    return () => observer.disconnect();
  }, [data]);

  const scrollToBooking = useCallback(() => {
    bookingCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      const btn = document.querySelector("[data-check-availability]") as HTMLElement | null;
      if (btn) {
        btn.style.transform = "scale(1.08)";
        btn.style.boxShadow = "0 0 20px rgba(239,68,68,0.5)";
        btn.style.transition = "all 0.3s ease";
        setTimeout(() => {
          btn.style.transform = "";
          btn.style.boxShadow = "";
        }, 800);
      }
    }, 700);
  }, []);

  const [newChat, setNewChatDetails] = useState({
    title: "Property Inquiry",
    message: "",
    hostId: "",
  });

  const guestId = useSelector((state: RootState) => state.user.me?.user?.id);

  const userLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

  const [wish, setWish] = useState(false);

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

  const reviews: { rating: string | number }[] = data?.reviews ?? [];
  const wishlistArr: { userId: string }[] = data?.wishlist ?? [];
  const nearbyPlaces: string[] = data?.nearbyPlaces ?? [];
  const houseRules: string[] = data?.houseRules ?? [];
  const ammenities: string[] = data?.ammenities ?? [];
  const rawPanoramas = data?.panoramas ?? [];
  const panoramas: { id: string; label: string; imageUrl: string }[] = Array.isArray(rawPanoramas)
    ? rawPanoramas
        .filter((p): p is { id: string; label: string; imageUrl: string } => p && typeof p === "object" && "imageUrl" in p)
        .map((p) => ({
          id: String(p.id ?? ""),
          label: String(p.label ?? ""),
          imageUrl: String(p.imageUrl ?? ""),
        }))
    : [];



  useEffect(() => {
    if (data) {
      const isSaved = wishlistArr
        .map((w) => w.userId)
        .includes(guestId as string);
      setWish(isSaved);
    }
  }, [data, wishlistArr, guestId]);

  let averageRating = 0;

  reviews.forEach((review) => {
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

  if (error || !data)
    return (
      <div className="w-full flex flex-col items-center min-h-[88vh] py-10 bg-white px-5 md:px-5 lg:px-20 max-w-[1400px] mx-auto">
        <div className="mt-20 text-center">
          <h2 className="text-xl font-semibold mb-2">Property not found</h2>
          <p className="text-gray-500 mb-4">
            {error?.message || "This property may have been removed or the link is incorrect."}
          </p>
          <Link href="/properties" className="text-primary font-semibold underline">
            Browse properties
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <div className="w-full flex flex-col min-h-[88vh] py-6 sm:py-10 bg-paper px-3 sm:px-5 lg:px-20 max-w-[1400px] mx-auto">
        <div className="min-h-[80px] hidden sm:flex w-full items-center justify-center space-x-3 mb-3">
          <PropertySearch searchParams={searchParams} />
          <Filter />
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex space-y-2 md:space-y-0 md:flex-row items-center justify-between">
            <div className="w-full sm:w-4/6 flex flex-col">
              <h3 className="text-[17px] sm:text-[20px] font-semibold capitalize">
                {data?.title}
              </h3>
              <div className="w-full flex items-center mt-1 sm:mt-2">
                <Rating
                  rating={averageRating === 0 ? 5 : averageRating}
                  numberOfComments={reviews.length}
                />
                <p className="text-[11px] sm:text-xs font-semibold capitalize truncate">
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
              {photos.map((photo: string, idx: number) => {
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
              {photos.length > 5 ? (
                <SplideCarousel images={images} url={photos[5]}>
                  <div className="absolute bottom-4 left-4  px-5 py-3 rounded-full bg-white shadow-md text-black font-semibold text-center ease duration-300 hover:bg-red-100">
                    Show more photos
                  </div>
                </SplideCarousel>
              ) : null}
              {panoramas.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowVirtualTour(true)}
                  className="absolute bottom-4 right-4 px-4 py-2.5 rounded-full bg-black/80 text-white text-sm font-semibold flex items-center gap-2 shadow-lg hover:bg-black transition-colors z-10"
                >
                  <View size={16} />
                  360° Tour
                </button>
              )}
            </div>
            {photos.map((photo: string, idx: number) => {
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

          {/* 360° Virtual Tour Viewer */}
          {showVirtualTour && panoramas.length > 0 && (
              <VirtualTourViewer
              panoramas={panoramas}
              onClose={() => setShowVirtualTour(false)}
              isFullscreen
            />
          )}

          <div className="w-full flex min-h-[200px] sm:min-h-[300px] flex flex-col pb-5 border-b-2 border-b-secondary md:flex-row">
            <article className="w-full h-full lg:w-3/5">
              <div className="w-full flex mb-4 flex-col md:flex-row md:justify-between shadow-md bg-white rounded-md p-3 sm:p-4">
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

                <div className="w-full flex flex-col space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 relative rounded-full overflow-hidden ring-2 ring-offset-2 ring-gray-100 shrink-0">
                      <Image
                        src={hostUrl}
                        alt={`${data.contactName}'s profile photo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-base sm:text-xl font-medium truncate">
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
                    {data.hostVerified && (
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-gray-600">Identity verified</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Home className="w-4 h-4 text-primary" />
                      <span className="text-gray-600">Superhost</span>
                    </div>
                  </div>

                  <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
                    <DialogTrigger className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-full transition-all hover:bg-gray-800 active:scale-[0.97] shadow-sm">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium text-sm">Message host</span>
                    </DialogTrigger>
                    <DialogContent className="!max-w-[440px] !p-0 !gap-0 overflow-hidden rounded-2xl [&>button]:hidden">
                      {messageSent ? (
                        <div className="flex flex-col items-center justify-center py-12 px-6 gap-3">
                          <div className="envelope-mailbox-scene">
                            <div className="mailbox-icon">
                              <Mailbox className="w-14 h-14 text-gray-700" strokeWidth={1.5} />
                            </div>
                            <div className="envelope-icon">
                              <Mail className="w-7 h-7 text-primary" strokeWidth={2} />
                            </div>
                          </div>
                          <div className="sent-check-icon mt-2">
                            <MailCheck className="w-8 h-8 text-emerald-500" />
                          </div>
                          <p className="sent-text text-base font-semibold text-gray-900">
                            Message sent!
                          </p>
                          <p className="sent-subtext text-sm text-gray-500">
                            Taking you to your inbox&hellip;
                          </p>
                        </div>
                      ) : (
                        <>
                          {/* Host header */}
                          <div className="flex items-center gap-3 px-6 pt-6 pb-4">
                            <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 shrink-0 ring-2 ring-gray-100 ring-offset-1">
                              <img
                                src={hostUrl}
                                alt={data.contactName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <DialogHeader className="!space-y-0.5 !text-left">
                                <DialogTitle className="text-base font-semibold text-gray-900">
                                  Message {data.contactName}
                                </DialogTitle>
                                <DialogDescription className="text-xs text-gray-500">
                                  Typically responds within a few hours
                                </DialogDescription>
                              </DialogHeader>
                            </div>
                            <DialogClose className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 shrink-0 transition-colors">
                              <X className="w-4 h-4 text-gray-500" />
                            </DialogClose>
                          </div>

                          <div className="h-px bg-gray-100" />

                          {/* Message form */}
                          <form
                            onSubmit={createNewTicket}
                            className="px-6 pt-4 pb-6 space-y-4"
                          >
                            <textarea
                              name="message"
                              value={newChat.message}
                              onChange={handleChange}
                              rows={5}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-sm text-gray-800 placeholder:text-gray-400 resize-none outline-none"
                              placeholder={`Hi ${data.contactName}, I have a question about your property...`}
                            />
                            <button
                              type="submit"
                              disabled={!newChat.message.trim() || ticket.isPending}
                              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 bg-primary text-white font-semibold text-sm transition-all hover:bg-red-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary shadow-sm"
                            >
                              {ticket.isPending ? (
                                <Spinner color="white" size={18} />
                              ) : (
                                <>
                                  <Send className="w-4 h-4" />
                                  <span>Send message</span>
                                </>
                              )}
                            </button>
                            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                              You&apos;ll be able to continue this conversation in your{" "}
                              <a href="/dashboard/inbox" className="text-primary hover:underline font-medium">
                                inbox
                              </a>
                            </p>
                          </form>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="w-full flex flex-col shadow-md bg-white rounded-md p-4">
                <PropertyDescription type={data.typeOfProperty} />
              </div>
              <p className="w-full leading-6 sm:leading-7 lg:w-4/5 font-[500] mt-4 sm:mt-6 text-sm sm:text-base italicize break-words overflow-wrap-anywhere">
                {data.description}
              </p>
            </article>
            <div ref={bookingCardRef} className="w-full h-full mt-5 flex flex-col lg:justify-end lg:w-2/5 md:px-4 md:mt-0">
              <ReservationCalculator
                cautionFee={+(data.cautionFee ?? 0)}
                propertyId={propertyId}
                price={+(data.price ?? 0)}
                typeOfProperty={data.typeOfProperty}
                monthlyPrice={+(data.monthlyPrice || 0)}
                minStayMonths={+(data.minStayMonths || 3)}
                maxStayMonths={+(data.maxStayMonths || 6)}
                longStayDiscountPercent={+(data.longStayDiscountPercent || 5)}
                {...calculatorParams}
              />
            </div>
          </div>
          <div className="w-full flex flex-col space-y-4 sm:space-y-5 mt-4 sm:mt-5">
            <div className="w-full flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-semibold text-[16px] sm:text-[20px]">Number of rooms</span>
              <span className="text-[16px] sm:text-[20px]">{data.numberOfRooms}</span>
            </div>
            <div className="w-full flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-semibold text-[16px] sm:text-[20px]">
                Max. number of people allowed in your house
              </span>
              <span className="text-[16px] sm:text-[20px]">{data.maxNumberOfPeople}</span>
            </div>
          </div>
          {/* <div className="w-full min-h-[100px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-2 mt-10 lg:w-1/2">
            <div className="col-span-2 md:col-span-3">
              <h4 className="text-[20px] font-semibold">What is near</h4>
            </div>
            {data.nearbyPlaces.map((place: string, idx: number) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircle size={14} />
                <span className="capitalize font-[500]">{place}</span>
              </div>
            ))}
          </div> */}

          <div className="w-full min-h-[100px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 mt-8 sm:mt-10 lg:w-1/2">
            <div className="col-span-1 sm:col-span-2 md:col-span-3">
              <h4 className="text-[17px] sm:text-[20px] font-semibold">What is near</h4>
            </div>
            {nearbyPlaces.map((place: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center space-x-2 py-1.5 px-3 rounded-md bg-white/50 hover:bg-white transition-colors duration-200"
              >
                {getPlaceIcon(place)}
                <span className="capitalize font-[500] text-sm">{place}</span>
              </div>
            ))}
          </div>

          <div className="w-full my-6 sm:my-10 pb-6 sm:pb-10 border-b-2 border-b-secondary">
            <div className="w-full min-h-[100px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-3 sm:gap-y-4 gap-2 sm:gap-3 md:w-4/5">
              <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5">
                <h4 className="text-[17px] sm:text-[20px] font-semibold">
                  Available Amenities
                </h4>
              </div>
              {ammenities.map((ammenity: string, idx: number) => (
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
          <div className="w-full pb-6 sm:pb-10 border-b-2 border-b-secondary">
            <div className="w-full flex flex-col space-y-3 sm:space-y-5">
              <h4 className="text-[17px] sm:text-[20px] font-semibold">House Rules</h4>
              <p className="text-md w-full">
                You'll be staying in someone's home, so please treat it with
                care and respect.
              </p>
            </div>
            <div className="w-full flex flex-col space-y-5  my-10">
              <div className="flex items-center space-x-3">
                <Clock size={20} />
                <h4 className="text-md">Check-in after</h4>
                <span className="text-md font-inter">{data?.checkInAfter ?? "2:00 PM"}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={20} />
                <h4 className="text-md">Checkout before</h4>
                <span className="text-md font-inter">
                  {data?.checkOutBefore ?? "11:00 AM"}
                </span>
              </div>
            </div>
            <div className="w-full min-h-[100px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:w-4/5">
              {houseRules.map((rule: string, idx: number) => (
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
            <div className="w-full h-[300px] sm:h-[400px] md:h-[450px]">
              <GoogleMap
                title={data.title}
                address={`${data.houseNumber}, ${data.street} ${data.zip} ${data.city}`}
                coords={[+data.lat, +data.lng]}
              />
            </div>
          </div>
          <div className="w-full flex flex-col py-4 mt-5 space-y-2 border-b-2 border-b-secondary">
            <h4 className="text-[17px] sm:text-[20px] font-semibold">Cancellation Policy</h4>
            <p>Free cancellations up until 48hrs before booking date</p>
            <p>
              Reviews the Host's full{" "}
              <Link
                href="/cancellation-policy"
                className="font-bold underline"
              >
                Cancellation Policy
              </Link>
            </p>
          </div>
          <div className="w-full flex flex-col py-4 mt-2 space-y-2 border-b-2 border-b-secondary">
            <h4 className="text-[17px] sm:text-[20px] font-semibold">Recommended</h4>
            <SingleCityRecommendedProperty
              currentPropertyId={propertyId}
              city={data.city}
            />
          </div>
        </div>
      </div>

      {/* Sticky bottom booking bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[999] transition-all duration-300 ${
          showStickyBook
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center">
            <button
              onClick={scrollToBooking}
              className="w-full max-w-xl bg-primary hover:bg-primary/90 active:scale-[0.98] text-white font-bold text-lg sm:text-xl px-8 py-4 sm:py-5 rounded-full transition-all shadow-lg shadow-primary/25 flex flex-col items-center gap-1"
            >
              <span>Check availability</span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setMessageDialogOpen(true);
                }}
                className="text-sm font-medium text-white/80 hover:text-white underline underline-offset-2 decoration-white/40 hover:decoration-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 animate-bounce" />
                or chat with host
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
