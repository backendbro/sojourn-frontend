export type NotificationType =
  | "message_guest"
  | "message_host"
  | "booking_new"
  | "booking_cancelled"
  | "review_new"
  | "inspection_approved"
  | "inspection_cancelled"
  | "subscription_renewal";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  link: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}
