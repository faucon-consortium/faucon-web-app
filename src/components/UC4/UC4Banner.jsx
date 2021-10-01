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

import BnF from "../../assets/bnf.png";
import Faucon from "../../assets/faucon.png";

function UC4Banner({ componentName }) {
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
        <TextContent style={{ textAlign: "center", paddingTop: "1em" }}>
          <Text component="h1">{componentName}</Text>
        </TextContent>
      </PageSection>
      <Divider component="div" />
    </div>
  );
}

export { UC4Banner };
