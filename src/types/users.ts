export type LoginUserType = {
  email: string;
  password: string;
};

export type PartnerType = "Company" | "Individual";

export interface AccountCreation {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  refererId?: string;
  companyName?: string;
  registrationNumber?: string;
  vatNumber?: string;
}

export interface HostAccountCreation {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  accountType?: string;
  companyName?: string;
  refererId?: string;
  registrationNumber?: string;
  vatNumber?: string;
}

export enum UserTypes {
  BACKOFFICE = "admin",
  HOST = "host",
  GUEST = "guest",
}

export type AccountType = "Individual" | "Company";

export type HostType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: AccountType;
};

export type HostProfile = {
  country: string;
  stateOrRegion: string;
  city: string;
  street: string;
  primaryPhoneNumber: string;
  houseNumber: number;
  zipOrPostal: string;
  companyName: string;
  registrationNumber: string;
  vatNumber: string;
  governmentId: string;
  contactPersonPhoneNumber: string;
  contactPersonGender: string;
  photo: string;
};

export interface IWithdrawal {
  bankAccountNumber?: string;
  bankName?: string;
  refererId: string;
  amount: number;
  userId?: string;
}

export type NINVerifcationType = {
  verificationType: "NIN-VERIFY";
  countryCode: "NG";
  searchParameter: string;
};
