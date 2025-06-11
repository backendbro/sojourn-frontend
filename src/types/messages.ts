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
