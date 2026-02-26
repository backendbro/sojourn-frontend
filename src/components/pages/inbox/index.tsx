"use client";

import { useState, ChangeEvent, FormEvent } from "react";
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
import { Search, X, Pencil, ArrowRight, ChevronLeft, Info } from "lucide-react";
import Spinner from "@/components/svgs/Spinner";
import { toast } from "sonner";

export default function InboxPage() {
  const userId = useSelector((state: RootState) => state.user.me?.user?.id);
  const queryClient = useQueryClient();

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [mobileView, setMobileView] = useState<"list" | "chat" | "details">(
    "list",
  );

  const [showListingDetails, setShowListingDetails] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  /* =========================
     QUERIES
  ========================== */

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

  /* =========================
     DATA TRANSFORM
  ========================== */

  const conversations: Conversation[] = (conversationsData || []).map(
    (item: any) => ({
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
    }),
  );

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.propertyName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  /* =========================
     HANDLERS
  ========================== */

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setMobileView("chat");
    setShowListingDetails(true);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    setMobileView("list");
  };

  const handleOpenDetails = () => {
    setMobileView("details");
  };

  const handleCloseDetails = () => {
    setMobileView("chat");
  };

  /* =========================
     LAYOUT
  ========================== */

  return (
    <div className="h-[calc(100vh-70px)] flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* ======================
            LIST PANEL
        ======================= */}

        <div
          className={`
            absolute inset-0 bg-white flex flex-col
            md:static md:w-80 md:flex-shrink-0 md:border-r
            ${mobileView === "list" ? "flex" : "hidden md:flex"}
          `}
        >
          {/* Header */}
          <div className="px-4 py-4 border-b bg-white">
            <h1 className="text-xl font-semibold mb-3">Inbox</h1>

            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-2.5"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 space-y-4">
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
        </div>

        {/* ======================
            CHAT PANEL
        ======================= */}

        <div
          className={`
            absolute inset-0 bg-white flex flex-col
            md:static md:flex-1
            ${mobileView === "chat" ? "flex" : "hidden md:flex"}
          `}
        >
          {selectedConversation ? (
            <>
              {/* Mobile Header */}
              <div className="md:hidden flex items-center gap-2 p-3 border-b">
                <button onClick={handleBackToList}>
                  <ChevronLeft size={20} />
                </button>
                <div className="flex-1 font-medium truncate">
                  {selectedConversation.guestName}
                </div>
                <button onClick={handleOpenDetails}>
                  <Info size={20} />
                </button>
              </div>

              <ChatWindow conversation={selectedConversation} />
            </>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
              Select a conversation
            </div>
          )}
        </div>

        {/* ======================
            DETAILS PANEL
        ======================= */}

        {selectedConversation && showListingDetails && (
          <div
            className={`
              absolute inset-0 bg-white flex flex-col
              md:static md:w-80 md:flex-shrink-0 md:border-l
              ${mobileView === "details" ? "flex" : "hidden md:flex"}
            `}
          >
            {/* Mobile header */}
            <div className="md:hidden flex items-center gap-2 p-3 border-b">
              <button onClick={handleCloseDetails}>
                <ChevronLeft size={20} />
              </button>
              <div className="flex-1 font-medium">Listing Details</div>
            </div>

            {ticketLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <Spinner color="red" size={30} />
              </div>
            ) : (
              <ListingDetails
                ticketData={ticketDetails}
                onClose={handleCloseDetails}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}