import React from "react";
import { Spinner, Skeleton, Bullseye } from "@patternfly/react-core";

class UC4Recommandation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ploup: true };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { ploup } = this.state;
    return ploup ? (
      <Bullseye style={{ paddingTop: "20em" }}>
        <Spinner size="xl" />
      </Bullseye>
    ) : (
      <Skeleton screenreaderText="Loading contents" />
    );
  }
}

export { UC4Recommandation };
