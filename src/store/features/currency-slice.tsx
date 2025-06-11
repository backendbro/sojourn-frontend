import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CurrencyType = "NGN" | "USD";

const initialState: {
  currency: CurrencyType;
} = {
  currency: "NGN",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<CurrencyType>) {
      state.currency = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
