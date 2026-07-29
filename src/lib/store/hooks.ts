import { accountReducer } from "./reducers/account";
import { configureStore } from "@reduxjs/toolkit";
import { guiReducer } from "./reducers/gui";
import { stationReducer } from "./reducers/stations";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    gui: guiReducer,
    stations: stationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
