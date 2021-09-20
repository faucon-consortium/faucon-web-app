import React from "react";
import { Spinner, Skeleton } from "@patternfly/react-core";

class UC4Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ploup: true };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { ploup } = this.state;
    return ploup ? (
      <Spinner isSVG />
    ) : (
      <Skeleton screenreaderText="Loading contents" />
    );
  }
}

export { UC4Stats };
