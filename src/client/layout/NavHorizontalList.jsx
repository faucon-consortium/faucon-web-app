import React from "react";
import PropTypes from "prop-types";

import { Nav, NavList, NavItem, NavVariants } from "@patternfly/react-core";

class NavHorizontalList extends React.Component {
  constructor(props) {
    super(props);
    const { changeUCCallback } = props;
    this.state = {
      activeItem: 1,
    };
    this.onSelect = (result) => {
      this.setState({
        activeItem: result.itemId,
      });
      if (changeUCCallback) changeUCCallback(result.itemId);
    };
  }

  render() {
    const { activeItem } = this.state;
    const nav = (
      <Nav onSelect={this.onSelect}>
        <NavList variant={NavVariants.horizontal}>
          <NavItem key={1} itemId={1} isActive={activeItem === 1}>
            Use Case 1
          </NavItem>
          <NavItem key={2} itemId={2} isActive={activeItem === 2}>
            Use Case 2
          </NavItem>
          <NavItem key={3} itemId={3} isActive={activeItem === 3}>
            Use Case 3
          </NavItem>
          <NavItem key={4} itemId={4} isActive={activeItem === 4}>
            Use Case 4
          </NavItem>
        </NavList>
      </Nav>
    );
    return nav;
  }
}

NavHorizontalList.defaultProps = {
  changeUCCallback: null,
};

NavHorizontalList.propTypes = {
  changeUCCallback: PropTypes.func,
};

export { NavHorizontalList };
