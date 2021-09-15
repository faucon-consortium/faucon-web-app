import React from "react";
import { Grid, GridItem } from "@patternfly/react-core";

import { NotFound } from "./NotFound.jsx";

import BnF from "../assets/bnf.png";
import Faucon from "../assets/faucon.png";

const unfinishedUC = [1, 2, 3];

function Dashboard({ compProps }) {
  const { activeUC } = compProps;
  if (unfinishedUC.includes(activeUC)) {
    return <NotFound />;
  }
  return (
    <Grid>
      <GridItem span={6} style={{ textAlign: "right" }}>
        <img src={BnF} className="logo" alt="BnF logo" />
      </GridItem>
      <GridItem span={6} style={{ textAlign: "left" }}>
        <img src={Faucon} className="logo" alt="Faucon logo" />
      </GridItem>
    </Grid>
  );
}

export { Dashboard };
