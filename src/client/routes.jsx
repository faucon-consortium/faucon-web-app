import React from "react";
import { Route, Switch } from "react-router-dom";
import { Alert, PageSection } from "@patternfly/react-core";
import {
  LastLocationProvider,
  useLastLocation,
} from "react-router-last-location";
import { DynamicImport } from "./utils/DynamicImport";
import { accessibleRouteChangeHandler } from "./utils/utils";
import { Dashboard } from "./components/Dashboard";
import { NotFound } from "./components/NotFound";
import { useDocumentTitle } from "./utils/useDocumentTitle";

let routeFocusTimer;

const getSupportModuleAsync = () => () => import("./components/Support");

const Support = (routeProps) => {
  const lastNavigation = useLastLocation();
  return (
    <DynamicImport
      load={getSupportModuleAsync()}
      focusContentAfterMount={lastNavigation !== null}
    >
      {(Component) => {
        let loadedComponent;
        if (Component === null) {
          loadedComponent = (
            <PageSection aria-label="Loading Content Container">
              <div className="pf-l-bullseye">
                <Alert title="Loading" className="pf-l-bullseye__item" />
              </div>
            </PageSection>
          );
        } else {
          loadedComponent = <Component.Support {...routeProps} />;
        }
        return loadedComponent;
      }}
    </DynamicImport>
  );
};

const routes = [
  {
    component: Dashboard,
    exact: true,
    label: "Dashboard",
    path: "/",
    title: "Faucon | Main Dashboard",
  },
  {
    component: Support,
    exact: true,
    isAsync: true,
    label: "Support",
    path: "/support",
    title: "Faucon | Support Page",
  },
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
const useA11yRouteChange = (isAsync) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
};

const RouteWithTitleUpdates = ({
  component: Component,
  isAsync = false,
  title,
  ...rest
}) => {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  function routeWithTitle(routeProps) {
    return <Component {...rest} {...routeProps} />;
  }
  return <Route render={routeWithTitle} />;
};

const PageNotFound = ({ title }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const AppRoutes = (props) => (
  <LastLocationProvider>
    <Switch>
      {routes.map(({ path, exact, component, title, isAsync }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          title={title}
          isAsync={isAsync}
          compProps={props}
        />
      ))}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };
