import React from "react";
import { NavLink } from "react-router-dom";
import { Alert, PageSection } from "@patternfly/react-core";

function NotFound() {
  return (
    <PageSection>
      <Alert variant="danger" title="404! This view hasn't been created yet." />
      <br />
      <NavLink to="/">Take me home</NavLink>
    </PageSection>
  );
}

export { NotFound };
