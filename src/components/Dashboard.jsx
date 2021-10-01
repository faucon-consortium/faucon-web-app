import React from "react";
import { Divider } from "@patternfly/react-core";

import { NotFound } from "./NotFound.jsx";
import { UC4Banner } from "./UC4/UC4Banner.jsx";

const unfinishedUC = [1, 2, 3];

function Dashboard({ compProps }) {
  const { activeUC } = compProps;
  if (unfinishedUC.includes(activeUC)) {
    return <NotFound />;
  }
  return (
    <div>
      <UC4Banner componentName="Dashboard" />
      <Divider component="div" />
    </div>
  );
}

export { Dashboard };
