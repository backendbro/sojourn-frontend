"use client";

import Spinner from "@/components/svgs/Spinner";
import { getTicketMessages, sendMessage } from "@/http/api";
import { RootState } from "@/store";
import { MessageType } from "@/types/messages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, SendHorizonal, X } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { numberOfNights } from "@/lib/utils";

export default ({ id }: { id: string }) => {
  const hostId = useSelector((state: RootState) => state.user.me?.host?.id);

  const client = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["ticket-messages-host"],
    queryFn: () => getTicketMessages(id),
  });

  const mutation = useMutation({
    mutationKey: ["send-message-host"],
    mutationFn: sendMessage,
    async onSuccess() {
      await client.invalidateQueries({
        queryKey: ["ticket-messages-host"],
      });
    },

    onError() {
      toast("Failed to send message", {
        description: message,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const [message, setMessage] = useState<string>("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message) {
      toast("Chat system message", {
        description: "Message cannot be empty.",
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    } else {
      mutation.mutate({
        ticketId: id,
        hostId,
        message,
        senderId: hostId,
        userId: data.userId,
      } as MessageType);
      setMessage("");
    }
  }

  const handleEnterKeySubmit = (e: KeyboardEvent) => {
    e.preventDefault();
    if (!message && e.key === "Enter") {
      toast("Chat system message.", {
        description: "message cannot be empty",
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
      return;
    }
    if (e.key === "Enter") {
      mutation.mutate({
        ticketId: id,
        hostId,
        message,
        senderId: hostId,
        userId: data.userId,
      } as MessageType);
      setMessage("");
    }
  };

  const [openBooking, setOpenBooking] = useState(true);

  const hostPhotoUrl = data ? data.userPhoto : "";
  const userPhoto = hostPhotoUrl;

  const photoUrl = data && data.propertyPhoto ? data.propertyPhoto : "";
  const propertyPhoto = photoUrl;

  const bookingOrListing =
    data && data.bookingCheckInDate ? "Reservation" : "Listing";

  const messagesBoxWidth = openBooking ? "w-[70%]" : "w-full";
  const bookingBoxWidth = openBooking ? "w-[30%]" : "w-[0px]";

  useEffect(() => {
    async function retry() {
      await client.invalidateQueries({ queryKey: ["ticket-messages-host"] });
    }
    retry();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-10 bg-white px-5 md:px-5 lg:px-20">
        <Spinner size={17} color="red" />
      </div>
    );
  }

  return (
    <div className="w-full flex relative">
      <div
        className={`${messagesBoxWidth} md:h-[calc(100vh-280px)] lg:h-[calc(100vh-222px)] translate-z-0 ease duration-300`}
      >
        <div className="w-full flex-col h-full">
          <div className="w-full flex flex-col items-center">
            <div className="w-full border-b  border-b-gray-300 py-2 px-3 font-semibold capitalize flex items-center space-x-3 md:space-x-0 md:justify-between">
              <div className="w-1/2 md:w-1/2 flex items-center space-x-2">
                <div className="cursor-pointer flex w-[45px] h-[45px] items-center bg-gray-200 rounded-full overflow-hidden relative flex items-center justify-center">
                  {userPhoto ? (
                    <Image
                      src={userPhoto}
                      alt="person_placeholder"
                      fill
                      priority
                    />
                  ) : (
                    <Image
                      src="/assets/icons/person-placeholder.png"
                      alt="person_placeholder"
                      width={23}
                      height={23}
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-xl">
                    {data.guestFullName}
                  </span>
                </div>
              </div>
              {!openBooking ? (
                <button
                  onClick={() => {
                    setOpenBooking((prevState) => !prevState);
                  }}
                  className="bg-primary text-xs text-white font-semibold py-2 px-4 rounded-full"
                >
                  Show {bookingOrListing}
                </button>
              ) : null}
            </div>
            <div className="w-5/6 mt-1 p-2 bg-paper rounded-md">
              <p className="text-xs font-semibold text-black text-center">
                {data.title}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col h-full space-y-2  overflow-y-scroll pb-10 pt-5 px-5">
            {data.messages.map(
              (
                m: {
                  host: boolean;
                  message: string;
                  date: string;
                  time: string;
                },
                idx: number
              ) => {
                return (
                  <div key={idx}>
                    {m.host && (
                      <div className="w-full flex items-center justify-end">
                        <div className="min-w-[100px] max-w-[350px] md:max-w-[500px]  py-2 px-4 flex-col bg-[#3F3F3F] space-y-1 rounded-md">
                          <span className="text-[#F7F7F7] font-bold">You</span>
                          <p className="text-[14px] text-[#F7F7F7] font-semibold">
                            {m.message}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="font-inter text-[#F7F7F7] text-[10px]">
                              {m.date}
                            </span>
                            <span className="font-inter  text-[#F7F7F7] text-[10px]">
                              {m.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {!m.host && (
                      <div className="w-full flex items-center justify-start">
                        <div className="min-w-[100px] max-w-[350px] md:max-w-[500px]  py-2 px-4 flex-col bg-[#F7F7F7] space-y-1 rounded-md">
                          <span className="text-[#3F3F3F] font-bold">
                            {data.guestFullName}
                          </span>
                          <p className="text-[14px] font-semibold text-[#3F3F3F]">
                            {m.message}
                          </p>
                          <div className="w-full flex items-center space-x-2">
                            <span className="font-inter text-[10px] text-[#3F3F3F]">
                              {m.date}
                            </span>
                            <span className="font-inter text-[10px] text-[#3F3F3F]">
                              {m.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
          <form
            onSubmit={onSubmit}
            className="w-full h-[55px] flex items-center p-2 bottom-0 border border-gray-400 rounded-md bg-transparent"
          >
            <textarea
              onKeyUp={handleEnterKeySubmit}
              value={message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                if (e.target.value === "\n") return;
                setMessage(
                  (e as ChangeEvent<HTMLTextAreaElement>).target.value
                );
              }}
              className="w-[85%] md:w-[92%] px-3 py-2 h-full  overflow-hidden  font-semibold resize-none outline-none"
              placeholder="type your message here..."
            />
            <button
              disabled={!message}
              className="w-[15%] md:w-[8%] p-3 h-full outline-none rounded-l-full  flex items-center justify-center"
            >
              {mutation.isPending ? (
                <Spinner color="white" size={28} />
              ) : (
                <span>
                  <SendHorizonal
                    size={28}
                    strokeWidth={3}
                    className="stroke-primary"
                  />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
      <div
        className={`${bookingBoxWidth} flex flex-col overflow-hidden h-auto ease duration-300 pt-2 border-l border-l-gray-300`}
      >
        <div className="w-full flex items-center justify-between  px-2 py-3 border-b border-b-gray-200">
          <h3 className="text-xl pl-3">{bookingOrListing}</h3>
          <button
            className="outline-none border-0 rounded-md bg-gray-100 p-1"
            onClick={() => {
              setOpenBooking(false);
            }}
          >
            <X size={15} color="black" />
          </button>
        </div>
        <div className="w-full flex flex-col">
          <Link
            href={`/properties/${data.propertyId}`}
            target="_blank"
            className="font-semibold text-md block"
          >
            {propertyPhoto ? (
              <div className="w-full rounded-md oveflow-hidden relative h-[150px]">
                <div className="absolute bg-black opacity-40 w-full h-full top-0 left-0 z-10 ease duration-300 hover:opacity-20"></div>
                <div className="absolute px-3 py-2  top-4 left-4 z-50  isolate rounded-full bg-gray-200 shadow-md font-bold  text-xs">
                  View Listing
                </div>
                <Image src={propertyPhoto} alt="property_photo" fill priority />
              </div>
            ) : null}
          </Link>
          {!data.bookingCheckInDate ? (
            <div className="w-full flex flex-col  p-3  pl-6 border-b border-b-gray-200 space-y-2">
              <h5 className="font-semibold text-md"> Staying at</h5>
              <div className="capitalize">{data.propertyTitle}</div>
            </div>
          ) : null}
          <div className="w-full flex flex-col  p-3  pl-6 border-b border-b-gray-200 space-y-2">
            <h5 className="font-semibold text-md">Location</h5>
            <div>{data.location}</div>
          </div>
          {!data.bookingCheckInDate ? (
            <div className="w-full flex flex-col  p-3  pl-6 border-b border-b-gray-200 space-y-2">
              <h5 className="font-semibold text-md">Price per night</h5>
              <div>₦{new Number(data.price).toLocaleString()}</div>
            </div>
          ) : null}

          {data.amountPaid ? (
            <div className="w-full flex flex-col  p-3  pl-6 border-b border-b-gray-200 space-y-3">
              <h5 className="font-semibold text-md">Payment details</h5>
              <div className="w-full flex justify-between">
                <div className="font-inter">
                  ₦{new Number(data.price).toLocaleString()}
                </div>
                <div className="flex items-center  w-[108px] text-left">
                  <X size={15} />
                  {numberOfNights(
                    new Date(data.bookingCheckInDate),
                    new Date(data.bookingCheckOutDate)
                  )}{" "}
                  nights
                </div>
              </div>
              <div className="w-full flex justify-between">
                <h5>Caution fee</h5>
                <div className="font-inter text-left w-[108px]">
                  ₦{new Number(data.cautionFee).toLocaleString()}
                </div>
              </div>
              <div className="w-full flex justify-between">
                <h5 className="font-[700]">Total</h5>
                <div className="font-inter font-[700] text-left w-[108px]">
                  ₦{new Number(data.amountPaid).toLocaleString()}
                </div>
              </div>
            </div>
          ) : null}

          {data.bookingCheckInDate ? (
            <div className="w-full flex justify-between p-3  pl-6 border-b border-b-gray-200">
              <div>
                <h5 className="font-semibold text-md">Check in</h5>
                <div>{data.bookingCheckInDate}</div>
              </div>
              <div className="w-[108px] flex flex-col">
                <h5 className="font-semibold text-md ">Check out</h5>
                <div>{data.bookingCheckOutDate}</div>
              </div>
            </div>
          ) : null}
          <Link
            href="/terms-of-use#refund-policy"
            target="_blank"
            className="font-semibold text-md p-0 m-0 block border-b border-b-gray-200"
          >
            <div className="w-full flex items-center p-3 pl-6  justify-between h-full">
              <span>Cancellation policy</span>
              <ChevronRight size={16} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
