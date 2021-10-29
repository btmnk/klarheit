import { useGlobalState } from "./useGlobalState";

export const useAppName = (): string => {
  return useGlobalState().appName;
};
