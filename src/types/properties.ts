import { PropertyTypes } from "@/components/pages/hosts/properties/inspection-request-form-states";

export interface CardProps {
  title: string;
  typeOfProperty: string;
  price: number;
  photos: string[];
  country: string;
  street: string;
  city: string;
  id: string;
  houseNumber: number;
  numberOfRooms: number;
  wishlist: Array<{ userId: string; propertyId: string }>;
}

export type PropertySearchQueriesKeys = {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  adults: number;
  children: number;
  infants: number;
  cursor: number;
  typesOfProperty: string[];
  price: number;
  numberOfRooms: string[];
  amenities: string[];
};

export type Property = {
  id?: string;
  title: string;
  hostId: string;
  numberOfRooms: number;
  maxNumberOfPeople: number;
  description: string;
  files: File[];
  typeOfProperty: PropertyTypes;
  country: string;
  cautionFee: number;
  city: string;
  street: string;
  houseNumber: number;
  zip: string;
  nearbyPlaces: string[];
  ammenities: string[];
  houseRules: string[];
  checkInAfter: string;
  checkOutBefore: string;
  price: number;
  contactName: string;
  contactPhoneNumber: string;
  contactEmail: string;
};

export type Inspection = {
  inspectionDate: Date;
  inspectionTime: string;
} & Property;
