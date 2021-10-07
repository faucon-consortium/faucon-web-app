import React from "react";
import {
  List,
  ListItem,
  Tabs,
  Tab,
  TabTitleText,
  TabTitleIcon,
  HelperText,
  HelperTextItem,
  Grid,
  GridItem,
} from "@patternfly/react-core";

import CatalogIcon from "@patternfly/react-icons/dist/esm/icons/catalog-icon";
import NetworkIcon from "@patternfly/react-icons/dist/esm/icons/network-icon";
import DatabaseIcon from "@patternfly/react-icons/dist/esm/icons/people-arrows-icon";
import ExclamationIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-icon";

import { UC4CommunityVisu } from "./UC4CommunityVisu.jsx";

class UC4Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: null, activeTabKey: 0, isBox: true };

    // Toggle currently active tab
    this.handleTabClick = (event, tabIndex) => {
      this.setState({
        activeTabKey: tabIndex,
      });
    };

    this.toggleBox = (checked) => {
      this.setState({
        isBox: checked,
      });
    };
  }

  componentDidMount() {
    this.fileList();
  }

  componentWillUnmount() {}

  fileList() {
    fetch("http://localhost:5002/filelist")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ files: data });
      })
      .catch(console.log);
  }

  errorFiles(message) {
    return (
      <Grid style={{ paddingTop: "1em" }}>
        <GridItem span={5} />
        <GridItem span={2}>
          <HelperText>
            <HelperTextItem variant="warning" icon={<ExclamationIcon />}>
              {message}
            </HelperTextItem>
          </HelperText>
        </GridItem>
        <GridItem span={5} />
      </Grid>
    );
  }

  render() {
    const { files, activeTabKey, isBox } = this.state;
    let res = null;
    if (files != null) {
      if (Object.prototype.hasOwnProperty.call(files, "message")) {
        res = this.errorFiles(`No files found, error ${files.message}`);
      }
      console.assert(Object.prototype.hasOwnProperty.call(files, "result"));
      const { result } = files;
      if (Array.isArray(result)) {
        res = (
          <List isPlain isBordered>
            {result.map((file, idx) => (
              <ListItem key={idx}>{file}</ListItem>
            ))}
          </List>
        );
      } else {
        res = this.errorFiles(`No files found, error ${result}`);
      }
    } else {
      res = this.errorFiles("No files found");
    }
    return (
      <div>
        <UC4CommunityVisu />
        {/* <Tabs
          isFilled
          activeKey={activeTabKey}
          onSelect={this.handleTabClick}
          isBox={isBox}
        >
          <Tab
            eventKey={0}
            title={
              <>
                <TabTitleIcon>
                  <CatalogIcon />
                </TabTitleIcon>{" "}
                <TabTitleText>Log Parsing</TabTitleText>{" "}
              </>
            }
          >
            {res}
          </Tab>
          <Tab
            eventKey={1}
            title={
              <>
                <TabTitleIcon>
                  <NetworkIcon />
                </TabTitleIcon>{" "}
                <TabTitleText>Graph</TabTitleText>{" "}
              </>
            }
          >
            Ploup
          </Tab>
          <Tab
            eventKey={2}
            title={
              <>
                <TabTitleIcon>
                  <DatabaseIcon />
                </TabTitleIcon>{" "}
                <TabTitleText>Communities</TabTitleText>{" "}
              </>
            }
          >
            <UC4CommunityVisu />
          </Tab>
        </Tabs> */}
      </div>
    );
  }
}

export { UC4Community };
