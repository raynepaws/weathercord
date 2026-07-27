import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "$/modals";

const initialState = {
  [ModalType.AccountSettings]: false,
  [ModalType.CreateModal]: false,
  [ModalType.SignUp]: false
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    closeModal: (state, action: PayloadAction<ModalType>) => {
      state[action.payload] = false;
    },
    openModal: (state, action: PayloadAction<ModalType>) => {
      state[action.payload] = true;
    }
  }
});

export const { closeModal, openModal } = modalSlice.actions
export const modalReducer = modalSlice.reducer;
