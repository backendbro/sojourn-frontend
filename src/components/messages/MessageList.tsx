"use client";

import { Conversation } from "@/types/messages";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface MessageListProps {
  conversations: Conversation[];
  selectedConversationId?: string | null;
  onSelectConversation: (conversation: Conversation) => void;
}

export default function MessageList({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: MessageListProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return formatDistanceToNow(date, { addSuffix: true });
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
      {conversations.length === 0 ? (
        <div className="p-6 text-center text-gray-500 animate-fade-in">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-sm font-medium">No conversations found</p>
          <p className="text-xs text-gray-400 mt-1">
            Try adjusting your search
          </p>
        </div>
      ) : (
        conversations.map((conv, index) => {
          const isSelected = conv.id === selectedConversationId;
          return (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv)}
              className={`w-full p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "bg-black text-white border-l-2 border-red-500"
                  : "hover:bg-gray-50/50 active:bg-gray-100"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  {conv.guestAvatar ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-offset-2 ring-gray-100">
                      <Image
                        src={conv.guestAvatar}
                        alt={conv.guestName}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-offset-2 ring-gray-100">
                      {conv.guestName.charAt(0)}
                    </div>
                  )}
                  {conv.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-semibold shadow-lg animate-pulse">
                      {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className={`text-sm font-medium truncate transition-colors ${
                        isSelected
                          ? "text-white"
                          : conv.unreadCount > 0
                            ? "text-gray-900"
                            : "text-gray-700"
                      }`}
                    >
                      {conv.guestName}
                    </h3>
                    <span
                      className={`text-xs flex-shrink-0 ml-2 transition-colors ${
                        isSelected ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {formatTime(conv.lastMessageTime)}
                    </span>
                  </div>

                  <p
                    className={`text-sm truncate transition-colors ${
                      isSelected
                        ? "text-gray-200"
                        : conv.unreadCount > 0
                          ? "text-gray-900 font-medium"
                          : "text-gray-600"
                    }`}
                  >
                    {conv.lastMessage || "No messages yet"}
                  </p>
                </div>
              </div>
            </button>
          );
        })
      )}
    </div>
  );
}
