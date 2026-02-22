"use client";

import Spinner from "@/components/svgs/Spinner";
import { getTicketMessages, sendMessage } from "@/http/api";
import { RootState } from "@/store";
import { MessageType } from "@/types/messages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useMemo, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function InboxDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const userId = useSelector((state: RootState) => state.user.me?.user?.id);

  const client = useQueryClient();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["ticket-messages-user", id],
    queryFn: () => getTicketMessages(id),
    refetchIntervalInBackground: true,
    refetchInterval: 400,
  });

  const mutation = useMutation({
    mutationKey: ["send-message-user"],
    mutationFn: sendMessage,
    async onSuccess() {
      setMessage("");
      await client.invalidateQueries({
        queryKey: ["ticket-messages-user", id],
      });
    },
    onError() {
      toast.error("Failed to send message");
    },
  });

  const conversation = useMemo(() => {
    if (!data) return null;

    return {
      guestName: data.hostFullName,
      guestAvatar: data.hostPhoto,
      propertyName: data.propertyTitle,
      propertyImage: data.propertyPhoto,
      propertyLocation: data.location,
      pricePerNight: data.price,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      maxGuests: data.maxGuests,
      amenities: data.amenities,
      messages: data.messages.map(
        (m: {
          host: boolean;
          message: string;
          date: string;
          time: string;
        }) => ({
          id: `${m.date}-${m.time}`,
          text: m.message,
          isMe: !m.host,
          timestamp: `${m.date} ${m.time}`,
        }),
      ),
    };
  }, [data]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    mutation.mutate({
      ticketId: id,
      hostId: data.hostId,
      message,
      senderId: userId,
      userId,
    } as MessageType);
  };

  if (isLoading || !conversation) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={20} color="red" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ================= CHAT SECTION ================= */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center gap-3 border-b p-4">
          <img
            src={conversation.guestAvatar}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{conversation.guestName}</p>
            <p className="text-sm text-gray-500">{conversation.propertyName}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {conversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-2xl text-sm ${
                  msg.isMe
                    ? "bg-black text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-900 rounded-bl-sm"
                }`}
              >
                {msg.text}
                <div className="text-[10px] opacity-60 mt-1">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t p-4 flex items-center gap-3"
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-full"
          >
            Send
          </button>
        </form>
      </div>

      {/* ================= LISTING DETAILS SIDEBAR ================= */}
      <div className="w-[380px] border-l bg-white p-6 overflow-y-auto hidden lg:block">
        <img
          src={conversation.propertyImage}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />

        <h2 className="text-xl font-semibold mb-1">
          {conversation.propertyName}
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          {conversation.propertyLocation}
        </p>

        <div className="text-lg font-semibold mb-4">
          ${conversation.pricePerNight} / night
        </div>

        <div className="space-y-2 text-sm mb-6">
          <p>🛏 {conversation.bedrooms} Bedrooms</p>
          <p>🛁 {conversation.bathrooms} Bathrooms</p>
          <p>👥 {conversation.maxGuests} Guests</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {conversation.amenities?.map((amenity: string, index: number) => (
              <span
                key={index}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
