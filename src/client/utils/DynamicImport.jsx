import React from "react";
import { accessibleRouteChangeHandler } from "./utils";

class DynamicImport extends React.Component {
  constructor(props) {
    super(props);
    this.routeFocusTimer = 0;
    this.state = { component: null };
  }

  componentDidMount() {
    const { load, focusContentAfterMount } = this.props;
    load()
      .then((component) => {
        if (component) {
          this.setState({
            component: component.default ? component.default : component,
          });
        }
      })
      .then(() => {
        if (focusContentAfterMount) {
          this.routeFocusTimer = accessibleRouteChangeHandler();
        }
      });
  }

  render() {
    const { children } = this.props;
    const { component } = this.state;
    return children(component);
  }
}

export { DynamicImport };
