export type MessageType = {
  userId: string;
  hostId: string;
  message: string;
  senderId: string;
  ticketId: string;
};

export type CreateTicketType = {
  senderId: string;
  userId: string;
  hostId?: string;
  bookingId?: string;
  title: string;
  message: string;
  propertyId?: string;
};

// types/message.ts
export interface Conversation {
  id: string;
  guestName: string; // host's full name (since you're the guest)
  guestId: string; // hostId
  guestAvatar?: string | null; // hostPhoto
  lastMessage: string; // ticket title (or last message content)
  lastMessageTime: Date; // from ticket date + time
  unreadCount: number; // unread messages count
  propertyName: string; // propertyTitle
  propertyId: string; // propertyId
  propertyImage?: string | null; // propertyPhoto
  propertyLocation?: string; // location
  pricePerNight?: number; // price (if booking exists)
  cancellationPolicy?: string; // optional, from booking?
  checkInDate?: Date | string; // bookingCheckInDate
  checkOutDate?: Date | string; // bookingCheckOutDate
  numberOfGuests?: number; // optional
  nights?: number; // calculated from dates
  totalPrice?: number; // amountPaid
  bedrooms?: number; // optional
  bathrooms?: number; // optional
  maxGuests?: number; // optional
  amenities?: string[]; // optional
}
