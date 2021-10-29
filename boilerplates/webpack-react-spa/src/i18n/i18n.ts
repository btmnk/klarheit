import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./en";

export const defaultNS = "common";
export const translations = { en };

i18next.use(initReactI18next).init({
  resources: translations,
  lng: "en",
  fallbackLng: "en",
  ns: [defaultNS, "landing"],
  defaultNS,

  interpolation: {
    escapeValue: false,
  },
});
