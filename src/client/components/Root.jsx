import React from "react";
// import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { AppRoutes } from "./routes";

import "@patternfly/patternfly/patternfly.css";
// import "@patternfly/react-core/dist/styles/base.css";
import "../app.css";

export default class Root extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </BrowserRouter>
    );
  }
}
