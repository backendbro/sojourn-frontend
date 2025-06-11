"use client";

import Spinner from "@/components/svgs/Spinner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { payWithCrypto, verifyCryptoPayment } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Check, CheckCircle, Clock, Copy, Frown } from "lucide-react";
import { PaymentDataType } from "@/types/payments";
import Image from "next/image";
import { AxiosError } from "axios";

type CrptoType = {
  paymentAddress: string;
  amount: string;
  currency: string;
  paymentId: string;
  status: "loading" | "stopped";
};

export default ({
  paymentMethod,
  data,
}: {
  paymentMethod: "Select" | "Credit or Debit Card" | "Crypto (USDTRC20)";

  data: PaymentDataType;
}) => {
  const router = useRouter();

  const [countDown, setCountDown] = useState(30);

  const [message, setMessage] = useState("");

  const [updated, setUpdated] = useState("");

  const [closeModalWithBarcode, setCloseModalWithBarcode] = useState(false);

  const [cryptoError, setCryptoError] = useState("");

  const [open, setOpen] = useState(false);

  const [copied, setCopied] = useState(false);

  const [cryptoState, setCryptoState] = useState<CrptoType>({
    paymentAddress: "",
    amount: "",
    paymentId: "",
    currency: "",
    status: "stopped",
  });

  const cryptoMutation = useMutation({
    mutationKey: ["crypto-payment"],
    mutationFn: payWithCrypto,
    onSuccess(data) {
      setCryptoState({ status: "stopped", ...data });
    },
    onError(error: AxiosError) {
      setCryptoError(
        (error?.response?.data as unknown as { message: string }).message
      );
    },
  });

  function makeCryptoPayment() {
    const payload: PaymentDataType = data;
    setCryptoState((prev) => ({ ...prev, status: "stopped" }));
    cryptoMutation.mutate(payload);
  }

  const poll = async (paymentId: string) => {
    try {
      const response = await verifyCryptoPayment(paymentId);
      if (response.data.status === "finished") {
        setUpdated(response.data.status);
        setMessage("Done");
        setTimeout(() => {
          router.push("/dashboard/bookings");
        }, 3000);
      } else if (response.data.status != "finished") {
        setTimeout(() => {
          poll(paymentId);
        }, 5000);
      } else {
        return;
      }
    } catch (error) {
      setMessage("an error occured. please try again");
    }
  };

  const clearState = () => {
    setCryptoState({
      paymentAddress: "",
      amount: "",
      paymentId: "",
      status: "stopped",
      currency: "",
    });
  };

  useEffect(() => {
    if (cryptoState.status === "loading") {
      makeCryptoPayment();
    }
  }, [cryptoState.status]);

  useEffect(() => {
    if (cryptoState.paymentAddress) {
      poll(cryptoState.paymentId);
      const interval = setInterval(() => {
        setCountDown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 60000);
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [cryptoState.paymentAddress]);

  useEffect(() => {
    if (countDown <= 1) {
      setMessage("Your payment window has expired.");
      clearState();
      setTimeout(() => {
        router.back();
      }, 2000);
    }
  }, [countDown]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen((prev) => {
          if (!!cryptoState.paymentAddress && countDown > 1) {
            return true;
          } else {
            return value;
          }
        });
      }}
    >
      <DialogTrigger
        onClick={() => {
          setCryptoState((prevSttate) => ({
            ...prevSttate,
            status: "loading",
          }));
        }}
        disabled={
          !Boolean(paymentMethod) || paymentMethod !== "Crypto (USDTRC20)"
        }
        // className="flex items-center justify-center px-5 py-2 text-lg rounded-md bg-primary text-white font-semibold ease duration-300 hover:bg-red-900 disabled:cursor-not-allowed disabled:bg-gray-300"
        className="w-full md:w-1/2 text-center text-white bg-primary py-5 rounded-full"
      >
        <span>Request to book</span>
      </DialogTrigger>
      <DialogContent className="w-auto bg-primary h-auto rounded-xl">
        {message === "Your payment window has expired." ? (
          <div className="w-full flex flex-col items-center">
            <Frown color="#FFFFFF" size={60} />
            <p className="text-center text-lg font-[500]">{message}</p>
          </div>
        ) : null}
        {message === "Done" ? (
          <div className="w-full flex flex-col items-center">
            <CheckCircle color="#FFFFFF" size={60} />
            <p className="text-center text-lg font-[500]">payment completed</p>
            <p className="text-center text-lg font-[500]">
              You are being redirected....
            </p>
          </div>
        ) : (
          <>
            {!cryptoMutation.isPending ? (
              cryptoState.paymentAddress ? (
                <>
                  <div className="w-full flex items-center justify-center space-x-1 mt-3">
                    <Image
                      src="/assets/logo/soj_white.svg"
                      alt="sojourn_logo"
                      width={30}
                      height={30}
                      priority
                    />
                    <span className="text-white font-semibold text-lg">
                      Sojourn
                    </span>
                  </div>
                  <div className="w-full flex items-center justify-center my-3">
                    <DialogTitle className="text-center text-white font-bold">
                      SCAN TO MAKE PAYMENT
                    </DialogTitle>
                  </div>
                  <div className="w-auto flex flex-col items-center space-y-2">
                    <div className="w-full space-x-[1px] flex items-center justify-center">
                      <span className="font-bold text-2xl text-white">$</span>
                      <span className="font-inter font-bold text-2xl text-white">
                        {cryptoState.amount}
                      </span>
                      <span className="font-semibold font-inter uppercase text-white">
                        {/* ({cryptoState.currency}) */}
                        (TRC20)
                      </span>
                    </div>
                    <div className="p-2 bg-white p-[15px] h-[200px] w-[200px] rounded-xl flex items-center justify-center">
                      <QRCode
                        role="button"
                        className="cursor-pointer h-full w-full"
                        value={cryptoState.paymentAddress}
                      />
                    </div>

                    <p className="text-md text-white font-bold">
                      OR COPY ADDRESS BELOW
                    </p>
                    {copied ? (
                      <div className="w-full flex items-center justify-center space-x-1">
                        <Check size={20} color="white" />
                        <span className="text-white">copied!</span>
                      </div>
                    ) : null}
                    <div
                      role="button"
                      onClick={async () => {
                        await navigator.clipboard.writeText(
                          cryptoState.paymentAddress
                        );
                        setCopied(true);
                      }}
                      className="w-full cursor-pointer flex items-center space-x-2"
                    >
                      <p className="text-[14px] p-1 px-2 bg-white rounded-md font-bold">
                        {cryptoState.paymentAddress}
                      </p>
                      <span className="bg-white p-2 rounded-md">
                        <Copy size={22} color="orangered" fill="orangered" />
                      </span>
                    </div>
                    <div className="w-full flex items-center justify-between py-4">
                      <div className="text-md text-white font-bold">
                        Waiting for confirmation
                      </div>
                      <div className="flex space-x-1 items-center text-white font-bold">
                        <Clock size={17} color="white" />
                        <span className="font-inter text-md text-white font-bold">
                          {countDown}
                        </span>
                        mins left....
                      </div>
                    </div>
                    <p className="text-md font-bold text-md text-white">
                      Please do not leave this page.
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-md text-white">{cryptoError}</p>
              )
            ) : (
              <div className="w-full flex justify-center">
                <Spinner color="white" size={30} />
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
