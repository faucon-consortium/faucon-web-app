import React from "react";
import { Divider } from "@patternfly/react-core";

import { NotFound } from "./NotFound.jsx";
import { UC4Banner } from "./UC4/UC4Banner.jsx";
import { UC4Community } from "./UC4/UC4Community/UC4Community.jsx";

const unfinishedUC = [1, 2, 3];

function Community({ compProps }) {
  const { activeUC } = compProps;
  if (unfinishedUC.includes(activeUC)) {
    return <NotFound />;
  }
  return (
    <div>
      <UC4Banner componentName="Community" />
      <Divider component="div" />
      <UC4Community />
    </div>
  );
}

export { Community };
