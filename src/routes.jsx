import React from "react";
import { Route, Switch } from "react-router-dom";
import { NotFound } from "./components/NotFound.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { Community } from "./components/Community.jsx";

const routes = [
  {
    component: Dashboard,
    exact: true,
    label: "Dashboard",
    path: "/",
    title: "Faucon | Main Dashboard",
  },
  {
    component: NotFound,
    exact: true,
    label: "Component 2",
    path: "/c2",
    title: "Faucon | Component 2",
  },
  {
    component: NotFound,
    exact: true,
    label: "Component 3",
    path: "/c3",
    title: "Faucon | Component 3",
  },
  {
    component: Community,
    exact: true,
    label: "Communities",
    path: "/community",
    title: "Faucon | Communities",
  },
];

function useDocumentTitle(title) {
  React.useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}

const PageNotFound = ({ title }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const RouteWithTitleUpdates = ({ component: Component, title, ...rest }) => {
  useDocumentTitle(title);
  return (
    <Route render={(routeProps) => <Component {...rest} {...routeProps} />} />
  );
};

const AppRoutes = (props) => (
  <Switch>
    {routes.map(({ path, exact, component, title }, idx) => (
      <RouteWithTitleUpdates
        path={path}
        exact={exact}
        component={component}
        key={idx}
        title={title}
        compProps={props}
      />
    ))}
    <PageNotFound title="404 Page Not Found" />
  </Switch>
);

export { AppRoutes, routes };
