import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isMobileSearchOpen: false,
};

export const mobileSearchSlice = createSlice({
  name: "host",
  initialState,
  reducers: {
    setMobileSearchStatus(state, action: PayloadAction<boolean>) {
      state.isMobileSearchOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMobileSearchStatus } = mobileSearchSlice.actions;

export default mobileSearchSlice.reducer;
