import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  PageSection,
  Title,
} from "@patternfly/react-core";

import { ResponsiveChartArea } from "./ResponsiveChartArea.jsx";
import { ResponsiveChartLine } from "./ResponsiveChartLine.jsx";
import { ResponsiveChartBullet } from "./ResponsiveChartBullet.jsx";

function SelectedCard() {
  return (
    <Card id="first-card" isSelected isSelectable>
      <CardHeader>Card</CardHeader>
      <CardBody>This is a card</CardBody>
    </Card>
  );
}

function GridTest() {
  return (
    <>
      <PageSection>
        <Title headingLevel="h1" size="xl" style={{ textAlign: "center" }}>
          Grid Test
        </Title>
      </PageSection>
      <Divider />
      <PageSection>
        <Grid gutter="md">
          <GridItem span={12} rowSpan={2}>
            <Title headingLevel="h3" size="lg">
              span = 12, rowSpan = 1
            </Title>
            <Flex justifyContent={{ default: "justifyContentSpaceBetween" }}>
              <FlexItem>
                <SelectedCard />
              </FlexItem>
              <FlexItem>
                <SelectedCard />
              </FlexItem>
              <FlexItem>
                <SelectedCard />
              </FlexItem>
              <FlexItem>
                <SelectedCard />
              </FlexItem>
              <FlexItem>
                <SelectedCard />
              </FlexItem>
            </Flex>
          </GridItem>
          <GridItem span={12} rowSpan={2}>
            <Title headingLevel="h3" size="lg">
              span = 12, rowSpan = 2
            </Title>
            <ResponsiveChartArea />
          </GridItem>
          <GridItem span={6} rowSpan={2}>
            <Title headingLevel="h3" size="lg">
              span = 6, rowSpan = 2
            </Title>
            <ResponsiveChartBullet />
          </GridItem>
          <GridItem span={6} rowSpan={2}>
            <Title headingLevel="h3" size="lg">
              span = 6, rowSpan = 2
            </Title>
            <ResponsiveChartLine />
          </GridItem>
        </Grid>
      </PageSection>
    </>
  );
}

GridTest.defaultProps = {
  compProps: null,
};

GridTest.propTypes = {
  compProps: PropTypes.shape({ activeUC: PropTypes.number.isRequired }),
};

export { GridTest };
