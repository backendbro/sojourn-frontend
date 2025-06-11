import { configureStore } from "@reduxjs/toolkit";
import inspectionRequestSlice from "./features/inspection-request-slice";
import currentUserSlice from "./features/current-user-slice";
import mobileSearchSlice from "./features/mobile-search-slice";
import promptSlice from "./features/prompt-slice";
import currencySlice from "./features/currency-slice";

export const store = configureStore({
  reducer: {
    inspection: inspectionRequestSlice,
    user: currentUserSlice,
    mobileSearch: mobileSearchSlice,
    prompt: promptSlice,
    currency: currencySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
