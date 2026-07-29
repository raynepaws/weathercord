import { Station } from "@/db/schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  stations: [] as Station[]
};

export const stationSlice = createSlice({
  name: "stations",
  initialState,
  reducers: {
    setStations: (state, action: PayloadAction<Station[]>) => {
      state.stations = action.payload;
    }
  }
});

export const { setStations } = stationSlice.actions
export const stationReducer = stationSlice.reducer;
