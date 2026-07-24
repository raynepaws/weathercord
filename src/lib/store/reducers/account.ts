import { AuthorizedAccountFromAPI } from "@/db/schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<AuthorizedAccountFromAPI> | null = {
  accent1: null,
  accent2: null,
  admin: false,
  avatar: "u/default/a",
  banner: "u/default/b",
  bio: null,
  connections: [],
  displayName: null,
  email: "",
  id: "",
  joined: 0,
  lang: "en-us",
  nameFont: null,
  pronouns: null,
  showLang: false,
  username: ""
};

export const accountSlice = createSlice({
  name: "feedbackState",
  initialState,
  reducers: {
    updateAccount: (state, action: PayloadAction<Partial<typeof initialState>>) => {
      if (state === null) state = {};
      for (const _key in action.payload) {
        const key = _key as keyof AuthorizedAccountFromAPI;
        // @ts-ignore why does it think `state[key]` is `never` when assigning??
        if (typeof action.payload[key] !== "undefined") state[key] = action.payload[key];
      }
    }
  }
});

export const { updateAccount } = accountSlice.actions
export const accountReducer = accountSlice.reducer;
