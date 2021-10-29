import React from "react";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";

import { Store } from "../store/store";
import { Router } from "../Router";

import "../i18n/i18n";
import "./Theme.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <Router />
      </Provider>
    </QueryClientProvider>
  );
};

export { App };
