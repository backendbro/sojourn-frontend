"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  getMessagesByGuestId,
  getBookingsByUserId,
  createTicket,
  getTicketMessages,
} from "@/http/api";
import { Conversation } from "@/types/messages";
import MessageList from "@/components/messages/MessageList";
import ChatWindow from "@/components/messages/ChatWindow";
import ListingDetails from "@/components/messages/ListingDetails";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, X, Pencil, ArrowRight } from "lucide-react";
import Spinner from "@/components/svgs/Spinner";
import { toast } from "sonner";

export default function InboxPage() {
  const userId = useSelector((state: RootState) => state.user.me?.user?.id);
  const queryClient = useQueryClient();

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [showListingDetails, setShowListingDetails] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [newChat, setNewChatDetails] = useState({
    title: "",
    message: "",
    hostId: "",
    bookingId: "",
  });

  const { data: conversationsData, isLoading } = useQuery({
    queryKey: ["messages-user"],
    queryFn: () => getMessagesByGuestId(userId),
    enabled: !!userId,
  });

  const { data: ticketDetails, isLoading: ticketLoading } = useQuery({
    queryKey: ["ticket-details", selectedConversation?.id],
    queryFn: () => getTicketMessages(selectedConversation!.id),
    enabled: !!selectedConversation,
  });

  const { data: bookingsData } = useQuery({
    queryKey: ["get-bookings"],
    queryFn: () => getBookingsByUserId(userId),
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      toast.success("Message sent successfully");
      queryClient.invalidateQueries({ queryKey: ["messages-user"] });
      setNewChatDetails({ title: "", message: "", hostId: "", bookingId: "" });
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  useEffect(() => {
    console.log("📥 Raw conversationsData:", conversationsData);
  }, [conversationsData]);

  const conversations: Conversation[] = (conversationsData || []).map(
    (item: any) => {
      console.log("🔄 Mapping item:", item);
      return {
        id: item.id,
        guestName:
          `${item.hostFirstName || ""} ${item.hostLastName || ""}`.trim(),
        guestId: item.hostId,
        guestAvatar: item.hostPhoto,
        lastMessage: item.title || "",
        lastMessageTime: item.date ? new Date(item.date) : new Date(),
        unreadCount: item.unread || 0,
        propertyName: item.propertyTitle || "",
        propertyId: item.propertyId,
        propertyImage: item.propertyPhoto,
        propertyLocation: item.location,
        pricePerNight: item.price,
      };
    },
  );

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.propertyName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setShowListingDetails(true);
  };

  const handleNewChatChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "bookingId") {
      const booking = bookingsData?.find((b: any) => b.id === value);

      setNewChatDetails((prev) => ({
        ...prev,
        [name]: value,
        hostId: booking?.property?.hostId || "",
      }));
    } else {
      setNewChatDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateTicket = (e: FormEvent) => {
    e.preventDefault();

    if (!newChat.title || !newChat.message || !newChat.hostId) {
      toast.error("Please fill all fields");
      return;
    }

    mutation.mutate({
      senderId: userId,
      userId: userId,
      message: newChat.message,
      hostId: newChat.hostId,
      title: newChat.title,
      bookingId: newChat.bookingId,
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-gray-50">
      <div className="flex-1 flex overflow-hidden">

        {/* Inbox and Chat Section */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Inbox Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
            </div>

            <div className="flex items-center gap-3">

              {/* Search Bar */}
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search by name or property"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all duration-200 text-sm ${
                    isSearchFocused
                      ? "border-red-500 ring-2 ring-red-500/20 shadow-sm"
                      : "border-gray-300 hover:border-gray-400"
                  } focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                />

                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    isSearchFocused ? "text-red-500" : "text-gray-400"
                  }`}
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* New Message Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-10 h-10 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 shadow-sm hover:shadow-md hover:scale-105 active:scale-95">
                    <Pencil size={18} />
                  </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <h4 className="text-lg font-semibold mb-4">New Chat</h4>

                  <form onSubmit={handleCreateTicket} className="space-y-4">

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        What do you want to talk about?
                      </label>

                      <Input
                        name="title"
                        value={newChat.title}
                        onChange={handleNewChatChange}
                        placeholder="e.g. Question about booking"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select booking (optional)
                      </label>

                      <select
                        name="bookingId"
                        value={newChat.bookingId}
                        onChange={handleNewChatChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="">-- No booking --</option>

                        {bookingsData?.map((booking: any) => (
                          <option key={booking.id} value={booking.id}>
                            {booking.propertyTitle}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>

                      <textarea
                        name="message"
                        value={newChat.message}
                        onChange={handleNewChatChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Type your message..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {mutation.isPending ? (
                        <Spinner color="white" size={20} />
                      ) : (
                        <>
                          <span>Send message</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Main Inbox Area */}
          <div className="flex-1 flex overflow-hidden">

            {/* Conversation List */}
            <div
              className={`${
                selectedConversation ? "hidden md:flex" : "flex"
              } w-full md:w-80 border-r border-gray-200 bg-white flex-col`}
            >
              {isLoading ? (
                <div className="p-4 space-y-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : (
                <MessageList
                  conversations={filteredConversations}
                  selectedConversationId={selectedConversation?.id}
                  onSelectConversation={handleSelectConversation}
                />
              )}
            </div>

            {/* Chat Window */}
            <div
              className={`${
                selectedConversation ? "flex" : "hidden md:flex"
              } flex-1 flex-col`}
            >

              {/* Mobile Back Button */}
              {selectedConversation && (
                <div className="md:hidden border-b p-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="text-sm font-medium"
                  >
                    ← Back
                  </button>
                </div>
              )}

              {selectedConversation ? (
                <ChatWindow conversation={selectedConversation} />
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center animate-fade-in">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-sm text-gray-500">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Listing Sidebar */}
        {selectedConversation && showListingDetails && ticketDetails && (
          <div className="hidden lg:block">
            <ListingDetails
              ticketData={ticketDetails}
              onClose={() => setShowListingDetails(false)}
            />
          </div>
        )}

        {selectedConversation && showListingDetails && ticketLoading && (
          <div className="hidden lg:flex w-80 border-l border-gray-200 bg-white items-center justify-center">
            <Spinner color="red" size={30} />
          </div>
        )}
      </div>
    </div>
  );
}