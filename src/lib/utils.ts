import { IndividualAccountDetails } from "@/components/pages/hosts/manage-profile";
import { PropertyTypes } from "@/components/pages/hosts/properties/inspection-request-form-states";
import { IndividualUserAccountDetails } from "@/components/pages/profile";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateInspection(data: any) {
  const errors = [];
  const keys = Object.keys(data);

  for (let key of keys) {
    const value = data[key];
    if (
      typeof value === "string" &&
      typeof value === "number" &&
      !value &&
      key !== "cautionFee"
    ) {
      const error = `please fill in ${key}.`;
      errors.push(error);
    } else if (typeof value === "object" && Array.isArray(value)) {
      if (!(value as Array<any>).length) {
        if (key !== "houseRules") {
          const error = `please select one of ${key}. `;
          errors.push(error);
        }
      }
    } else {
      if (!value && key !== "cautionFee") {
        const error = `please fill in ${key}.`;
        errors.push(error);
      }
    }
  }
  return errors;
}

export function numberOfNights(from: Date, to: Date) {
  const timeDiff = to.getTime() - from.getTime();
  const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return numberOfNights;
}

export function isDate(value: any) {
  const timestamp = Date.parse(value);
  return !isNaN(timestamp);
}

export function formatProfileData(
  formData: FormData,
  data: Partial<IndividualAccountDetails>,
  key = "host"
) {
  formData.append(key, JSON.stringify(data.host));
  formData.append("profile", JSON.stringify(data.profile));
  return formData;
}

export function formatUserProfileData(
  formData: FormData,
  data: Partial<IndividualUserAccountDetails>,
  key = "host"
) {
  formData.append(key, JSON.stringify(data.user));
  formData.append("profile", JSON.stringify(data.profile));
  return formData;
}

export function formatDate(date: string) {
  const [month, day, year] = date.split("/");
  let m = month,
    d = day;
  if (+day < 10) {
    d = `0${day}`;
  }

  if (+month < 10) {
    m = `0${month}`;
  }
  const newDateFormat = `${year}-${m}-${d}`;
  return newDateFormat;
}

export function getNonFalsyKeys(values: { [key: string]: boolean }) {
  const keys = Object.keys(values);
  const results: string[] = [];
  keys.forEach((k) => {
    if (values[k]) {
      results.push(k);
    }
  });
  return results;
}

export const validateBasicPropertyDetailsSection = (
  values: Partial<CreateInspectionForm>
) => {
  const keys: { [key: string]: boolean } = {};
  if (!values.title) {
    keys["title"] = true;
  }
  if (!values.maxNumberOfPeople) {
    keys["maxNumberOfPeople"] = true;
  }
  if (!values.numberOfRooms) {
    keys["numberOfRooms"] = true;
  }
  if (!values.description) {
    keys["description"] = true;
  }
  return keys;
};

export const validateNumberOfPictures = (
  values: Partial<CreateInspectionForm>
) => {
  const keys: { [key: string]: boolean } = {};
  if ((values.files as File[]).length < 3) {
    keys["files"] = true;
  }

  return keys;
};

export const validateTypeOfProperty = (
  values: Partial<CreateInspectionForm>
) => {
  const keys: { [key: string]: boolean } = {};
  if (!values.typeOfProperty) {
    keys["typeOfProperty"] = true;
  }

  return keys;
};

export const validatePropertyLocationDetails = (
  values: Partial<CreateInspectionForm>
) => {
  const keys: { [key: string]: boolean } = {};
  if (!values.country) {
    keys["country"] = true;
  }
  if (!values.city) {
    keys["city"] = true;
  }
  if (!values.street) {
    keys["street"] = true;
  }

  if (!values.houseNumber) {
    keys["houseNumber"] = true;
  }

  if (!values.zip) {
    keys["zip"] = true;
  }

  return keys;
};

export const validateWhatIsNear = (values: Partial<CreateInspectionForm>) => {
  const keys: { [key: string]: boolean } = {};
  if (!values.nearbyPlaces?.length) {
    keys["nearbyPlaces"] = true;
  }

  return keys;
};

