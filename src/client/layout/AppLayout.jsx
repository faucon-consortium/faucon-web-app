import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  Nav,
  NavList,
  NavItem,
  Page,
  PageHeader,
  PageSidebar,
  SkipToContent,
} from "@patternfly/react-core";

import { NavHorizontalList } from "./NavHorizontalList";
import { routes } from "../routes";
// import fauconlogo from "../media/faucon.svg";

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: true,
      isMobileView: true,
      isNavOpenMobile: true,
      activeUC: 1,
    };

    this.setActiveUC = this.setActiveUC.bind(this);
    this.setIsNavOpen = this.setIsNavOpen.bind(this);
    this.setIsMobileView = this.setIsMobileView.bind(this);
    this.setIsNavOpenMobile = this.setIsNavOpenMobile.bind(this);
  }

  setActiveUC(nextActiveUC) {
    this.setState({ activeUC: nextActiveUC });
  }

  setIsNavOpen(navOpen) {
    this.setState({ isNavOpen: navOpen });
  }

  setIsMobileView(mobileView) {
    this.setState({ isMobileView: mobileView });
  }

  setIsNavOpenMobile(navOpenMobile) {
    this.setState({ isNavOpenMobile: navOpenMobile });
  }

  render() {
    const logoProps = {
      href: "/",
    };
    const { isNavOpenMobile, isNavOpen, isMobileView, activeUC } = this.state;
    const onNavToggleMobile = () => {
      this.setIsNavOpenMobile(!isNavOpenMobile);
    };
    const onNavToggle = () => {
      this.setIsNavOpen(!isNavOpen);
    };
    const onPageResize = ({ mobileView }) => {
      this.setIsMobileView(mobileView);
    };

    const TopNave = <NavHorizontalList changeUCCallback={this.setActiveUC} />;

    const Header = (
      <PageHeader
        logo="Faucon"
        logoProps={logoProps}
        showNavToggle
        topNav={TopNave}
        isNavOpen={isNavOpen}
        onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
      />
    );

    const Navigation = (
      <Nav id="nav-primary-simple" theme="dark">
        <NavList id="nav-list-simple">
          {routes.map(
            (route, idx) =>
              route.label && (
                <NavItem
                  key={`${route.label}-${idx}`}
                  id={`${route.label}-${idx}`}
                >
                  <NavLink exact to={route.path} activeClassName="pf-m-current">
                    {route.label}
                  </NavLink>
                </NavItem>
              )
          )}
        </NavList>
      </Nav>
    );
    const Sidebar = (
      <PageSidebar
        theme="dark"
        nav={Navigation}
        isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen}
      />
    );
    const PageSkipToContent = (
      <SkipToContent href="#primary-app-container">
        Skip to Content
      </SkipToContent>
    );
    const { children } = this.props;
    const AppRoutes = children;
    return (
      <Page
        mainContainerId="primary-app-container"
        header={Header}
        sidebar={Sidebar}
        onPageResize={onPageResize}
        skipToContent={PageSkipToContent}
      >
        <AppRoutes activeUC={activeUC} />
      </Page>
    );
  }
}

AppLayout.defaultProps = {
  children: null,
};

AppLayout.propTypes = {
  children: PropTypes.func,
};

export { AppLayout };
