import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Flex,
  FlexItem,
  FlexModifiers,
  Grid,
  GridItem,
  PageSection,
  Title,
} from "@patternfly/react-core";

import { ResponsiveChartArea } from "./ResponsiveChartArea";
import { ResponsiveChartLine } from "./ResponsiveChartLine";
import { ResponsiveChartBullet } from "./ResponsiveChartBullet";

function SelectedCard() {
  return (
    <Card id="first-card" isSelected isSelectable>
      <CardHeader>Card</CardHeader>
      <CardBody>This is a card</CardBody>
    </Card>
  );
}

function Dashboard({ compProps }) {
  const { activeUC } = compProps;
  return (
    <React.Fragment>
      <PageSection>
        <Title headingLevel="h1" size="xl" style={{ textAlign: "center" }}>
          Dashboard for Usecase {activeUC}
        </Title>
      </PageSection>
      <Divider />
      <PageSection>
        <Grid gutter="md">
          <GridItem span={12} rowSpan={2}>
            <Title headingLevel="h3" size="lg">
              span = 12, rowSpan = 1
            </Title>
            <Flex
              breakpointMods={[
                { modifier: FlexModifiers["justify-content-center"] },
              ]}
            >
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
    </React.Fragment>
  );
}

Dashboard.defaultProps = {
  compProps: null,
};

Dashboard.propTypes = {
  compProps: PropTypes.shape({ activeUC: PropTypes.number.isRequired }),
};

export { Dashboard };
