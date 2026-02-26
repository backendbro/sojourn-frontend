// "use client";

// import { useState, ChangeEvent, FormEvent } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
// import {
//   getMessagesByGuestId,
//   getBookingsByUserId,
//   createTicket,
//   getTicketMessages,
// } from "@/http/api";
// import { Conversation } from "@/types/messages";
// import MessageList from "@/components/messages/MessageList";
// import ChatWindow from "@/components/messages/ChatWindow";
// import ListingDetails from "@/components/messages/ListingDetails";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Search, X, Pencil, ArrowRight, ChevronLeft, Info } from "lucide-react";
// import Spinner from "@/components/svgs/Spinner";
// import { toast } from "sonner";

// export default function InboxPage() {
//   const userId = useSelector((state: RootState) => state.user.me?.user?.id);
//   const queryClient = useQueryClient();

//   const [selectedConversation, setSelectedConversation] =
//     useState<Conversation | null>(null);

//   const [mobileView, setMobileView] = useState<"list" | "chat" | "details">(
//     "list",
//   );

//   const [showListingDetails, setShowListingDetails] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearchFocused, setIsSearchFocused] = useState(false);

//   /* =========================
//      QUERIES
//   ========================== */

//   const { data: conversationsData, isLoading } = useQuery({
//     queryKey: ["messages-user"],
//     queryFn: () => getMessagesByGuestId(userId),
//     enabled: !!userId,
//   });

//   const { data: ticketDetails, isLoading: ticketLoading } = useQuery({
//     queryKey: ["ticket-details", selectedConversation?.id],
//     queryFn: () => getTicketMessages(selectedConversation!.id),
//     enabled: !!selectedConversation,
//   });

//   /* =========================
//      DATA TRANSFORM
//   ========================== */

//   const conversations: Conversation[] = (conversationsData || []).map(
//     (item: any) => ({
//       id: item.id,
//       guestName:
//         `${item.hostFirstName || ""} ${item.hostLastName || ""}`.trim(),
//       guestId: item.hostId,
//       guestAvatar: item.hostPhoto,
//       lastMessage: item.title || "",
//       lastMessageTime: item.date ? new Date(item.date) : new Date(),
//       unreadCount: item.unread || 0,
//       propertyName: item.propertyTitle || "",
//       propertyId: item.propertyId,
//       propertyImage: item.propertyPhoto,
//       propertyLocation: item.location,
//       pricePerNight: item.price,
//     }),
//   );

//   const filteredConversations = conversations.filter(
//     (conv) =>
//       conv.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       conv.propertyName.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   /* =========================
//      HANDLERS
//   ========================== */

//   const handleSelectConversation = (conv: Conversation) => {
//     setSelectedConversation(conv);
//     setMobileView("chat");
//     setShowListingDetails(true);
//   };

//   const handleBackToList = () => {
//     setSelectedConversation(null);
//     setMobileView("list");
//   };

//   const handleOpenDetails = () => {
//     setMobileView("details");
//   };

//   const handleCloseDetails = () => {
//     setMobileView("chat");
//   };

//   /* =========================
//      LAYOUT
//   ========================== */

//   return (
//     <div className="h-[calc(100vh-70px)] flex flex-col bg-gray-50 overflow-hidden">
//       <div className="flex flex-1 overflow-hidden relative">
//         {/* ======================
//             LIST PANEL
//         ======================= */}

//         <div
//           className={`
//             absolute inset-0 bg-white flex flex-col
//             md:static md:w-80 md:flex-shrink-0 md:border-r
//             ${mobileView === "list" ? "flex" : "hidden md:flex"}
//           `}
//         >
//           {/* Header */}
//           <div className="px-4 py-4 border-b bg-white">
//             <h1 className="text-xl font-semibold mb-3">Inbox</h1>

//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onFocus={() => setIsSearchFocused(true)}
//                 onBlur={() => setIsSearchFocused(false)}
//                 className="w-full pl-10 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
//               />
//               <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery("")}
//                   className="absolute right-2 top-2.5"
//                 >
//                   <X size={16} />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Conversation List */}
//           <div className="flex-1 overflow-y-auto">
//             {isLoading ? (
//               <div className="p-4 space-y-4">
//                 <Skeleton className="h-16 w-full" />
//                 <Skeleton className="h-16 w-full" />
//               </div>
//             ) : (
//               <MessageList
//                 conversations={filteredConversations}
//                 selectedConversationId={selectedConversation?.id}
//                 onSelectConversation={handleSelectConversation}
//               />
//             )}
//           </div>
//         </div>

//         {/* ======================
//             CHAT PANEL
//         ======================= */}