export const validateAmmenities = (values: Partial<CreateInspectionForm>) => {
  const keys: { [key: string]: boolean } = {};
  if (!values.ammenities?.length) {
    keys["ammenities"] = true;
  }

  return keys;
};

export const validateHouseRules = (values: Partial<CreateInspectionForm>) => {
  const keys: { [key: string]: boolean } = {};
  if (!values.houseRules?.length) {
    keys["houseRules"] = true;
  }
  if (!values.checkInAfter) {
    keys["checkInAfter"] = true;
  }

  if (!values.checkOutBefore) {
    keys["checkOutBefore"] = true;
  }

  return keys;
};

export const validatePrice = (values: Partial<CreateInspectionForm>) => {
  const keys: { [key: string]: boolean } = {};
  if (!values.price) {
    keys["price"] = true;
  }

  return keys;
};

export const validateContactInfo = (values: Partial<CreateInspectionForm>) => {
  const keys: { [key: string]: boolean } = {};
  if (!values.contactName) {
    keys["contactName"] = true;
  }
  if (!values.contactEmail) {
    keys["contactEmail"] = true;
  }
  if (!values.contactPhoneNumber) {
    keys["contactPhoneNumber"] = true;
  }

  return keys;
};

export const validateInspectionDateAndTime = (
  values: Partial<CreateInspectionForm>
) => {
  const keys: { [key: string]: boolean } = {};
  if (!values.inspectionDate) {
    keys["inspectionDate"] = true;
  }
  if (!values.inspectionTime) {
    keys["inspectionTime"] = true;
  }

  return keys;
};

export interface CreateInspectionForm {
  title: string;
  numberOfRooms: number;
  maxNumberOfPeople: number;
  description: string;
  files: File[];
  typeOfProperty: PropertyTypes;
  country: string;
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
  lat: string;
  lng: string;
  contactName: string;
  contactPhoneNumber: string;
  contactEmail: string;
  inspectionDate: Date | null;
  inspectionTime: string;
  cautionFee: number;
}

export interface CreateInspectionFormValidationType {
  title: boolean;
  numberOfRooms: boolean;
  maxNumberOfPeople: boolean;
  description: boolean;
  files: boolean;
  typeOfProperty: boolean;
  country: boolean;
  city: boolean;
  street: boolean;
  houseNumber: boolean;
  zip: boolean;
  nearbyPlaces: boolean;
  ammenities: boolean;
  houseRules: boolean;
  checkInAfter: boolean;
  checkOutBefore: boolean;
  price: boolean;
  lat: boolean;
  lng: boolean;
  contactName: boolean;
  contactPhoneNumber: boolean;
  contactEmail: boolean;
  inspectionDate: boolean;
  inspectionTime: boolean;
  cautionFee: boolean;
}

export const defaultValues = {
  title: "",
  numberOfRooms: 0,
  maxNumberOfPeople: 0,
  description: "",
  files: [],
  typeOfProperty: "" as PropertyTypes,
  lat: "",
  lng: "",
  country: "nigeria",
  city: "",
  street: "",
  houseNumber: 0,
  zip: "",
  nearbyPlaces: [],
  ammenities: [],
  houseRules: [],
  checkInAfter: "",
  checkOutBefore: "",
  price: 0,
  contactName: "",
  contactPhoneNumber: "",
  contactEmail: "",
  inspectionDate: null,
  inspectionTime: "",
  cautionFee: 0,
};

export const defaultValidationValues = {
  title: false,
  numberOfRooms: false,
  maxNumberOfPeople: false,
  description: false,
  files: false,
  typeOfProperty: false,
  lat: false,
  lng: false,
  country: false,
  city: false,
  street: false,
  houseNumber: false,
  zip: false,
  nearbyPlaces: false,
  ammenities: false,
  houseRules: false,
  checkInAfter: false,
  checkOutBefore: false,
  price: false,
  contactName: false,
  contactPhoneNumber: false,
  contactEmail: false,
  inspectionDate: false,
  inspectionTime: false,
  cautionFee: false,
};
