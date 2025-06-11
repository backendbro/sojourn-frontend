import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type PromptPayloadType = "open" | "closed";

const initialState: {
  status: PromptPayloadType;
  question: string;
  id?: string;
  page?: "booking" | "inspection";
} = {
  status: "closed",
  question: "",
  page: "booking",
};

export const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    openPrompt(state, action: PayloadAction<PromptPayloadType>) {
      state.status = action.payload;
    },

    setPromptQuestion(state, action: PayloadAction<string>) {
      state.question = action.payload;
    },

    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },

    setPage(state, action: PayloadAction<"booking" | "inspection">) {
      state.page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPromptQuestion, setId, openPrompt, setPage } =
  promptSlice.actions;

export default promptSlice.reducer;
