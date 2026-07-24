import { combineReducers } from "@reduxjs/toolkit";
import { modalReducer } from "./modals";
import { feedbackStateReducer } from "./feedbackState";

export const guiReducer = combineReducers({
  feedbackState: feedbackStateReducer,
  modals: modalReducer
});
