import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedbackState, FeedbackStateType } from "../../feedbackState";

const initialState = {
  type: FeedbackStateType.Message,
  message: "",
  visible: false
};

export const feedbackStateSlice = createSlice({
  name: "feedbackState",
  initialState,
  reducers: {
    hideFeedbackState: (state) => {
      state.visible = false;
    },
    showFeedbackState: (state, action: PayloadAction<FeedbackState>) => {
      state.type = action.payload.type;
      state.message = action.payload.type === FeedbackStateType.Loading ? "" : action.payload.message;
      state.visible = true;
    }
  }
});

export const { hideFeedbackState, showFeedbackState } = feedbackStateSlice.actions
export const feedbackStateReducer = feedbackStateSlice.reducer;
