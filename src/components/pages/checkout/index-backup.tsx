"use client";

import Spinner from "@/components/svgs/Spinner";
import useQueryString from "@/hooks/useQueryString";
import { getPropertyById, pay } from "@/http/api";
import { numberOfNights } from "@/lib/utils";
import { RootState } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import Image from "next/image";
import { useState, MouseEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import PaystackPop from "@paystack/inline-js";
import { PaymentDataType } from "@/types/payments";
import { useRouter } from "next/navigation";
import CryptoCheckout from "./crypto-checkout";
import useCurrency from "@/hooks/useCurrency";

export default ({
  id = "",
  isSubscription = false,
}: {
  id?: string;
  isSubscription?: boolean;
}) => {
  const router = useRouter();

  const userId = useSelector((state: RootState) => state.user?.me.id);

  const { params } = useQueryString();

  const tomorrow = new Date(Date.now() + 86400000);
  const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);

  const city = (params.get("city") as string) ?? "";
  const adults = params.get("number-of-adults")
    ? Number(params.get("number-of-adults"))
    : 1;
  const children = params.get("number-of-children")
    ? Number(params.get("number-of-children"))
    : 0;
  const infants = params.get("number-of-infants")
    ? Number(params.get("number-of-infants"))
    : 0;

  const damageFee = params.get("damage-fee")
    ? Number(params.get("damage-fee"))
    : 0;
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
  const credits = params.get("credits") ? Number(params.get("credits")) : 0;
  const discountCode = params.get("discount-code")
    ? params.get("discount-code")
    : "";

  function onSuccess(parameters: {
    id: number;
    reference: string;
    message: string;
  }) {
    router.push("/dashboard/bookings");
  }

  const mutation = useMutation({
    mutationKey: ["pay-listing-fee"],
    mutationFn: pay,
    onSuccess(data) {
      if (window) {
        const paystackPopup = new PaystackPop();
        paystackPopup.newTransaction({
          accessCode: data.paystackAccessCode,
          onSuccess,
        });
      }
    },
    onError(error: Error) {
      toast("Error completing payment.", {
        description: "Payment error.",
        action: {
          label: "Ok",
          onClick: () => undefined,
        },
      });
    },
  });

  const validCheckInDate = checkInDate ? new Date(checkInDate) : tomorrow;
  const validCheckOutDate = checkOutDate
    ? new Date(checkOutDate)
    : dayAfterTomorrow;

  function makePayment(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const payload: PaymentDataType = {
      propertyId: id,
      userId,
      checkInDate: validCheckInDate,
      checkOutDate: validCheckOutDate,
      numberOfAdults: adults,
      numberOfChildren: children,
      numberOfInfants: infants,
      ...(credits > 0 && { credits: credits }),
      ...(discountCode && { discountCode: discountCode }),
    };
    mutation.mutate(payload);
  }

  const [paymentMethod, setPaymentMethod] = useState<
    "crypto" | "paystack" | null
  >(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["single-property-checkout"],
    queryFn: () => {
      return getPropertyById(id);
    },
  });

  const { exchangeRate, error: currencyError, loading } = useCurrency();

  const currency = useSelector((state: RootState) => state.currency.currency);

  const symbol = currency === "NGN" ? "₦" : "$";

  const estimatedPrice =
    symbol === "$" && data ? data.price / exchangeRate : data ? data.price : 0;

  const numberOfNightsToSpend: number = numberOfNights(
    validCheckInDate,
    validCheckOutDate
  );

  const photoUrl = data ? data.photos[0] : "";
  const firstImageUrl = photoUrl;

  const address = data ? `${data.zip}, ${data.city}` : "";

  const nights = data ? (numberOfNightsToSpend > 1 ? "nights" : "night") : "";

  const cautionFee = data
    ? symbol === "$" && data?.cautionFee
      ? +data?.cautionFee / exchangeRate
      : data?.cautionFee
    : 0;

  const totalCost = data
    ? cautionFee +
      (10 / 100) *
        ((data?.price ? estimatedPrice : 1) * numberOfNightsToSpend) +
      (7.5 / 100) *
        ((data?.price ? estimatedPrice : 1) * numberOfNightsToSpend) -
      credits +
      (data?.price ? estimatedPrice : 1) * numberOfNightsToSpend
    : 0;

  const monthlyChargeMessage = isSubscription
    ? "We automatically bill on the first of each month"
    : "This is a one-time payment for this listing";

  const crpytoChosenCss =
    paymentMethod === "crypto"
      ? "border-[3px] border-primary"
      : " border border-gray-300";
  const paystackChosenCss =
    paymentMethod === "paystack"
      ? "border-[3px] border-primary"
      : " border border-gray-300";

  if (isLoading)
    return (
      <div className="w-full flex flex-col items-center min-h-[88vh] py-10 bg-white px-5 md:px-5 lg:px-20 max-w-[1400px] mx-auto">
        <div className="mt-10">
          <Spinner color="red" size={20} />
        </div>
      </div>
    );

  return (
    <div className="w-full px-4 py-4 md:w-[500px] min-h-[370px] sj-shadow rounded-2xl">
      <h3 className="font-semibold text-lg">Checkout details</h3>
      <p>{monthlyChargeMessage}</p>
      <hr className="my-4" />
      <div className="w-full rounded-2xl px-2 sj-shadow py-2 flex flex-col space-y-2 md:flex-row md:space-y-0 md:justify-between">
        <div className="w-[75%] flex space-x-3 items-center">
          <div className="w-20 h-20 rounded-2xl relative overflow-hidden">
            <Image src={firstImageUrl} alt="property-image" fill />
          </div>
          <div className="w-[70%] flex flex-col">
            <h5 className="font-semibold text-md capitalize truncate">
              {data.title}
            </h5>
            <p className="capitalize m-0 p-0">{address}</p>
            <p className="flex items-center m-0 p-0 space-x-1">
              <span className="font-inter">
                {symbol}
                {Number(estimatedPrice).toFixed(2).toLocaleString()}
              </span>
              <X size={16} />
              <span className="font-inter">{numberOfNightsToSpend}</span>
              <span>{nights}</span>
            </p>
          </div>
        </div>
        <div className="w-[25%] flex items-center flex-row md:flex-col md:space-x-0 md:items-center space-x-1">
          <span className="ml-[90px] md:ml-[0px] font-inter font-bold text-xl">
            {symbol}
            {totalCost.toFixed(2).toLocaleString()}
          </span>
          <p className="text-sm">(fees are included)</p>
        </div>
      </div>
      <div className="w-full justify-between flex items-center my-2">
        <div className="w-1/6 md:w-1/4 h-[1px] bg-gray-200"></div>
        <p>Choose a payment method</p>
        <div className="w-1/6 md:w-1/4 h-[1px] bg-gray-200"></div>
      </div>
      <div className={`w-full flex space-x-2 my-2 rounded-2xl`}>
        <div
          role="button"
          onClick={(e) => {
            setPaymentMethod("crypto");
          }}
          className={`w-1/2 flex flex-col items-center py-2 ${
            paymentMethod === "crypto"
              ? "border-r-[3px] border-r-primary"
              : "border-r border-r-gray-300"
          } ${crpytoChosenCss} rounded-2xl`}
        >
          <div className="w-4/6 h-16 relative overflow-hidden">
            <Image src="/assets/imgs/usdt.svg" alt="tether-usdt-logo" fill />
          </div>
        </div>
        <div
          role="button"
          onClick={(e) => {
            setPaymentMethod("paystack");
          }}
          className={`w-1/2 flex flex-col items-center py-2 ${paystackChosenCss} rounded-2xl`}
        >
          <div className="w-4/6 h-16 relative overflow-hidden">
            <Image
              src="/assets/imgs/paystack.svg"
              alt="tether-usdt-logo"
              fill
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[80px] flex items-end justify-between">
        <button
          onClick={() => {
            router.back();
          }}
          className="flex items-center justify-center px-5 py-2 text-lg rounded-md bg-white border border-gray-300 text-black font-semibold ease duration-300 hover:bg-gray-300"
        >
          Cancel
        </button>
        {paymentMethod === "paystack" ? (
          <button
            disabled={!Boolean(paymentMethod) || paymentMethod !== "paystack"}
            onClick={makePayment}
            className="flex items-center justify-center px-5 py-2 text-lg rounded-md bg-primary text-white font-semibold ease duration-300 hover:bg-red-900 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {mutation.isPending ? (
              <Spinner color="white" size={20} />
            ) : (
              <span>Pay now</span>
            )}
          </button>
        ) : (
          // <CryptoCheckout
          //   paymentMethod={paymentMethod}
          //   data={{
          //     propertyId: id,
          //     userId,
          //     checkInDate: validCheckInDate,
          //     checkOutDate: validCheckOutDate,
          //     numberOfAdults: adults,
          //     numberOfChildren: children,
          //     numberOfInfants: infants,
          //     ...(credits > 0 && { credits: credits }),
          //     ...(discountCode && { discountCode: discountCode }),
          //   }}
          // />
          <></>
        )}
      </div>
    </div>
  );
};
