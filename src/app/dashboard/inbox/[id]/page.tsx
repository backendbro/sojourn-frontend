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

export default function InboxTicket({
  params: { id },
}: {
  params: { id: string };
}) {
  const userId = useSelector((state: RootState) => state.user.me?.user?.id);
  const client = useQueryClient();
  const [message, setMessage] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["ticket-messages-user", id],
    queryFn: () => getTicketMessages(id),
    refetchInterval: 400,
  });

  const mutation = useMutation({
    mutationFn: sendMessage,
    async onSuccess() {
      await client.invalidateQueries({
        queryKey: ["ticket-messages-user", id],
      });
      setMessage("");
    },
    onError() {
      toast("Failed to send message");
    },
  });

  function send() {
    if (!message.trim()) return;

    mutation.mutate({
      ticketId: id,
      hostId: data.hostId,
      message,
      senderId: userId,
      userId,
    } as MessageType);
  }

  function handleEnter(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spinner size={18} color="red" />
      </div>
    );
  }

  return (
    <div className="w-full h-[88vh] flex flex-col bg-white">
      {/* HEADER */}
      <ChatHeader data={data} />

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {data.messages.map((m: any, idx: number) => (
          <MessageBubble
            key={idx}
            isHost={m.host}
            message={m.message}
            date={m.date}
            time={m.time}
            guestName={data.guestFullName}
          />
        ))}
      </div>

      {/* INPUT */}
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={send}
        onKeyDown={handleEnter}
        loading={mutation.isPending}
      />
    </div>
  );
}

/* ===========================
   COMPONENTS
=========================== */

function ChatHeader({ data }: any) {
  const bookingOrListing = data.bookingCheckInDate ? "Reservation" : "Listing";

  return (
    <div className="w-full border-b bg-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-200">
          {data.hostPhoto ? (
            <Image src={data.hostPhoto} alt="host" fill />
          ) : null}
        </div>
        <div>
          <div className="font-semibold">{data.hostFullName}</div>
          <div className="text-xs text-gray-500">
            {hdate.relativeTime(data.date)}
          </div>
        </div>
      </div>

      <ListingDetailsDialog data={data} label={bookingOrListing} />
    </div>
  );
}

function MessageBubble({ isHost, message, date, time, guestName }: any) {
  const isUser = !isHost;

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "bg-primary text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        <div className="text-sm font-semibold mb-1">
          {isUser ? "You" : guestName}
        </div>

        <div className="text-sm whitespace-pre-wrap">{message}</div>

        <div className="text-[10px] mt-2 opacity-70">
          {date} • {time}
        </div>
      </div>
    </div>
  );
}

function ChatInput({ value, onChange, onSend, onKeyDown, loading }: any) {
  return (
    <div className="border-t bg-white px-6 py-4">
      <div className="flex items-center space-x-2">
        <textarea
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onChange(e.target.value)
          }
          onKeyDown={onKeyDown}
          placeholder="Type your message..."
          className="flex-1 resize-none rounded-full px-5 py-3 bg-gray-100 focus:outline-none text-sm"
        />

        <button
          onClick={onSend}
          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
        >
          {loading ? (
            <Spinner size={18} color="white" />
          ) : (
            <SendHorizonal className="text-white" size={20} />
          )}
        </button>
      </div>
    </div>
  );
}

function ListingDetailsDialog({ data, label }: any) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-primary text-white px-4 py-2 rounded-full text-xs font-semibold cursor-pointer">
          Show {label}
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogClose className="w-full flex justify-end">
          <X size={20} />
        </DialogClose>

        <div className="space-y-4">
          {data.propertyPhoto && (
            <Link href={`/properties/${data.propertyId}`} target="_blank">
              <div className="relative h-[200px] rounded-xl overflow-hidden">
                <Image src={data.propertyPhoto} alt="property" fill />
              </div>
            </Link>
          )}

          <div>
            <div className="font-semibold">{data.propertyTitle}</div>
            <div className="text-sm text-gray-500">{data.location}</div>
          </div>

          {data.amountPaid && (
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Total</span>
                <span>₦{Number(data.amountPaid).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>
                  {numberOfNights(
                    new Date(data.bookingCheckInDate),
                    new Date(data.bookingCheckOutDate),
                  )}{" "}
                  nights
                </span>
              </div>
            </div>
          )}

          <Link
            href="/terms-of-use#refund-policy"
            target="_blank"
            className="flex justify-between items-center text-sm font-medium"
          >
            Cancellation policy
            <ChevronRight size={16} />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
