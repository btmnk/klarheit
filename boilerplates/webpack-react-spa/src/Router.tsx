import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { LoadingIndicator } from "./ui/components/LoadingIndicator/LoadingIndicator";

const NotFoundPage = React.lazy(() => import("./ui/pages/NotFound/NotFoundPage"));
const LandingPage = React.lazy(() => import("./ui/pages/Landing/LandingPage"));

export enum RoutePath {
  LANDING = "/",
}

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<LoadingIndicator />}>
        <Switch>
          <Route path={RoutePath.LANDING} component={LandingPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export { Router };
