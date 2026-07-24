import { combineReducers } from "@reduxjs/toolkit";
import { modalReducer } from "./modals";

export const guiReducer = combineReducers({
  modals: modalReducer
});
