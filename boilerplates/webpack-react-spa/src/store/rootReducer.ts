import { combineReducers } from "@reduxjs/toolkit";

import { GlobalReducer } from "./Global/GlobalReducer";

export const RootReducer = combineReducers({
  global: GlobalReducer,
});
