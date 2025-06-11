"use client";

import Spinner from "@/components/svgs/Spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getBookingById } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { Download, X, Copy } from "lucide-react";
import { Dispatch, SetStateAction, MouseEvent } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import Image from "next/image";
import { numberOfNights } from "@/lib/utils";

type ViewProps = {
  bookingId: string;
  hostId?: string;
  index?: number;
  setOpen: Dispatch<SetStateAction<boolean[]>>;
};

export default ({ bookingId, setOpen, index = 0 }: ViewProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBookingById(bookingId),
    refetchOnReconnect: true,
  });

  const downloadReceipt = async (e: MouseEvent<HTMLButtonElement>) => {
    const canvas = await html2canvas(
      document.getElementById("host-booking-receipt") as HTMLElement
    );
    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imageData, "PNG", 0, 0, width, height);
    pdf.save(`${data.guestName}-${new Date().toLocaleDateString()}.pdf`);
  };

  let statusStyle = "";
  switch (data?.status) {
    case "in-progress":
      statusStyle = "bg-green-100 text-green-800";
      break;
    case "cancelled":
      statusStyle = "bg-red-100 text-red-800";
      break;
    case "confirmed":
      statusStyle = "bg-blue-100 text-blue-800";
      break;
    case "completed":
      statusStyle = "bg-slate-100 text-gray-800";
      break;
    default:
      statusStyle = "bg-amber-100 text-amber-800";
      break;
  }

  if (isLoading)
    return (
      <div className="w-full min-h-[200px] flex items-center justify-center">
        <Spinner color="red" size={17} />
      </div>
    );

  return (
    <div className="w-full min-h-[200px] px-2 sm:px-4 py-2 max-h-[500px] overflow-y-scroll">
      <div className="w-full flex flex-col border-b-[1.3px] border-b-gray-200">
        <div className="w-full flex items-center justify-between">
          <h3 className="font-semibold text-xl">Booking Details</h3>
          {/* <div className="flex items-center space-x-2">
            <button
              onClick={downloadReceipt}
              className="outline-none border-0 cursor-pointer p-2 ease duration-300 hover:bg-gray-200"
            >
              <Download size={17} />
            </button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    role="button"
                    onClick={(e) => {
                      setOpen((prevState) => {
                        const state = [...prevState];
                        state[index] = false;
                        return state;
                      });
                    }}
                    className="cursor-pointer p-2 ease duration-300 hover:bg-gray-100"
                  >
                    <X size={17} />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white">
                  close
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div> */}
        </div>
        <div className="pt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={() => {
                  navigator.clipboard.writeText(data.bookingReference);
                  toast(<div className="text-lg">Copied!</div>);
                }}
                asChild
                className="cursor-pointer p-2 ease duration-300 hover:bg-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <div className="text-sm sm:text-xs uppercase font-inter">
                    SOJ-{data.bookingReference}
                  </div>
                  <span>
                    <Copy size={17} />
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-white font-inter">
                {data.bookingReference}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="w-full flex items-center space-x-2 py-6">
          <span className="text-gray-400">Status:</span>
          <div className={`px-4 py-1 rounded-full text-xs ${statusStyle}`}>
            <span>{data.status}</span>
          </div>
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2">
        <div className="w-full flex flex-col  pr-2 py-2 space-y-4 border-r border-r-gray-200">
          <h5 className="font-semibold">Details</h5>
          <ul className="overflow-hidden space-y-2 pb-2">
            <li className="w-full grid grid-cols-2">
              <span className="text-gray-500">Booking Date:</span>
              <span className="capitalize justify-self-start">
                {new Date(data.paymentDate).toDateString()}
              </span>
            </li>
            <li className="w-full flex items-center">
              <Image
                src={data.photo}
                alt="booking_propery_image"
                width={200}
                height={200}
                className="rounded-md"
              />
            </li>
            <li className="w-full grid grid-cols-2">
              <span className="text-gray-500">Property:</span>
              <span className="capitalize justify-self-start">
                {data.propertyTitle}
              </span>
            </li>
            <li className="w-full grid grid-cols-2">
              <span className="text-gray-500">Guest Name:</span>
              <span className="capitalize justify-self-start">
                {data.guestName}
              </span>
            </li>

            <li className="w-full  grid grid-cols-2">
              <span className="text-gray-500">Location:</span>
              <span className="capitalize justify-self-start">
                {data.location}
              </span>
            </li>
            <li className="w-full  grid grid-cols-2">
              <span className="text-gray-500 justify-self-start">
                Host Name:
              </span>
              <span>{data.contactName}</span>
            </li>
            <li className="w-full  grid grid-cols-2">
              <span className="text-gray-500 justify-self-start">
                Host email:
              </span>
              <span>{data.contactEmail}</span>
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col  md:pl-5 py-2 space-y-4">
          <div className="w-full flex flex-col space-y-4 border-b border-b-gray-200 pb-5">
            <h5 className="font-semibold">Reservation</h5>
            <ul className="overflow-hidden space-y-2 pb-2">
              <li className="w-full  grid grid-cols-2">
                <span className="text-gray-500">Check in:</span>
                <span className="capitalize justify-self-start">
                  {data.checkInDate}
                </span>
              </li>
              <li className="w-full  grid grid-cols-2">
                <span className="text-gray-500">Check Out:</span>
                <span className="capitalize justify-self-start">
                  {data.checkOutDate}
                </span>
              </li>

              <li className="w-full  grid grid-cols-2">
                <span className="text-gray-500">Nights:</span>
                <span className="capitalize justify-self-start">
                  {numberOfNights(
                    new Date(data.checkInDate),
                    new Date(data.checkOutDate)
                  )}
                </span>
              </li>
            </ul>
            <h5 className="font-semibold">People</h5>
            <ul className="overflow-hidden space-y-2">
              <li className="w-full  grid grid-cols-2">
                <span className="text-gray-500">Adults:</span>
                <span className="capitalize justify-self-start">
                  {data.numberOfAdults}
                </span>
              </li>
              <li className="w-full  grid grid-cols-2">
                <span className="text-gray-500">Chidren:</span>
                <span className="capitalize justify-self-start">
                  {+data.numberOfChildren === 0 ? "No" : data.numberOfChildren}
                </span>
              </li>
              <li className="w-full  grid grid-cols-2">
                <span className="text-gray-500">Infants:</span>
                <span className="capitalize justify-self-start">
                  {+data.numberOfInfants === 0 ? "No" : data.numberOfInfants}
                </span>
              </li>
            </ul>
            <ul className="overflow-hidden space-y-2">
              <li className="w-full  grid grid-cols-2">
                <span className="text-gray-500">Price per night:</span>
                <span className="font-inter justify-self-start">
                  ₦{(data.priceOfProperty as number).toFixed(2)}
                </span>
              </li>
              <li className="w-full  grid grid-cols-2">
                <span className="text-gray-500">Service Fee:</span>
                <span className="font-inter justify-self-start">
                  ₦{(data?.serviceFee as number).toFixed(2)}
                </span>
              </li>
              {data?.credits ? (
                <li className="w-full  grid grid-cols-2">
                  <span className="text-gray-500">Credits:</span>
                  <span className="font-inter justify-self-start">
                    ₦{(data?.credits as number).toFixed(2)}
                  </span>
                </li>
              ) : null}
              <li className="w-full  grid grid-cols-2">
                <span className="text-gray-500">Vat:</span>
                <span className="font-inter justify-self-start">
                  ₦{(data?.vat as number).toFixed(2)}
                </span>
              </li>
              <li className="w-full  grid grid-cols-2">
                <span className="text-gray-500">Payment Method:</span>
                <span className="justify-self-start">{data.paymentMethod}</span>
              </li>
              <li className="w-full  grid grid-cols-2">
                <span className="text-gray-500">Payment date:</span>
                <span className="justify-self-start">
                  {new Date(data.paymentDate).toDateString()}
                </span>
              </li>
            </ul>
          </div>
          <div className="w-full flex flex-col space-y-2">
            <ul className="overflow-hidden space-y-2 pb-2">
              <li className="w-full grid grid-cols-2">
                <span className="font-inter ">Total:</span>
                <span className="font-inter justify-self-start">
                  ₦{(data.total as number).toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
