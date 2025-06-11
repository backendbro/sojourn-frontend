"use client";

import Spinner from "@/components/svgs/Spinner";
import { getWalletPayentById } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface WalletViewerProps {
  id: string;
}

export default ({ id }: WalletViewerProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["wallet-payment"],
    queryFn: () => getWalletPayentById(id),
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner size={17} color="red" />
      </div>
    );
  }

  return (
    <div className="w-full p-2 space-y-2">
      <div className="w-full flex flex-col border-b border-gray-200 py-2">
        <h4 className="font-semibold text-2xl">Payment Details</h4>
        <h5 className="font-semibold mt-5">Reference number</h5>
        <div
          role="button"
          onClick={() => {
            navigator.clipboard.writeText(data.paymentReference);
            toast("Host response", {
              description: `reference number copied.`,
              action: {
                label: "Ok",
                onClick: () => console.log("Ok"),
              },
            });
          }}
          className="w-full md:max-w-[360px] p-2 cursor-pointer flex items-center space-x-1 ease duration-300 hover:bg-gray-100"
        >
          <p className="uppercase text-sm font-inter">
            soj-{data.paymentReference}
          </p>
          <Copy size={17} />
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2 gap-3">
        <div className="flex flex-col space-y-2">
          <h5 className="font-semibold">Transaction Details</h5>
          <ul className="w-full overflow-x-hidden space-y-1">
            <li className="w-full space-x-1">
              <span>Payment type:</span>
              <span className="font-semibold">{data.paymentType}</span>
            </li>
            <li className="w-full space-x-1">
              <span>Payment method:</span>
              <span className="font-semibold">{data.paymentMethod}</span>
            </li>
            <li className="w-full space-x-1">
              <span>Amount:</span>
              <span className="font-semibold">₦{data.amount}</span>
            </li>
            {data?.transactionFee ? (
              <li className="w-full space-x-1">
                <span>Transaction fee:</span>
                <span className="font-semibold">₦{data.transactionFee}</span>
              </li>
            ) : null}
            {data?.vat ? (
              <li className="w-full space-x-1">
                <span>VAT:</span>
                <span className="font-semibold">₦{data.vat}</span>
              </li>
            ) : null}
            <li className="w-full space-x-1">
              <span>Transaction date:</span>
              <span className="font-semibold">{data.date}</span>
            </li>
          </ul>
          <div className="w-full flex flex-col">
            <h5 className="text-sm font-semibold">Description</h5>
            <p className="text-sm">{data.description}</p>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-2 border-l border-l-gray-200 md:pl-4">
          {data.email ? (
            <>
              <h5 className="font-semibold">Guest Details</h5>
              <ul className="w-full overflow-x-hidden">
                <li className="w-full space-x-1">
                  <span>First Name:</span>
                  <span className="font-semibold">{data.firstName}</span>
                </li>
                <li className="w-full space-x-1">
                  <span>Last Name:</span>
                  <span className="font-semibold">{data.lastName}</span>
                </li>
              </ul>
            </>
          ) : (
            ""
          )}
          {data?.propertyTitle ? (
            <div className="w-full flex flex-col space-y-2">
              <h5 className="font-semibold">Property Details</h5>
              <ul className="w-full overflow-x-hidden">
                <li className="w-full space-x-1">
                  <span>Property title:</span>
                  <span className="font-semibold">{data.propertyTitle}</span>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
