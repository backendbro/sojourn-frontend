export type PaymentDataType = {
  propertyId: string;
  userId: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfInfants: number;
  credits?: number;
  discountCode?: string;
};

export type SubscriptionPaymentDataType = {
  planId: string;
  amount: number;
  planName: string;
  hostId: string;
};
