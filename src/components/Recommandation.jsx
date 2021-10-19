import React from "react";
import { Divider } from "@patternfly/react-core";

import { NotFound } from "./NotFound.jsx";
import { UC4Banner } from "./UC4/UC4Banner.jsx";
import { UC4Recommandation } from "./UC4/UC4Recommandation/UC4Recommandation.jsx";

const unfinishedUC = [1, 2, 3];

function Recommandation({ compProps }) {
  const { activeUC } = compProps;
  if (unfinishedUC.includes(activeUC)) {
    return <NotFound />;
  }
  return (
    <div>
      <UC4Banner componentName="Recommandations" />
      <Divider component="div" />
      <UC4Recommandation />
    </div>
  );
}

export { Recommandation };
