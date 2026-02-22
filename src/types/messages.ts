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

export interface Conversation {
  id: string;
  guestName: string;
  guestId: string;
  guestAvatar?: string | null;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  propertyName: string;
  propertyId: string;
  propertyImage?: string | null;
  propertyLocation?: string;
  pricePerNight?: number;
  cancellationPolicy?: string;
  checkInDate?: Date | string;
  checkOutDate?: Date | string;
  numberOfGuests?: number;
  nights?: number;
  totalPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  maxGuests?: number;
  amenities?: string[];
}
