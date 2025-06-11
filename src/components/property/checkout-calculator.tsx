"use client";

import { Minus, Plus, X } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Rating from "./rating";
import { useState, MouseEvent, useEffect, useRef, ChangeEvent } from "react";
import Spinner from "../svgs/Spinner";
import { numberOfNights } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkListingAvailability, getTotalSojournCredits } from "@/http/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Switch } from "../ui/switch";
import useCurrency from "@/hooks/useCurrency";
import Image from "next/image";

type GuestsType = "adults" | "children" | "infants";

export default ({
  price,
  children = 0,
  adults = 1,
  infants = 0,
  checkInDate,
  checkOutDate,
  propertyId,
  cautionFee,
  propertyImage,
  title,
  address,
}: {
  propertyId: string;
  price: number;
  children: number;
  infants: number;
  adults: number;
  checkInDate: Date;
  checkOutDate: Date;
  cautionFee: number;
  propertyImage: string;
  title: string;
  address: string;
}) => {
  const ref = useRef(null);

  const userId = useSelector((state: RootState) => state.user?.me?.user?.id);
  const isLoggedIn = useSelector((state: RootState) => state?.user?.loggedIn);
  const isUserProfileComplete = useSelector(
    (state: RootState) => state.user.me.userProfileComplete
  );

  const [calculator, setCalculator] = useState(() => ({
    price,
    children,
    adults: adults < 1 ? 1 : adults,
    infants,
    checkInDate: new Date(checkInDate),
    checkOutDate: new Date(checkOutDate),
    openDiscount: false,
    openCredits: false,
  }));

  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-credits"],
    queryFn: () => getTotalSojournCredits(userId),
  });

  const [deals, setDeals] = useState({
    credits: data ? data : 0,
    discountCode: "",
  });

  const checkoutQueryString = `/checkout/${propertyId}?check-in=${calculator.checkInDate.toISOString()}&check-out=${calculator.checkOutDate.toISOString()}&number-of-adults=${
    calculator.adults
  }&number-of-children=${calculator.children}&number-of-infants=${
    calculator.infants
  }&credits=${calculator.openCredits ? deals.credits : 0}&discount-code=${
    calculator.openDiscount ? deals.discountCode : ""
  }`;

  const queryString = `propertyId=${propertyId}&checkInDate=${calculator.checkInDate.toISOString()}&checkOutDate=${calculator.checkOutDate.toISOString()}&numberOfAdults=${
    calculator.adults
  }&numberOfChildren=${calculator.children}&numberOfInfants=${
    calculator.infants
  }`;

  function handleDealChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "credits") {
      if (value > data) {
        setDeals((prevState) => ({ ...prevState, [name]: data }));
      } else {
        setDeals((prevState) => ({ ...prevState, [name]: value }));
      }
    } else {
      setDeals((prevState) => ({ ...prevState, [name]: value }));
    }
  }

  const availabilityMutation = useMutation({
    mutationKey: ["listing-availability"],
    mutationFn: checkListingAvailability,
    onSuccess(data) {
      if (!data) {
        toast("Listing message", {
          description: "This listing is unvailable on the dates specified.",
          action: {
            label: "Ok",
            onClick: () => console.log("Ok"),
          },
        });
      } else {
        setOpenSummary(true);
      }
    },
  });

  const [open, setOpen] = useState(false);

  const [openSummary, setOpenSummary] = useState(false);

  const howManyNights = numberOfNights(
    calculator.checkInDate,
    calculator.checkOutDate
  );

  const { exchangeRate, error, loading } = useCurrency();

  const currency = useSelector((state: RootState) => state.currency.currency);

  const symbol = currency === "NGN" ? "₦" : "$";

  const estimatedPrice = symbol === "$" ? price / exchangeRate : price;

  const estimatedCautionFee =
    symbol === "$" ? cautionFee / exchangeRate : cautionFee;

  const estimatedVat = (7.5 / 100) * (estimatedPrice * howManyNights);

  const estimatedServiceFee = (10 / 100) * (estimatedPrice * howManyNights);
  const [fees, setFee] = useState({
    serviceFee: estimatedServiceFee,
    vat: estimatedVat,
    maintenanceFee: 0,
    damageFee: estimatedCautionFee,
  });

  const checkInDateString = calculator.checkInDate.toDateString();
  const checkOutDateString = calculator.checkOutDate.toDateString();

  const adultsString =
    calculator.adults > 1
      ? `${calculator.adults} adults`
      : `${calculator.adults} adult`;
  const childrenString =
    calculator.children > 1
      ? `${calculator.children} children`
      : `${calculator.children} child`;
  const infantsString =
    calculator.infants > 1
      ? `${calculator.infants} infants`
      : `${calculator.infants} infant`;

  let summaryCss = openSummary ? "h-[480px]" : "h-[0px]";

  const handleMinus =
    (value: GuestsType) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (value === "adults") {
        setCalculator((prevState) => ({
          ...prevState,
          [value]: prevState.adults <= 1 ? 1 : prevState.adults - 1,
        }));
      } else {
        setCalculator((prevState) => ({
          ...prevState,
          [value]: prevState[value] <= 0 ? 0 : prevState[value] - 1,
        }));
      }
    };

  const handlePlus =
    (value: GuestsType) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setCalculator((prevState) => ({
        ...prevState,
        [value]: prevState[value] + 1,
      }));
    };

  const onDocumentClick = (e: Event) => {
    e.stopPropagation();
    //@ts-ignore
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  async function checkAvailability() {
    const numberOfDaysBetweenDates = numberOfNights(
      calculator.checkInDate,
      calculator.checkOutDate
    );

    const numberOfDaysBetweenCheckInAndToday = numberOfNights(
      new Date(),
      calculator.checkInDate
    );

    const numberOfDaysBetweenCheckOutAndToday = numberOfNights(
      new Date(),
      calculator.checkOutDate
    );

    if (
      numberOfDaysBetweenDates < 1 ||
      numberOfDaysBetweenCheckInAndToday < 1 ||
      numberOfDaysBetweenCheckOutAndToday < 1
    ) {
      toast("Reservation Error message", {
        description: "Check in and Check out dates are not valid",
        closeButton: true,
      });
      return;
    }
    availabilityMutation.mutate(queryString);
  }

  const addOrRemoveDeals = calculator.openCredits
    ? currency === "NGN"
      ? -deals.credits
      : -(deals.credits / exchangeRate)
    : 0;

  useEffect(() => {
    if (open) {
      document.addEventListener("click", onDocumentClick);
    }
    return () => {
      removeEventListener("click", onDocumentClick);
    };
  }, [open]);

  useEffect(() => {
    setFee((prevState) => ({
      ...prevState,
      serviceFee: Math.round((10 / 100) * (price * howManyNights)),
      vat: Math.round((7.5 / 100) * (price * howManyNights)),
    }));
  }, [calculator.checkInDate, calculator.checkOutDate]);

  useEffect(() => {
    if (data) {
      setDeals((prevState) => ({ ...prevState, credits: data }));
    }
  }, [data]);

  useEffect(() => {
    function start() {
      checkAvailability();
    }
    start();
  }, [calculator.checkInDate, calculator.checkOutDate]);

  return (
    <form
      className={`w-full min-h-[300px] shadow-md bg-white rounded-xl p-4 md:w-5/6  ${
        openSummary ? "lg:min-h-[250px]" : "lg:h-[250px]"
      } `}
    >
      <div className="w-full flex flex-col h-full mt-2 justify-between">
        <div className="w-full h-[300px] relative overflow-hidden rounded-md">
          <Image src={propertyImage} alt="property_image" fill priority />
        </div>
        <h3 className="font-semibold text-lg mt-4 capitalize">{title}</h3>
        <p className="text-md my-2">{address}</p>
        <div className="w-full min-h-[120px] my-5 border border-gray-300 rounded-md">
          <div className="w-full h-[80px] flex border-b border-b-gray-300 lg:h-[60px]">
            <Popover>
              <PopoverTrigger className="w-1/2 h-full border-r border-r-gray-300 grid py-2 cursor-pointer ease duration-300">
                <div className="w-full h-full grid">
                  <span className="text-sm text-center">Check in</span>
                  <span className="font-semibold fonot-semibold text-sm text-center">
                    {checkInDateString}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <Calendar
                  onSelect={(date) => {
                    const today = new Date();

                    const isNumberOfDaysBetweenCheckInDatesValid =
                      numberOfNights(
                        calculator.checkInDate,
                        calculator.checkOutDate
                      ) >= 1;

                    const isNumberOfDaysBetweenCheckInDateAndTodayValid =
                      numberOfNights(today, calculator.checkInDate) < 1;
                    if (!isNumberOfDaysBetweenCheckInDatesValid) {
                      toast(
                        "You cannot select a date later than your checkout date.",
                        {
                          action: {
                            label: "Ok",
                            onClick() {
                              return;
                            },
                          },
                        }
                      );
                    } else if (isNumberOfDaysBetweenCheckInDateAndTodayValid) {
                      toast("You cannot select a date earlier than today.", {
                        action: {
                          label: "Ok",
                          onClick() {
                            return;
                          },
                        },
                      });
                    } else {
                      setCalculator((prevState) => ({
                        ...prevState,
                        checkInDate: date as Date,
                      }));
                    }
                  }}
                  selected={calculator.checkInDate as Date}
                  mode="single"
                  className="rounded-md border shadow"
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className="w-1/2 h-full grid py-2 cursor-pointer ease duration-300 border-r border-r-gray-300">
                <div className="w-full h-full grid">
                  <span className="text-sm text-center">Check out</span>
                  <span className="font-semibold text-sm text-center">
                    {checkOutDateString}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <Calendar
                  onSelect={(date) => {
                    const numberOfDaysBetween = numberOfNights(
                      new Date(calculator.checkInDate as Date),
                      new Date(date as Date)
                    );

                    if (numberOfDaysBetween < 1) {
                      toast(
                        "You cannot select a date earlier or equal to your check in date.",
                        {
                          action: {
                            label: "Ok",
                            onClick() {
                              return;
                            },
                          },
                        }
                      );
                    } else {
                      setCalculator((prevState) => ({
                        ...prevState,
                        checkOutDate: date as Date,
                      }));
                    }
                  }}
                  selected={calculator.checkOutDate as Date}
                  mode="single"
                  className="rounded-md border shadow"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div
            ref={ref}
            onClick={(e) => {
              setOpen(true);
            }}
            className="w-full min-h-[80px] grid py-2 cursor-pointer relative border-b border-b-gray-300  ease duration-300 hover:bg-red-50 lg:min-h-[60px]"
          >
            <div className="w-full flex items-center justify-between px-4">
              <span className="text-gray-500 text-sm">Guests</span>
              {open && (
                <span
                  className="z-50 group p-1 rounded-md hover:bg-red-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                >
                  <X
                    color="#bbb"
                    size={20}
                    strokeWidth={2}
                    className="group-hover:stroke-primary"
                  />
                </span>
              )}
            </div>
            <div className="flex items-center justify-between px-4">
              {calculator.adults > 0 ? (
                <span className="font-semibold text-sm truncate w-[60px] cursor-pointer capitalize">
                  {adultsString}
                </span>
              ) : null}
              {calculator.children > 0 ? (
                <span className="font-semibold text-sm truncate  w-[60px] cursor-pointer capitalize">
                  {childrenString}
                </span>
              ) : null}
              {calculator.infants > 0 ? (
                <span className="font-semibold text-sm truncate  w-[60px] cursor-pointer capitalize">
                  {infantsString}
                </span>
              ) : null}
            </div>
            {open && (
              <div className="w-full bg-white h-[150px] absolute bottom-[-150px] left-0 shadow-md rounded-md px-4 py-5 space-y-5">
                {["adults", "children", "infants"].map(
                  (value: string, idx: number) => (
                    <div
                      key={idx}
                      className="w-full capitalize flex items-center justify-between"
                    >
                      <span>{value}</span>
                      <div className="w-4/6 bg-yellow flex items-center justify-evenly">
                        <button onClick={handlePlus(value as GuestsType)}>
                          <Plus size={20} color="black" />
                        </button>
                        <span>{+calculator[value as GuestsType]}</span>
                        <button onClick={handleMinus(value as GuestsType)}>
                          <Minus size={20} color="black" />
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <div
            className={`w-full ease duration-300 ${summaryCss} px-2 overflow-hidden space-y-4`}
          >
            <h4 className="my-5 font-semibold text-lg">Price details</h4>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="text-sm">{`${symbol}${estimatedPrice.toFixed(
                  2
                )}`}</span>
                <X color="black" size={14} />
                <span className="text-sm">{howManyNights}</span>
                <span className="text-sm">
                  {howManyNights > 1 ? "nights" : "night"}
                </span>
              </div>
              <span className="text-sm font-inter">
                {`${symbol}${(estimatedPrice * howManyNights)
                  .toFixed(2)
                  .toLocaleString()}`}
              </span>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex text-sm items-center">Service fee</div>
              <div className="text-sm font-inter">
                {symbol}
                {estimatedServiceFee.toFixed(2)}
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex text-sm items-center ">
                VAT <span className="font-inter">(7.5%)</span>
              </div>
              <div className="text-sm font-inter">
                {symbol}
                {estimatedVat.toFixed(2)}
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex text-sm items-center">
                Damage protection fee <br />
                (refundable)
              </div>
              <div className="text-sm font-inter">
                {symbol}
                {estimatedCautionFee.toFixed(2)}
              </div>
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center  space-x-2">
                <label htmlFor="discount" className="text-sm">
                  Discount code
                </label>
                <Switch
                  id="discount"
                  checked={calculator.openDiscount}
                  onCheckedChange={(checked) => {
                    setCalculator((prevState) => ({
                      ...prevState,
                      openDiscount: checked,
                    }));
                  }}
                />
              </div>
              {calculator.openDiscount ? (
                isLoading ? (
                  <Spinner size={13} color="red" />
                ) : (
                  <input
                    name="discountCode"
                    onChange={handleDealChange}
                    value={deals.discountCode}
                    className="px-1 py-1 outline-none border border-black rounded-md w-[80px] text-md"
                  />
                )
              ) : null}
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center  space-x-2">
                <label htmlFor="credits" className="text-sm">
                  Sojourn credits
                </label>
                <Switch
                  id="credits"
                  checked={calculator.openCredits}
                  onCheckedChange={(checked) => {
                    setCalculator((prevState) => ({
                      ...prevState,
                      openCredits: checked,
                    }));
                  }}
                />
              </div>
              {calculator.openCredits ? (
                isLoading ? (
                  <Spinner size={13} color="red" />
                ) : (
                  <input
                    name="credits"
                    onChange={handleDealChange}
                    value={deals.credits}
                    className="px-1 py-1 outline-none border border-black rounded-md w-[80px] text-md"
                  />
                )
              ) : null}
            </div>
            <div className="w-full flex items-center justify-between border-t-2 border-t-secondary py-2">
              <div className="flex flex-col">
                <span className="flex text-sm items-center font-bold">
                  Total
                </span>
                <span>(including taxes & fees)</span>
              </div>
              <div className="text-sm font-inter font-bold">
                {symbol}
                {(
                  estimatedCautionFee +
                  fees.maintenanceFee +
                  estimatedServiceFee +
                  estimatedVat +
                  addOrRemoveDeals +
                  estimatedPrice * howManyNights
                )
                  .toFixed(2)
                  .toLocaleString()}
              </div>
            </div>
            <div className="w-full my-5">
              <p className="leading-[20px]">
                You will be charged in this listing's local currency. A foreign
                exchange rate and fees may be applied by your card issuer at the
                time of billing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
