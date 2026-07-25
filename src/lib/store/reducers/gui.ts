import { combineReducers } from "@reduxjs/toolkit";
import { feedbackStateReducer } from "./feedbackState";
import { loadingReducer } from "./loading";
import { modalReducer } from "./modals";

export const guiReducer = combineReducers({
  feedbackState: feedbackStateReducer,
  loading: loadingReducer,
  modals: modalReducer
});
