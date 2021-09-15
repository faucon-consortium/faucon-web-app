import React from "react";
import { BrowserRouter } from "react-router-dom";

import { AppLayout } from "../layout/AppLayout.jsx";
import { AppRoutes } from "../routes.jsx";

import "@patternfly/patternfly/patternfly.css";
// import "@patternfly/react-core/dist/styles/base.css";
import "../app.css";

export default class Root extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <AppLayout>{AppRoutes}</AppLayout>
      </BrowserRouter>
    );
  }
}
