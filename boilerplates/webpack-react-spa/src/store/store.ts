import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { RootReducer } from "./rootReducer";

// eslint-disable-next-line no-var
declare var __DEV: boolean;

export const Store = configureStore({
  reducer: RootReducer,
  devTools: __DEV,
});

export type AppDispatch = typeof Store.dispatch;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();
