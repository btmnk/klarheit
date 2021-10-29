import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialGlobalState } from "./GlobalState";

const GlobalSlice = createSlice({
  name: "global",
  initialState: initialGlobalState,
  reducers: {
    setAppName(state, action: PayloadAction<string>) {
      state.appName = action.payload;
    },
  },
});

export const GlobalReducer = GlobalSlice.reducer;
export const GlobalActions = GlobalSlice.actions;
