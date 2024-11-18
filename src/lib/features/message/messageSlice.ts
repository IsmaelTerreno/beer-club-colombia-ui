import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { MessageState } from "@/lib/features/message/message-state.dto";
import { SetMessageAction } from "@/lib/features/app/set-message-action.dto"; // Define the initial state using that type

// Define the initial state using that type
const initialState: MessageState = {
  currentMessage: null,
  open: false,
  severity: "info",
};

export const messageSlice = createSlice({
  name: "message",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setMessageApp: (state, action: PayloadAction<SetMessageAction>) => {
      state.currentMessage = action.payload.currentMessage;
      state.open = action.payload.open;
      state.severity = action.payload.severity;
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { setMessageApp, setOpen } = messageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentMessageDetails = (state: RootState) => state.message;

export default messageSlice.reducer;
