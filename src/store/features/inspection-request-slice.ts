import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FormStates =
  | "section-1"
  | "section-2"
  | "section-3"
  | "section-4"
  | "section-5"
  | "section-6"
  | "section-7"
  | "section-8"
  | "section-9"
  | "section-10"
  | "section-11"
  | "section-12"
  | "section-13";

export interface InspectionState {
  formOpen: boolean;
}

const initialState: InspectionState = {
  formOpen: false,
};

export const inspectionSlice = createSlice({
  name: "inspection",
  initialState,
  reducers: {
    openForm: (state) => {
      state.formOpen = true;
    },
    closeForm: (state) => {
      state.formOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openForm, closeForm } = inspectionSlice.actions;

export default inspectionSlice.reducer;
