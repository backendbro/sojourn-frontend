"use client";

import Spinner from "@/components/svgs/Spinner";
import useQueryString from "@/hooks/useQueryString";
import {
  getPropertyById,
  pay,
  paySubscription,
  upgradeSubscription,
} from "@/http/api";
import { numberOfNights } from "@/lib/utils";
import { RootState } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import Image from "next/image";
import { useState, MouseEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import PaystackPop from "@paystack/inline-js";
import { PaymentDataType, SubscriptionPaymentDataType } from "@/types/payments";
import { useRouter } from "next/navigation";
import { PLANS } from "@/constants";
import useCurrency from "@/hooks/useCurrency";

export default ({
  id,
  isSubscription = false,
}: {
  id: string;
  isSubscription?: boolean;
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.user?.loggedIn);

  const router = useRouter();

  const hostId = useSelector((state: RootState) => state.user.me?.host?.id);

  const { params } = useQueryString();

  const upgrade = params.get("upgrade") ? true : false;

  function onSuccess(parameters: {
    id: number;
    reference: string;
    message: string;
  }) {
    router.push("/hosts/dashboard/my-plan");
  }

  const mutation = useMutation({
    mutationKey: ["pay-listing-fee"],
    mutationFn: upgrade ? upgradeSubscription : paySubscription,
    onSuccess(data) {
      if (window) {
        const paystackPopup = new PaystackPop();
        paystackPopup.newTransaction({
          accessCode: data.accessCode,
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

  const name = params.get("name") ? (params.get("name") as string) : "";
  const type = params.get("type") ? (params.get("type") as string) : "";
  const price = params.get("price") ? Number(params.get("price")) : 0;

  const { exchangeRate, error: currencyError, loading } = useCurrency();

  const currency = useSelector((state: RootState) => state.currency.currency);

  const symbol = currency === "NGN" ? "₦" : "$";

  const estimatedPrice = symbol === "$" ? price / exchangeRate : price;

  function makePayment(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const payload: SubscriptionPaymentDataType = {
      planId: id,
      amount: price,
      planName: name,
      hostId,
    };

    mutation.mutate(payload);
  }

  const [paymentMethod, setPaymentMethod] = useState<
    "crypto" | "paystack" | null
  >(null);

  const photoUrl = "/assets/imgs/payment.png";
  const firstImageUrl = photoUrl;

  const monthlyChargeMessage = isSubscription
    ? "We automatically bill on the first of each month"
    : "This is a one-time payment for this listing";

  const paystackChosenCss =
    paymentMethod === "paystack"
      ? "border-[3px] border-primary"
      : " border border-gray-300";

  return (
    <div className="w-full px-4 py-4 md:w-[500px] min-h-[370px] sj-shadow rounded-2xl">
      <h3 className="font-semibold text-lg">Checkout details</h3>
      <p>{monthlyChargeMessage}</p>
      <hr className="my-4" />
      <div className="w-full rounded-2xl px-2 sj-shadow py-2 flex flex-col space-y-2 md:flex-row md:space-y-0 md:justify-between">
        <div className="flex space-x-3 items-center">
          <div className="w-20 h-20 rounded-2xl relative overflow-hidden">
            <Image src={firstImageUrl} alt="property-image" fill />
          </div>
          <div className="w-auto flex flex-col">
            <h5 className="font-semibold text-md capitalize">{name}</h5>
            <p className="capitalize m-0 p-0">{type}</p>
            <p className="flex items-center m-0 p-0 space-x-1">
              <span className="font-inter">
                {symbol}
                {Number(estimatedPrice).toFixed(2).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center flex-row md:flex-col md:space-x-0 md:items-end space-x-1 ">
          <span className="ml-[90px] md: ml-[0px] font-inter font-bold text-xl">
            {symbol}
            {estimatedPrice.toFixed(2).toLocaleString()}
          </span>
          <p className="text-sm">(fees are included)</p>
        </div>
      </div>
      <div className="w-full justify-between flex items-center my-2">
        <div className="w-1/6 md:w-1/4 h-[1px] bg-gray-200"></div>
        <p>Choose a payment method</p>
        <div className="w-1/6 md:w-1/4 h-[1px] bg-gray-200"></div>
      </div>
      <div className={`w-full flex justify-center my-2 rounded-2xl`}>
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
          <></>
        )}
      </div>
    </div>
  );
};
