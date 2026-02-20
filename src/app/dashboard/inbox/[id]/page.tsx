"use client";

import Spinner from "@/components/svgs/Spinner";
import { getTicketMessages, sendMessage } from "@/http/api";
import { RootState } from "@/store";
import { MessageType } from "@/types/messages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, SendHorizonal, X } from "lucide-react";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import hdate from "human-date";
import Link from "next/link";
import { numberOfNights } from "@/lib/utils";

export default ({ params: { id } }: { params: { id: string } }) => {
  const userId = useSelector((state: RootState) => state.user.me?.user?.id);

  const client = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["ticket-messages-user"],
    queryFn: () => getTicketMessages(id),
    refetchIntervalInBackground: true,
    refetchInterval: 400,
  });

  const mutation = useMutation({
    mutationKey: ["send-message-user"],
    mutationFn: sendMessage,
    async onSuccess() {
      await client.invalidateQueries({
        queryKey: ["ticket-messages-user"],
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

  const hostPhotoUrl = data ? data.hostPhoto : "";
  const hostPhoto = hostPhotoUrl;

  const bookingOrListing =
    data && data.bookingCheckInDate ? "Reservation" : "Listing";

  const photoUrl = data && data.propertyPhoto ? data.propertyPhoto : "";
  const propertyPhoto = photoUrl;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({
      ticketId: id,
      hostId: data.hostId,
      message,
      senderId: userId,
      userId: userId,
    } as MessageType);
    setMessage("");
  }

  const handleEnterKeySubmit = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      mutation.mutate({
        ticketId: id,
        hostId: data.hostId,
        message,
        senderId: userId,
        userId: userId,
      } as MessageType);
      setMessage("");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-10 bg-white px-5 md:px-5 lg:px-20">
        <Spinner size={17} color="red" />
      </div>
    );
  }

  return (
    <div className="w-full lg:py-10 bg-white lg:px-5 lg:px-20 h-[88vh]">
      <div className="w-full flex-col h-full relative">
        <div className="w-full flex flex-col items-center">
          <div className="w-full shadow-md py-2 px-3 font-semibold capitalize flex items-center space-x-3 md:space-x-0 justify-between">
            <div className="w-1/2 md:w-1/2 flex items-center space-x-2">
              <div className="cursor-pointer flex w-[30px] h-[30px] items-center bg-gray-200 rounded-full overflow-hidden relative flex items-center justify-center">
                {hostPhoto ? (
                  <Image
                    src={hostPhoto}
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
                <span className="font-semibold">{data.hostFullName}</span>
                <div className=" md:block hidden text-[10px] lowercase font-normal">
                  {hdate.relativeTime(data.date)}
                </div>
              </div>
            </div>
            <Dialog>
              <DialogTrigger>
                <div className="bg-primary text-white font-semibold py-2 px-4 rounded-full text-xs">
                  Show {bookingOrListing}
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogClose className="w-full flex justify-end">
                  <X size={20} />
                </DialogClose>
                <div className="w-full flex items-center justify-between  p-2 border-b border-b-gray-200">
                  <h5 className="font-semibold text-lg">{bookingOrListing}</h5>
                </div>
                <Link
                  href={`/properties/${data.propertyId}`}
                  target="_blank"
                  className="font-semibold text-md block"
                >
                  {propertyPhoto ? (
                    <div className="w-full rounded-md oveflow-hidden relative h-[200px]">
                      <div className="absolute bg-black opacity-40 w-full h-full top-0 left-0 z-10"></div>
                      <div className="absolute px-3 py-2  top-4 left-4 z-50  isolate rounded-full bg-gray-200 shadow-md font-bold  text-xs">
                        View Listing
                      </div>
                      <Image
                        src={propertyPhoto}
                        alt="property_photo"
                        fill
                        priority
                      />
                    </div>
                  ) : null}
                </Link>
                {!data.bookingCheckInDate ? (
                  <div className="w-full flex flex-col  p-2 border-b border-b-gray-200 space-y-2">
                    <h5 className="font-semibold text-md"> Staying at</h5>
                    <div className="capitalize">{data.propertyTitle}</div>
                  </div>
                ) : null}
                <div className="w-full flex flex-col  p-2 border-b border-b-gray-200 space-y-2">
                  <h5 className="font-semibold text-md">Location</h5>
                  <div>{data.location}</div>
                </div>
                {!data.bookingCheckInDate ? (
                  <div className="w-full flex flex-col  p-2 border-b border-b-gray-200 space-y-2">
                    <h5 className="font-semibold text-md">Price per night</h5>
                    <div>₦{new Number(data.price).toLocaleString()}</div>
                  </div>
                ) : null}

                {data.amountPaid ? (
                  <div className="w-full flex flex-col  p-2  border-b border-b-gray-200 space-y-2">
                    <h5 className="font-semibold text-md">Payment details</h5>
                    <div className="w-full flex justify-between">
                      <h5>Total</h5>
                      <div className="font-inter">
                        ₦{new Number(data.amountPaid).toLocaleString()}
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <h5>Price</h5>
                      <div className="font-inter">
                        ₦{new Number(data.price).toLocaleString()}
                        <span className="text-[11px]">/night</span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <h5>Caution fee</h5>
                      <div className="font-inter">
                        ₦{new Number(data.cautionFee).toLocaleString()}
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <h5>Duration</h5>
                      <div>
                        {numberOfNights(
                          new Date(data.bookingCheckInDate),
                          new Date(data.bookingCheckOutDate),
                        )}{" "}
                        nights
                      </div>
                    </div>
                  </div>
                ) : null}

                {data.bookingCheckInDate ? (
                  <div className="w-full flex justify-between p-2  border-b border-b-gray-200">
                    <div>
                      <h5 className="font-semibold text-md">Check in</h5>
                      <div>{data.bookingCheckInDate}</div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-md">Check out</h5>
                      <div>{data.bookingCheckOutDate}</div>
                    </div>
                  </div>
                ) : null}

                <div className="w-full flex flex-col  border-b border-b-gray-200">
                  <Link
                    href="/terms-of-use#refund-policy"
                    target="_blank"
                    className="font-semibold text-md block p-2"
                  >
                    <div className="w-full flex items-center justify-between h-full">
                      <span>Cancellation policy</span>
                      <ChevronRight size={16} />
                    </div>
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-5/6 p-2 bg-paper rounded-md mt-1">
            <p className="text-xs font-semibold text-black text-center">
              {data.title}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-2 overflow-y-scroll h-[calc(100%-125px)] md:h-[calc(88vh-70px)] lg:h-[calc(100%-70px)] px-5 py-20">
          {data.messages.map(
            (
              m: {
                host: boolean;
                message: string;
                date: string;
                time: string;
              },
              idx: number,
            ) => {
              return (
                <div key={idx}>
                  {!m.host && (
                    <div className="w-full flex items-center justify-end">
                      <div className="min-w-[100px] max-w-[300px] md:max-w-[500px]  py-2 px-4 flex-col bg-[#3F3F3F] space-y-1 rounded-md">
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
                  {m.host && (
                    <div className="w-full flex items-center justify-start">
                      <div className="min-w-[100px] max-w-[300px] md:max-w-[500px]  py-2 px-4 flex-col bg-[#F7F7F7] space-y-1 rounded-md">
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
            },
          )}
        </div>
        <form
          onSubmit={onSubmit}
          className="w-full flex items-center bottom-[71px] p-2 fixed md:bottom-[-40px] md:absolute border border-gray-400 rounded-md bg-white"
        >
          <textarea
            onKeyUp={handleEnterKeySubmit}
            value={message}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setMessage((e as ChangeEvent<HTMLTextAreaElement>).target.value);
            }}
            className="w-[85%] md:w-[92%] p-3 h-[45px] rounded-l-full font-semibold resize-none border-0 bg-transparent outline-none text-[16px]"
            placeholder="type your message heres..."
          />
          <button className="w-[15%] md:w-[8%] p-3 h-[45px] outline-none rounded-r-full  flex items-center justify-center">
            {mutation.isPending ? (
              <Spinner color="white" size={28} />
            ) : (
              <span>
                <SendHorizonal
                  size={28}
                  className="stroke-primary"
                  strokeWidth={3}
                />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
