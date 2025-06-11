"use client";

import CheckoutCalculator from "@/components/property/checkout-calculator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getPropertyById, pay } from "@/http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronLeft, ChevronUp, Wallet } from "lucide-react";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useQueryString from "@/hooks/useQueryString";
import { toast } from "sonner";
import { PaymentDataType } from "@/types/payments";
import useCurrency from "@/hooks/useCurrency";
import CryptoCheckout from "@/components/pages/checkout/crypto-checkout";
import Spinner from "@/components/svgs/Spinner";

export default ({ id }: { id: string }) => {
  const [paymentMethod, setPaymentMethod] = useState<
    "Paystack" | "Crypto (USDTRC20)"
  >("Paystack");

  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ["single-property-checkout"],
    queryFn: () => {
      return getPropertyById(id);
    },
  });

  const userId = useSelector((state: RootState) => state.user?.me.id);

  const { params } = useQueryString();

  const title = data ? data.title : "";

  const address = data ? `${data.zip}, ${data.city}` : "";

  const tomorrow = new Date(Date.now() + 86400000);
  const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);

  const adults = params.get("number-of-adults")
    ? Number(params.get("number-of-adults"))
    : 1;
  const children = params.get("number-of-children")
    ? Number(params.get("number-of-children"))
    : 0;
  const infants = params.get("number-of-infants")
    ? Number(params.get("number-of-infants"))
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
      if (!window) {
        return;
      } else {
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

  const { exchangeRate } = useCurrency();

  const currency = useSelector((state: RootState) => state.currency.currency);

  const symbol = currency === "NGN" ? "₦" : "$";

  const price = data ? data.price : 0;

  const photoUrl = data ? data.photos[0] : "";
  const firstImageUrl = photoUrl;

  const cautionFee = data
    ? symbol === "$" && data?.cautionFee
      ? +data?.cautionFee / exchangeRate
      : data?.cautionFee
    : 0;

  const me = useSelector((state: RootState) => state.user.me);
  const profile = useSelector((state: RootState) => state.user.me.user);

  return (
    <div className="w-full h-screen py-5 md:px-20 md:py-[50px]">
      <button
        onClick={() => {
          router.back();
        }}
        className="flex w-44 items-center justify-start space-x-1 py-2 mb-5 rounded-full cursor-pointer hover:bg-red-50"
      >
        <ChevronLeft size={20} />
        <span className="text-md">Back to property</span>
      </button>
      <div className="w-full grid md:grid-cols-2">
        <div className="hidden md:flex flex-col space-y-5 py-10">
          <h3 className="font-semibold text-xl">Request to book</h3>
          <h4 className="font-semibold text-lg">Booking request details</h4>
          <form className="w-full grid grid-cols-2 gap-4">
            <div className="w-full flex flex-col">
              <label>First Name</label>
              <input
                type="text"
                disabled
                value={me.firstName}
                placeholder="Emma"
                className="w-full py-3 px-2 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
              />
            </div>
            <div className="w-full flex flex-col">
              <label>Last Name</label>
              <input
                type="text"
                disabled
                value={me.lastName}
                placeholder="Watson"
                className="w-full py-3 px-2 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
              />
            </div>
            <div className="w-full flex flex-col">
              <label>Phone</label>
              <input
                type="text"
                placeholder="09077885544"
                disabled
                value={profile?.profile?.primaryPhoneNumber}
                className="w-full py-3 px-2 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
              />
            </div>
            <div className="w-full flex flex-col">
              <label>Email</label>
              <input
                type="text"
                disabled
                value={profile?.email}
                placeholder="james@mail.com"
                className="w-full py-3 px-2 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
              />
            </div>
          </form>
          <h3 className="font-semibold text-xl">Select payment method</h3>
          <DropdownMenu
            open={open}
            onOpenChange={(state) => {
              setOpen(state);
            }}
          >
            <DropdownMenuTrigger className="w-full py-5 px-3 text-md border-2 outline-none border-secondary capitalize hidden md:flex items-center justify-between">
              <div className="flex space-x-2">
                <Wallet size={20} />
                <span>{paymentMethod}</span>
              </div>
              {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full md:w-[620px]">
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="py-4 text-md"
                onClick={() => {
                  setPaymentMethod("Paystack");
                }}
              >
                Paystack
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="py-4 text-md"
                onClick={() => {
                  setPaymentMethod("Crypto (USDTRC20)");
                }}
              >
                Crypto (USDTRC20)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="py-10 border-y-2 border-y-secondary">
            <p>
              Your reservation won’t be confirmed until the Host accepts your
              request (within 24 hours).
            </p>
          </div>
          <div className="w-full flex flex-col py-4 mt-2 space-y-2 border-b-2 border-b-secondary">
            <h4 className="text-[20px] font-semibold">Cancellation Policy</h4>
            <p>Free cancellations up until 48hrs before booking date</p>
            <p>
              Reviews the Host's full{" "}
              <Link
                href="/terms-of-use#refund-policy"
                className="font-bold underline text-primary"
              >
                Cancellation Policy
              </Link>
            </p>
          </div>
          <div className="w-full flex flex-col my-5 space-y-5 py-5">
            <h4 className="text-primary text-lg font-semibold">
              Review important details about this home
            </h4>
            <p>
              By selecting the button below, I agree to the{" "}
              <span className="font-semibold text-primary">
                Host's House Rules
              </span>
              ,
              <span className="font-semibold text-primary">
                Ground rules for guests
              </span>
              , Sojourn Rebooking and{" "}
              <Link
                href="/terms-of-use#refund-policy"
                className="font-bold underline text-primary"
              >
                Refund Policy
              </Link>
              , and that Sojourn can charge my payment method if I’m responsible
              for damage. I agree to pay the total amount shown if the Host
              accepts my booking request.
            </p>

            {paymentMethod === "Paystack" ? (
              <button
                disabled={
                  !Boolean(paymentMethod) ||
                  paymentMethod !== "Paystack"
                }
                onClick={makePayment}
                className="w-full md:w-1/2 flex items-center justify-center text-center text-white bg-primary py-5 rounded-full"
              >
                {mutation.isPending ? (
                  <Spinner color="white" size={20} />
                ) : (
                  <span>Request to book</span>
                )}
              </button>
            ) : (
              <CryptoCheckout
                paymentMethod={paymentMethod}
                data={{
                  propertyId: id,
                  userId,
                  checkInDate: validCheckInDate,
                  checkOutDate: validCheckOutDate,
                  numberOfAdults: adults,
                  numberOfChildren: children,
                  numberOfInfants: infants,
                  ...(credits > 0 && { credits: credits }),
                  ...(discountCode && { discountCode: discountCode }),
                }}
              />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col items-center md:py-10">
          <CheckoutCalculator
            propertyId={id}
            address={address}
            title={title}
            price={price}
            children={children}
            propertyImage={firstImageUrl}
            infants={infants}
            adults={adults}
            checkInDate={checkInDate as Date}
            checkOutDate={checkOutDate as Date}
            cautionFee={cautionFee}
          />
          <div className="w-full px-4 py-5 space-y-5 block md:hidden ">
            <h3 className="font-semibold text-xl">Select payment method</h3>
            <DropdownMenu
              open={openMobile}
              onOpenChange={(state) => {
                setOpenMobile(state);
              }}
            >
              <DropdownMenuTrigger className="w-full relative py-5 px-3 text-md border-2 outline-none border-secondary capitalize flex md:hidden items-center justify-between">
                <div className="flex space-x-2">
                  <Wallet size={20} />
                  <span>{paymentMethod}</span>
                </div>
                {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px]">
                <DropdownMenuItem
                  className="py-4 text-md"
                  onClick={() => {
                    setPaymentMethod("Paystack");
                  }}
                >
                  Paystack
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-4 text-md"
                  onClick={() => {
                    setPaymentMethod("Crypto (USDTRC20)");
                  }}
                >
                  Crypto (USDTRC20)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <h4 className="text-primary text-lg font-semibold ">
              Review important details about this home
            </h4>
            <p>
              By selecting the button below, I agree to the{" "}
              <span className="font-semibold text-primary">
                Host's House Rules
              </span>
              ,
              <span className="font-semibold text-primary">
                Ground rules for guests
              </span>
              , Sojourn Rebooking and{" "}
              <Link
                href="/terms-of-use#refund-policy"
                className="font-bold underline text-primary"
              >
                Refund Policy
              </Link>
              , and that Sojourn can charge my payment method if I’m responsible
              for damage. I agree to pay the total amount shown if the Host
              accepts my booking request.
            </p>
          </div>
          <div className="w-full flex relative shadow-t-lg bg-paper sticky bottom-0 overflow-hidden md:hidden px-5 flex-col space-y-5 py-5">
            {paymentMethod === "Paystack" ? (
              <button
                disabled={
                  !Boolean(paymentMethod) ||
                  paymentMethod !== "Paystack"
                }
                onClick={makePayment}
                className="w-full md:w-1/2 flex items-center justify-center text-center text-white bg-primary py-5 rounded-full"
              >
                {mutation.isPending ? (
                  <Spinner color="white" size={20} />
                ) : (
                  <span>Request to book</span>
                )}
              </button>
            ) : (
              <CryptoCheckout
                paymentMethod={paymentMethod}
                data={{
                  propertyId: id,
                  userId,
                  checkInDate: validCheckInDate,
                  checkOutDate: validCheckOutDate,
                  numberOfAdults: adults,
                  numberOfChildren: children,
                  numberOfInfants: infants,
                  ...(credits > 0 && { credits: credits }),
                  ...(discountCode && { discountCode: discountCode }),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
