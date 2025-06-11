"use cleint";

import { DialogTitle } from "@/components/ui/dialog";
import { Check, Clock, Copy } from "lucide-react";
import { useState } from "react";
import QRCode from "react-qr-code";
import Image from "next/image";

export default ({
  cryptoPaymentAddress,
  holdingWindow,
  cryptoPaymentAmount,
}: {
  cryptoPaymentAddress: string;
  holdingWindow: Date;
  cryptoPaymentAmount?: number;
}) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="w-auto flex flex-col justify-center items-center space-y-2 bg-primary">
      <DialogTitle className="text-center">Scan the QR Code</DialogTitle>
      <>
        <div className="w-full flex items-center justify-center space-x-1 mt-3">
          <Image
            src="/assets/logo/soj_white.svg"
            alt="sojourn_logo"
            width={30}
            height={30}
            priority
          />
          <span className="text-white font-semibold text-lg">Sojourn</span>
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
              {cryptoPaymentAmount}
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
              value={cryptoPaymentAddress}
            />
          </div>

          <p className="text-md text-white font-bold">OR COPY ADDRESS BELOW</p>
          {copied ? (
            <div className="w-full flex items-center justify-center space-x-1">
              <Check size={20} color="white" />
              <span className="text-white">copied!</span>
            </div>
          ) : null}
          <div
            role="button"
            onClick={async () => {
              await navigator.clipboard.writeText(cryptoPaymentAddress);
              setCopied(true);
            }}
            className="w-full cursor-pointer flex items-center justify-center space-x-2"
          >
            <p className="text-[14px] p-1 px-2 bg-white rounded-md font-bold">
              {cryptoPaymentAddress}
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
                {holdingWindow.toTimeString()}
              </span>
            </div>
          </div>
          <p className="text-md font-bold text-md text-white">
            Please do not leave this page.
          </p>
        </div>
      </>
    </div>
  );
};
