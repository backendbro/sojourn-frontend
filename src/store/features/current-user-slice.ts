import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Me = {
  firstName: string;
  lastName: string;
  photo: string;
  id: string;
  host: any;
  user: any;
  userProfileComplete: boolean;
  hostProfileComplete: boolean;
};

export interface IHost {
  loggedIn: boolean;
  me: Me;
}

const initialState: IHost = {
  loggedIn: false,
  me: { firstName: "", lastName: "", photo: "", id: "" } as Me,
};

export const currentUserSlice = createSlice({
  name: "host",
  initialState,
  reducers: {
    setLoggedInStatus(state, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
    },

    setMe(state, action: PayloadAction<Me>) {
      state.me = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedInStatus, setMe } = currentUserSlice.actions;

export default currentUserSlice.reducer;
