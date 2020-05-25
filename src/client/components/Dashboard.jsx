import React from "react";
import PropTypes from "prop-types";
import { PageSection, Title } from "@patternfly/react-core";

function Dashboard({ compProps }) {
  const { activeUC } = compProps;
  return (
    <PageSection>
      <Title headingLevel="h1" size="lg">
        Dashboard Page Title for UC {activeUC}
      </Title>
    </PageSection>
  );
}

Dashboard.defaultProps = {
  compProps: null,
};

Dashboard.propTypes = {
  compProps: PropTypes.shape({ activeUC: PropTypes.number.isRequired }),
};

export { Dashboard };
