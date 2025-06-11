import { ContactUsType } from "@/types/emails";
import { CreateTicketType, MessageType } from "@/types/messages";
import { PaymentDataType, SubscriptionPaymentDataType } from "@/types/payments";
import {
  Inspection,
  Property,
  PropertySearchQueriesKeys,
} from "@/types/properties";
import { CreateReview } from "@/types/reviews";
import {
  LoginUserType,
  AccountCreation,
  HostAccountCreation,
  IWithdrawal,
  NINVerifcationType,
} from "@/types/users";
import { BankAccount, WalletType, Withdraw } from "@/types/wallet";
import axios, { AxiosError } from "axios";

const SEAMFIX_URL = "https://api.verified.africa/sfx-verify/v3/id-service/";

const api = axios.create({
  baseURL: "/api",
  timeout: 1000000,
  withCredentials: true,
  headers: {
    "x-user-type": "user",
  },
});

const http = axios.create({
  baseURL: SEAMFIX_URL,
  timeout: 1000000,
});

let csrfToken: string | null = null;

// api.interceptors.request.use(async (config) => {
//   if (!csrfToken) {
//     try {
//       const res = await api.get("/auth/csrf-token", { withCredentials: true });
//       csrfToken = res.data.csrfToken;
//     } catch (err) {
//       console.error("Failed to get CSRF token:", err);
//     }
//   }

//   if (csrfToken) {
//     config.headers["X-CSRF-Token"] = csrfToken;
//   }

//   return config;
// });

api.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;

    if (!error) {
      return Promise.reject(
        new Error("sorry, we cannot login you in at this time.")
      );
    }

    console.log(error);

    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return api(originalRequest);
      } catch (apiError) {}
    }
    return Promise.reject(error);
  }
);

export async function getUsers() {
  const response = await api.get("/guests");
  return response.data;
}

async function refreshToken() {
  try {
    await api.get("/auth/refresh");
  } catch (error) {
    throw new Error("something went wrong");
  }
}
export async function loginHost(loginUser: LoginUserType) {
  try {
    const response = await api.post("/auth/hosts/login", loginUser);
    return response.data;
  } catch (error) {
    throw new Error(((error as AxiosError).response?.data as any).message);
  }
}

export async function login(loginUser: LoginUserType) {
  try {
    const response = await api.post("/auth/login", loginUser);
    if (response.status >= 400) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw new Error(((error as AxiosError).response?.data as any).message);
  }
}

export async function signupHost(signupUser: HostAccountCreation) {
  try {
    const response = await api.post("/auth/hosts/signup", signupUser);
    return response.data;
  } catch (error) {
    throw new Error(((error as AxiosError).response?.data as any).message);
  }
}

export async function doesUserExists(email: string) {
  try {
    const response = await api.post("hosts/me", { email });
    return response.data;
  } catch (error) {
    throw new Error(((error as AxiosError).response?.data as any).message);
  }
}

export async function signup(
  signupUser: AccountCreation & { isEmailVerfied?: boolean; isGoogle?: boolean }
) {
  let url = "/auth/signup";
  if (signupUser.isGoogle) {
    delete signupUser.password;
    url = "/auth/google/signup";
  }
  try {
    const response = await api.post(url, signupUser);
    return response.data;
  } catch (error) {
    throw new Error(((error as AxiosError).response?.data as any).message);
  }
}

export async function me(user: string = "hosts") {
  const url = `/${user}/me`;
  const response = await api.get(url);
  return response.data;
}

export async function logoutHost() {
  const response = await api.get("/auth/logout");
  return response.status;
}

export async function getProperties(id: string) {
  const response = await api.get(`/properties/hosts/${id}`);
  return response.data;
}

export async function getInspections(id: string) {
  const response = await api.get(`/properties/hosts/inspection/${id}`);
  return response.data;
}

