import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    }
  }
});

export const { startLoading, stopLoading } = loadingSlice.actions
export const loadingReducer = loadingSlice.reducer;