//         <div
//           className={`
//             absolute inset-0 bg-white flex flex-col
//             md:static md:flex-1
//             ${mobileView === "chat" ? "flex" : "hidden md:flex"}
//           `}
//         >
//           {selectedConversation ? (
//             <>
//               {/* Mobile Header */}
//               <div className="md:hidden flex items-center gap-2 p-3 border-b">
//                 <button onClick={handleBackToList}>
//                   <ChevronLeft size={20} />
//                 </button>
//                 <div className="flex-1 font-medium truncate">
//                   {selectedConversation.guestName}
//                 </div>
//                 <button onClick={handleOpenDetails}>
//                   <Info size={20} />
//                 </button>
//               </div>

//               <ChatWindow conversation={selectedConversation} />
//             </>
//           ) : (
//             <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
//               Select a conversation
//             </div>
//           )}
//         </div>

//         {/* ======================
//             DETAILS PANEL
//         ======================= */}

//         {selectedConversation && showListingDetails && (
//           <div
//             className={`
//               absolute inset-0 bg-white flex flex-col
//               md:static md:w-80 md:flex-shrink-0 md:border-l
//               ${mobileView === "details" ? "flex" : "hidden md:flex"}
//             `}
//           >
//             {/* Mobile header */}
//             <div className="md:hidden flex items-center gap-2 p-3 border-b">
//               <button onClick={handleCloseDetails}>
//                 <ChevronLeft size={20} />
//               </button>
//               <div className="flex-1 font-medium">Listing Details</div>
//             </div>

//             {ticketLoading ? (
//               <div className="flex-1 flex items-center justify-center">
//                 <Spinner color="red" size={30} />
//               </div>
//             ) : (
//               <ListingDetails
//                 ticketData={ticketDetails}
//                 onClose={handleCloseDetails}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
import { Search, X, Pencil, ArrowRight, ChevronLeft, Info, Eye, EyeOff } from "lucide-react";
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
  const [newChat, setNewChatDetails] = useState({
    title: "",
    message: "",
    hostId: "",
    bookingId: "",
  });

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

  // Fetch bookings for new chat dialog
  const { data: bookingsData } = useQuery({
    queryKey: ["get-bookings"],
    queryFn: () => getBookingsByUserId(userId),
    enabled: !!userId,
  });

  // Create new ticket mutation
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

  const handleToggleDetails = () => {
    if (window.innerWidth < 768) {
      // On mobile, toggle between chat and details
      if (mobileView === "details") {
        setMobileView("chat");
      } else {
        setMobileView("details");
      }
    } else {
      // On desktop, just toggle visibility
      setShowListingDetails(!showListingDetails);
    }
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
                placeholder="Search conversations..."
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

            {/* New Message Button for mobile */}
            <div className="mt-3 md:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2 transition">
                    <Pencil size={16} />
                    <span>New Message</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <h4 className="text-lg font-semibold mb-4">New Chat</h4>
                  <form onSubmit={handleCreateTicket} className="space-y-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        What do you want to talk about?
                      </label>
                      <Input
                        id="title"
                        name="title"
                        value={newChat.title}
                        onChange={handleNewChatChange}
                        placeholder="e.g. Question about booking"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="bookingId"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Select booking (optional)
                      </label>
                      <select
                        id="bookingId"
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
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
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
                          <span>Send message</span> <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </DialogContent>
              </Dialog>
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
                <button onClick={handleBackToList} className="p-1">
                  <ChevronLeft size={20} />
                </button>
                <div className="flex-1 font-medium truncate">
                  {selectedConversation.guestName}
                </div>
                <button 
                  onClick={handleToggleDetails} 
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                  title={showListingDetails ? "Hide details" : "Show details"}
                >
                  {showListingDetails ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <ChatWindow conversation={selectedConversation} />
            </>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
              Select a conversation to start messaging
            </div>
          )}
        </div>

        {/* ======================
            DETAILS PANEL
        ======================= */}

        {selectedConversation && (
          <div
            className={`
              absolute inset-0 bg-white flex flex-col
              md:static md:flex-shrink-0 md:border-l
              ${showListingDetails ? "md:w-80" : "md:w-0 md:overflow-hidden"}
              ${mobileView === "details" ? "flex" : "hidden md:flex"}
              transition-all duration-300 ease-in-out
            `}
          >
            {ticketLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <Spinner color="red" size={30} />
              </div>
            ) : (
              <ListingDetails
                ticketData={ticketDetails}
                onClose={handleCloseDetails}
                isVisible={showListingDetails}
                onToggle={handleToggleDetails}
              />
            )}
          </div>
        )}

        {/* Desktop Toggle Button (when details are hidden) */}
        {selectedConversation && !showListingDetails && (
          <button
            onClick={handleToggleDetails}
            className="hidden md:flex absolute right-4 top-20 p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition z-10 items-center gap-2"
            title="Show listing details"
          >
            <Eye size={18} />
            <span className="text-sm font-medium">Show Details</span>
          </button>
        )}
      </div>
    </div>
  );
}