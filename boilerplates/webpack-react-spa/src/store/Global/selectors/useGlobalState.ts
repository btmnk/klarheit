import { useSelector } from "react-redux";

import { RootState } from "../../RootState";
import { GlobalState } from "../GlobalState";

export const useGlobalState = (): GlobalState => {
  return useSelector<RootState, GlobalState>((state) => state.global);
};
