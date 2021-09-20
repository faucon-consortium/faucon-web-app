import React from "react";
import {
  Grid,
  GridItem,
  Divider,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
} from "@patternfly/react-core";

import { NotFound } from "./NotFound.jsx";
// import { GridTest } from "./TestGrid.jsx";

import BnF from "../assets/bnf.png";
import Faucon from "../assets/faucon.png";
import { UC4Stats } from "./UC4/Stats.jsx";

const unfinishedUC = [1, 2, 3];

function Banner() {
  return (
    <div>
      <PageSection variant={PageSectionVariants.light}>
        <Grid style={{ marginLeft: "5%" }}>
          <GridItem
            span={6}
            style={{
              textAlign: "right",
              padding: "5px",
              // backgroundColor: "red",
            }}
          >
            <img
              src={BnF}
              className="logo"
              alt="BnF logo"
              style={{
                height: "80px",
              }}
            />
          </GridItem>
          <GridItem
            span={6}
            style={{
              textAlign: "left",
              padding: "5px",
              // backgroundColor: "green",
            }}
          >
            <img
              src={Faucon}
              className="logo"
              alt="Faucon logo"
              style={{
                height: "80px",
                width: "110px",
              }}
            />
          </GridItem>
        </Grid>
        <TextContent style={{ textAlign: "center" }}>
          <Text component="h1">Dashboard principal</Text>
        </TextContent>
      </PageSection>
      <Divider component="div" />
      <div style={{ textAlign: "center", height: "30vw", paddingTop: "2em" }}>
        <UC4Stats />{" "}
      </div>
    </div>
  );
}

function Dashboard({ compProps }) {
  const { activeUC } = compProps;
  if (unfinishedUC.includes(activeUC)) {
    return <NotFound />;
  }
  return (
    <div>
      <Banner />
      <Divider component="div" />
    </div>
  );
}

export { Dashboard };
