"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getTicketMessages, sendMessage } from "@/http/api";
import { MessageType } from "@/types/messages";
import Image from "next/image";
import Spinner from "@/components/svgs/Spinner";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";

export default function InboxConversation({
  params: { id },
}: {
  params: { id: string };
}) {
  const userId = useSelector((state: RootState) => state.user.me?.user?.id);

  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["ticket-messages-user", id],
    queryFn: () => getTicketMessages(id),
    refetchInterval: 2000,
  });

  const mutation = useMutation({
    mutationFn: sendMessage,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["ticket-messages-user", id],
      });
    },
    onError() {
      toast.error("Failed to send message");
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    mutation.mutate({
      ticketId: id,
      hostId: data.hostId,
      message,
      senderId: userId,
      userId,
    } as MessageType);

    setMessage("");
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend(e as any);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <Spinner size={20} color="red" />
      </div>
    );
  }

  if (!data) return null;

  const isReservation = !!data.bookingCheckInDate;

  return (
    <div className="flex h-[88vh] bg-gray-50">
      <div className="flex-1 flex flex-col bg-white">
        <div className="px-6 py-4 border-b border-gray-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-200">
            {data.hostPhoto ? (
              <Image src={data.hostPhoto} alt="host" fill />
            ) : (
              <Image
                src="/assets/icons/person-placeholder.png"
                alt="host"
                fill
              />
            )}
          </div>

          <div>
            <h2 className="font-semibold">{data.hostFullName}</h2>
            <p className="text-sm text-gray-500">{data.propertyTitle}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white">
          {data.messages.map((msg: any) => {
            const isMe = msg.senderId === userId;

            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                    isMe
                      ? "bg-red-600 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {msg.message}
                  <div className="text-xs mt-2 opacity-70">
                    {format(new Date(msg.date), "MMM d, yyyy h:mm a")}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-red-600 text-white px-5 rounded-lg disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* ================= LISTING SIDEBARs ================= */}
      <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-lg">
            {isReservation ? "Reservation" : "Listing"}
          </h3>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto">
          {data.propertyPhoto && (
            <Link href={`/properties/${data.propertyId}`} target="_blank">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={data.propertyPhoto}
                  alt="property"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          )}

          <div>
            <h4 className="font-semibold">{data.propertyTitle}</h4>
            <p className="text-sm text-gray-500">{data.location}</p>
          </div>

          {!isReservation && (
            <div>
              <p className="text-xs text-gray-500">Price per night</p>
              <p className="font-semibold">
                ₦{Number(data.price).toLocaleString()}
              </p>
            </div>
          )}

          {data.bookingCheckInDate && (
            <div>
              <p className="text-xs text-gray-500">Check-in</p>
              <p className="font-medium">
                {format(new Date(data.bookingCheckInDate), "MMM d, yyyy")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
