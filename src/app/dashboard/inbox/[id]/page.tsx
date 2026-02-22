"use client";

import Spinner from "@/components/svgs/Spinner";
import { getTicketMessages, sendMessage } from "@/http/api";
import { RootState } from "@/store";
import { MessageType } from "@/types/messages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, KeyboardEvent, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import ChatWindow from "@/components/messages/ChatWindow";
import ListingDetails from "@/components/messages/ListingDetails";

export default function InboxDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const userId = useSelector(
    (state: RootState) => state.user.me?.user?.id
  );

  const client = useQueryClient();

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
      id,
      guestName: data.hostFullName,
      guestAvatar: data.hostPhoto,
      propertyName: data.propertyTitle,
      propertyImage: data.propertyPhoto,
      propertyLocation: data.location,
      pricePerNight: data.price,
      cancellationPolicy: "Flexible",
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      maxGuests: data.maxGuests,
      amenities: data.amenities,
      nights:
        data.bookingCheckInDate && data.bookingCheckOutDate
          ? Math.ceil(
              (new Date(data.bookingCheckOutDate).getTime() -
                new Date(data.bookingCheckInDate).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          : undefined,
      messages: data.messages.map(
        (m: {
          host: boolean;
          message: string;
          date: string;
          time: string;
        }) => ({
          id: `${m.date}-${m.time}`,
          text: m.message,
          senderId: m.host ? "guest" : "host",
          senderName: m.host ? data.hostFullName : "You",
          timestamp: new Date(`${m.date} ${m.time}`),
          isRead: true,
        })
      ),
    };
  }, [data, id]);

  const handleSendMessage = (message: string) => {
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
      <div className="flex items-center justify-center h-screen bg-white">
        <Spinner size={20} color="red" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow
          conversation={conversation}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* Listing Sidebar */}
      <ListingDetails
        conversation={conversation}
        onClose={() => {}}
      />
    </div>
  );
}