export async function createInspection(inpsection: FormData) {
  const response = await api.post("/properties/hosts/inspection", inpsection, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function getAllCities() {
  const response = await api.get("/properties/recommended?limit=0");
  return response.data;
}

export async function searchProperties(params: PropertySearchQueriesKeys) {
  const response = await api.get(
    `/properties?city=${params.city}&checkInDate=${
      params.checkInDate
    }&checkOutDate=${params.checkOutDate}&children=${params.children}&adults=${
      params.adults
    }&cursor=${+String(params.cursor).trim()}
    &typesOfProperty=${params.typesOfProperty}
    &numberOfRooms=${params.numberOfRooms}
    &price=${params.price ? +params.price : null}&amenities=${params.amenities}
    `
  );
  return response.data;
}

export async function getPropertyById(id: string) {
  const response = await api.get(`/properties/${id}`);
  return response.data;
}

export async function getInspectionById(id: string) {
  const response = await api.get(`/properties/inspection/${id}`);
  return response.data;
}

export async function cancelInspectionById(inspectionId: string) {
  const response = await api.put("/properties/hosts/inspection/cancel", {
    inspectionId,
  });
  return response.data;
}

export async function getRecommendedPropertiesByCityName(
  city: string,
  limit: number
) {
  const response = await api.get(
    `/properties/recommended/${city}/?limit=${limit}`
  );
  return response.data;
}

export async function getRecommendedCities() {
  const response = await api.get("/properties/recommended?limit=4");
  return response.data;
}

export async function getPropertyMapPosition(address: string) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          key: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY,
        },
      }
    );

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return location;
    } else {
      throw new Error("Geocoding failed: " + response.data.status);
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateProperty(data: FormData) {
  const response = await api.put("/properties/hosts/update", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function updateInspection(data: FormData) {
  const response = await api.put("/properties/hosts/inspection/update", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function updatePropertyWithoutPhotos(data: Partial<Property>) {
  const response = await api.post("/properties/hosts/update", data);
  return response.data;
}

export async function updateInspectionWithoutPhotos(data: Partial<Inspection>) {
  const response = await api.post("/properties/hosts/inspection/update", data);
  return response.data;
}

export async function checkListingAvailability(query: string) {
  const response = await api.get(`/bookings?${query}`);
  return response.data;
}

export async function getBookingsByHostId(id: string) {
  const response = await api.get(`/bookings/hosts/${id}`);
  return response.data;
}

export async function getBookingsByUserId(id: string) {
  const response = await api.get(`/bookings/guests/${id}`);
  return response.data;
}

export async function getBookingById(id: string) {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
}

export async function getHostBookingById(id: string) {
  const response = await api.get(`/bookings/hosts/booking/${id}`);
  return response.data;
}

export async function cancelBooking(id: string) {
  const response = await api.put(`/bookings/cancel`, { id });
  return response.data;
}

export async function addAccountDetails(wallet: WalletType) {
  const response = await api.post(`/wallet`, wallet);
  return response.data;
}

export async function getWalletRecordsByHostId(hostId: string) {
  const response = await api.get(`/wallet/hosts/${hostId}`);
  return response.data;
}

export async function getWalletRecordsByUserId(id: string) {
  const response = await api.get(`/wallet/guests/${id}`);
  return response.data;
}

export async function getWalletById(id: string) {
  const response = await api.get(`/wallet/${id}`);
  return response.data;
}

export async function withdraw(data: Withdraw) {
  const response = await api.post(`/wallet/withdraw`, data);
  return response.data;
}

export async function getWalletPayentById(id: string) {
  const response = await api.get(`/wallet/payment/${id}`);
  return response.data;
}

export async function getMessagesByHostId(id: string) {
  const response = await api.get(`/messages/hosts/${id}`);
  return response.data;
}

export async function getMessagesByGuestId(id: string) {
  const response = await api.get(`/messages/guests/${id}`);
  return response.data;
}

export async function getTicketMessages(id: string) {
  const response = await api.get(`/messages/ticket/${id}`);
  return response.data;
}

export async function sendMessage(message: MessageType) {
  const response = await api.post(`/messages`, message);
  return response.data;
}

export async function createTicket(ticket: CreateTicketType) {
  const response = await api.post("/messages/guests/ticket/create", ticket);
  return response.data;
}

export async function getProfileHostById(id: string) {
  const response = await api.get(`/hosts/profile/${id}`);
  return response.data;
}

export async function getUserProfileById(id: string) {
  const response = await api.get(`/guests/profile/${id}`);
  return response.data;
}

export async function updateHostById(host: FormData) {
  const response = await api.put(`/hosts/profile/update`, host, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function updateUserById(user: FormData) {
  const response = await api.put(`/guests/profile/update`, user, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function getAccountNumbers(hostId: string) {
  const response = await api.get(`/wallet/account/${hostId}`);
  return response.data;
}

export async function addtAccountNumber(payload: BankAccount) {
  const response = await api.post(`/wallet/account`, payload);
  return response.data;
}

export async function deleteAccountById(id: string) {
  const response = await api.delete(`/wallet/account/${id}`);
  return response.data;
}

export async function getAccountByUserId(id: string) {
  const response = await api.get(`/wallet/account/user/${id}`);
  return response.data;
}

export async function pay(data: PaymentDataType) {
  const response = await api.post(`/payments/initialize`, data);
  return response.data;
}

export async function paySubscription(data: SubscriptionPaymentDataType) {
  const response = await api.post(`/payments/subscription/initialize`, data);
  return response.data;
}

export async function payWithCrypto(data: PaymentDataType) {
  const response = await api.post(`/payments/crypto/initialize`, data);
  return response.data;
}

export async function verify(reference: string) {
  const response = await api.get(`/payments/verify?reference=${reference}`);
  return response.data;
}

export async function addToWishList(data: {
  userId: string;
  propertyId: string;
}) {
  const response = await api.post("/wishlist", data);
  return response.data;
}

export async function getSojournCreditsByUserId(id: string) {
  const response = await api.get(`/wallet/guests/credits/${id}`);
  return response.data;
}

export async function getReferalsByRefererId(id: string) {
  const response = await api.get(`/referals/${id}`);
  return response.data;
}

export async function getReferalById(id: string) {
  const response = await api.get(`/referals/referal/${id}`);
  return response.data;
}

export async function submitReferalWithrawal(data: IWithdrawal) {
  const response = await api.post(`/referals`, data);
  return response.data;
}

export async function getWishListByUserId(id: string) {
  const response = await api.get(`/wishlist/user/${id}`);
  return response.data;
}

export async function verifyEmail(id: string, code: string) {
  const response = await api.post("/auth/verify", { code, id });
  return response.data;
}

export async function resendEmailConfirmation(email: string) {
  const response = await api.post("/auth/resend-email", { email });
  return response.data;
}

export async function passwordReset(email: string) {
  const response = await api.post("/auth/reset-password", { email });
  return response.data;
}

export async function passwordResetConfirmation(data: {
  id: string;
  code: string;
  password: string;
}) {
  const response = await api.post("/auth/reset-password/confirm", data);
  return response.data;
}

export async function getTotalSojournCredits(id: string) {
  const response = await api.get(`/wallet/credit/${id}`);
  return response.data;
}

export async function transferSojournCredits(body: {
  email: string;
  amount: number;
  userId: string;
}) {
  const response = await api.post(`/wallet/credit/transfer`, body);
  return response.data;
}

// new — calls your own backend instead
export async function getGoogleUser(access_token: string) {
  console.log("Got to here");
  const response = await api.post(
    `https://sojourn-backend-api-xk5x.onrender.com/api/v1/google/userinfo`,
    { access_token },
    { withCredentials: true }
  );
  return response.data;
}

// export async function getGoogleUser(access_token: string) {

//   const response = await api.get(
//     `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
//     {
//       withCredentials: false,
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//         Accept: "application/json",
//       },
//     }
//   );

//   return response.data;
// }

export async function loginWithGoogle(email: string) {
  const response = await api.post("/auth/google/login", { email });
  return response.data;
}

export async function verfiyNIN(body: NINVerifcationType) {
  try {
    const response = await http.post("/", body, {
      headers: {
        userId: process.env.NEXT_PUBLIC_SEAMFIX_USER_ID,
        apiKey: process.env.NEXT_PUBLIC_SEAMFIX_API_KEY,
      },
    });

    return response.data;
  } catch (error) {}
}

export async function verifyCryptoPayment(paymentId: string) {
  const response = await api.get(
    `payments/crypto/transaction/status?payment_id=${paymentId} `,
    {}
  );
  return response;
}

export async function getSubscriptionsById(hostId: string) {
  const response = await api.get(`/subscriptions/${hostId}`);
  return response.data;
}

export async function getSubscriptionPaymentsById(hostId: string) {
  const response = await api.get(`/subscriptions/payments/${hostId}`);
  return response.data;
}

export async function cancelSubscriptionById(id: string) {
  const response = await api.get(`/subscriptions/cancel/${id}`);
  return response.data;
}

export async function upgradeSubscription(body: SubscriptionPaymentDataType) {
  const response = await api.post(`/subscriptions/upgrade`, body);
  return response.data;
}

export async function contactUs(body: ContactUsType) {
  const response = await api.post(`/email/contact-us`, body);
  return response.data;
}

export async function getReviews() {
  const response = await api.get("/reviews");
  return response.data;
}

export async function createReview(review: CreateReview) {
  const response = await api.post("/reviews", review);
  return response.data;
}

export async function getRate() {
  const response = await api.get("/payments/rate");
  return response.data;
}

export async function updatePassword({
  oldPassword,
  password,
}: {
  oldPassword: string;
  password: string;
}) {
  const response = await api.put("/auth/user/update-password", {
    password,
    oldPassword,
  });
  return response.data;
}

export async function downloadHostBookingInvoice(id: string) {
  const response = await api.get(`/bookings/host/invoice/${id}`, {
    responseType: "arraybuffer",
    headers: {
      Accept: "application/pdf",
    },
  });
  return response.data;
}

export async function downloadGuestBookingInvoice(id: string) {
  const response = await api.get(`/bookings/guest/invoice/${id}`, {
    responseType: "arraybuffer",
    headers: {
      Accept: "application/pdf",
    },
  });
  return response.data;
}
