import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  ButtonVariant,
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Divider,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  Flex,
  FlexModifiers,
  FlexItem,
  PageSection,
  PageSectionVariants,
  Progress,
  Stack,
  StackItem,
  Text,
  TextContent,
  Title,
} from "@patternfly/react-core";

import {
  CodeBranchIcon,
  CodeIcon,
  CubeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  TimesCircleIcon,
} from "@patternfly/react-icons";

import { ToolbarTest } from "./Toolbar";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    const { compProps } = props;
    const { activeUC } = compProps;
    this.state = {
      //   riskIsExpanded: false,
      //   riskSelected: null,
      activeUC,
      drawerPanelBodyContent: "5",
      //   inputValue: "",
      isDrawerExpanded: false,
      selectedDataListItemId: "",
      //   statusIsExpanded: false,
      //   statusSelected: null,
    };

    this.statusOptions = [
      { value: "Status", disabled: false, isPlaceholder: true },
      { value: "New", disabled: false },
      { value: "Pending", disabled: false },
      { value: "Running", disabled: false },
      { value: "Cancelled", disabled: false },
    ];
    this.riskOptions = [
      { value: "Risk", disabled: false, isPlaceholder: true },
      { value: "Low", disabled: false },
      { value: "Medium", disabled: false },
      { value: "High", disabled: false },
    ];

    this.onSelectDataListItem = (id) => {
      this.setState({
        selectedDataListItemId: id,
        isDrawerExpanded: true,
        drawerPanelBodyContent: id.charAt(id.length - 1),
      });
    };

    this.onCloseDrawerClick = () => {
      this.setState({
        isDrawerExpanded: false,
        selectedDataListItemId: "",
      });
    };
  }

  render() {
    const {
      activeUC,
      drawerPanelBodyContent,
      isDrawerExpanded,
      selectedDataListItemId,
    } = this.state;

    const panelContent = (
      <DrawerPanelContent>
        <DrawerHead>
          <Title headingLevel="h2" size="xl">
            node-{drawerPanelBodyContent}
          </Title>
          <DrawerActions>
            <DrawerCloseButton onClick={this.onCloseDrawerClick} />
          </DrawerActions>
        </DrawerHead>
        <DrawerPanelBody>
          <Flex
            breakpointMods={[
              { modifier: FlexModifiers.column },
              { modifier: FlexModifiers["space-items-lg"] },
            ]}
          >
            <FlexItem>
              <p>
                The content of the drawer really is up to you. It could have
                form fields, definition lists, text lists, labels, charts,
                progress bars, etc. Spacing recommendation is 24px margins. You
                can put tabs in here, and can also make the drawer scrollable.
              </p>
            </FlexItem>
            <FlexItem>
              <Progress value={drawerPanelBodyContent * 10} title="Title" />
            </FlexItem>
            <FlexItem>
              <Progress value={drawerPanelBodyContent * 5} title="Title" />
            </FlexItem>
          </Flex>
        </DrawerPanelBody>
      </DrawerPanelContent>
    );

    const drawerContent = (
      <React.Fragment>
        <ToolbarTest />
        <DataList
          aria-label="data list"
          selectedDataListItemId={selectedDataListItemId}
          onSelectDataListItem={this.onSelectDataListItem}
        >
          <DataListItem
            aria-labelledby="selectable-action-item1"
            id="inline-modifier-item1"
          >
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="primary content">
                    <Flex breakpointMods={[{ modifier: FlexModifiers.column }]}>
                      <FlexItem>
                        <p>Tweet 21342</p>
                        <small>
                          <p>
                            m iaculis porta. Morbi mi sem, elementum euismod Nam
                            viverra, erat in dictum fringilla, libero elit
                            suscipit leo, eu iaculis lectus leo at{" "}
                          </p>
                          <a>https://twitter.com/user/status/000000000000</a>
                        </small>
                      </FlexItem>
                      <Flex>
                        <FlexItem>
                          <CodeBranchIcon /> 10
                        </FlexItem>
                        <FlexItem>
                          <CodeIcon /> 4
                        </FlexItem>
                        <FlexItem>
                          <CubeIcon /> 5
                        </FlexItem>
                        <FlexItem>Updated 2 days ago</FlexItem>
                      </Flex>
                    </Flex>
                  </DataListCell>,
                  <DataListAction
                    aria-label="ploup"
                    aria-labelledby="ploup"
                    id="ploup1"
                  >
                    <Stack>
                      <StackItem>
                        <Button variant={ButtonVariant.secondary}>
                          Secondary
                        </Button>
                      </StackItem>
                      <StackItem>
                        <Button variant={ButtonVariant.link}>
                          Link Button
                        </Button>
                      </StackItem>
                    </Stack>
                  </DataListAction>,
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem
            aria-labelledby="selectable-action-item2"
            id="inline-modifier-item2"
          >
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="primary content">
                    <Flex breakpointMods={[{ modifier: FlexModifiers.column }]}>
                      <FlexItem>
                        <p>Tweet 535354</p>
                        <small>
                          <p>
                            m iaculis porta. Morbi mi sem, elementum euismod Nam
                            viverra, erat in dictum fringilla, libero elit
                            suscipit leo, eu iaculis lectus leo at{" "}
                          </p>
                          <a>https://twitter.com/user/status/000000000000</a>
                        </small>
                      </FlexItem>
                      <Flex>
                        <FlexItem>
                          <CodeBranchIcon /> 10
                        </FlexItem>
                        <FlexItem>
                          <CodeIcon /> 4
                        </FlexItem>
                        <FlexItem>
                          <CubeIcon /> 5
                        </FlexItem>
                        <FlexItem>
                          <CheckCircleIcon /> 7
                        </FlexItem>
                        <FlexItem>
                          <ExclamationTriangleIcon /> 5
                        </FlexItem>
                        <FlexItem>
                          <TimesCircleIcon /> 5
                        </FlexItem>
                        <FlexItem>Updated 2 days ago</FlexItem>
                      </Flex>
                    </Flex>
                  </DataListCell>,
                  <DataListAction
                    aria-label="ploup"
                    aria-labelledby="ploup"
                    id="ploup2"
                  >
                    <Stack>
                      <StackItem>
                        <Button variant={ButtonVariant.secondary}>
                          Secondary
                        </Button>
                      </StackItem>
                      <StackItem>
                        <Button variant={ButtonVariant.link}>
                          Link Button
                        </Button>
                      </StackItem>
                    </Stack>
                  </DataListAction>,
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem
            aria-labelledby="selectable-action-item3"
            id="inline-modifier-item3"
          >
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="primary content">
                    <Flex breakpointMods={[{ modifier: FlexModifiers.column }]}>
                      <FlexItem>
                        <p>Tweet 321312</p>
                        <small>
                          <p>
                            m iaculis porta. Morbi mi sem, elementum euismod Nam
                            viverra, erat in dictum fringilla, libero elit
                            suscipit leo, eu iaculis lectus leo at{" "}
                          </p>
                          <a>https://twitter.com/user/status/000000000000</a>
                        </small>
                      </FlexItem>
                      <Flex>
                        <FlexItem>
                          <CodeBranchIcon /> 10
                        </FlexItem>
                        <FlexItem>
                          <CodeIcon /> 4
                        </FlexItem>
                        <FlexItem>
                          <CubeIcon /> 5
                        </FlexItem>
                        <FlexItem>Updated 2 days ago</FlexItem>
                      </Flex>
                    </Flex>
                  </DataListCell>,
                  <DataListAction
                    aria-label="ploup"
                    aria-labelledby="ploup"
                    id="ploup3"
                  >
                    <Stack>
                      <StackItem>
                        <Button variant={ButtonVariant.secondary}>
                          Secondary
                        </Button>
                      </StackItem>
                      <StackItem>
                        <Button variant={ButtonVariant.link}>
                          Link Button
                        </Button>
                      </StackItem>
                    </Stack>
                  </DataListAction>,
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem
            aria-labelledby="selectable-action-item4"
            id="inline-modifier-item4"
          >
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="primary content">
                    <Flex breakpointMods={[{ modifier: FlexModifiers.column }]}>
                      <FlexItem>
                        <p>Tweet 321313</p>
                        <small>
                          <p>
                            m iaculis porta. Morbi mi sem, elementum euismod Nam
                            viverra, erat in dictum fringilla, libero elit
                            suscipit leo, eu iaculis lectus leo at{" "}
                          </p>
                          <a>https://twitter.com/user/status/000000000000</a>
                        </small>
                      </FlexItem>
                      <Flex>
                        <FlexItem>
                          <CodeBranchIcon /> 10
                        </FlexItem>
                        <FlexItem>
                          <CodeIcon /> 4
                        </FlexItem>
                        <FlexItem>
                          <CubeIcon /> 5
                        </FlexItem>
                        <FlexItem>
                          <CheckCircleIcon /> 7
                        </FlexItem>
                        <FlexItem>
                          <ExclamationTriangleIcon /> 5
                        </FlexItem>
                        <FlexItem>
                          <TimesCircleIcon /> 5
                        </FlexItem>
                        <FlexItem>Updated 2 days ago</FlexItem>
                      </Flex>
                    </Flex>
                  </DataListCell>,
                  <DataListAction
                    aria-label="ploup"
                    aria-labelledby="ploup"
                    id="ploup4"
                  >
                    <Stack>
                      <StackItem>
                        <Button variant={ButtonVariant.secondary}>
                          Secondary
                        </Button>
                      </StackItem>
                      <StackItem>
                        <Button variant={ButtonVariant.link}>
                          Link Button
                        </Button>
                      </StackItem>
                    </Stack>
                  </DataListAction>,
                ]}
              />
            </DataListItemRow>
          </DataListItem>
        </DataList>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">
              Social Media View for Use Case {activeUC}{" "}
            </Text>
            <Text component="p">
              Body text should be Overpass Regular at 16px. It should have
              leading of 24px because <br />
              of it’s relative line height of 1.5.
            </Text>
          </TextContent>
        </PageSection>
        <Divider component="div" />
        <PageSection variant={PageSectionVariants.light} noPadding>
          <Drawer isExpanded={isDrawerExpanded} isInline>
            <DrawerContent panelContent={panelContent}>
              <DrawerContentBody>{drawerContent}</DrawerContentBody>
            </DrawerContent>
          </Drawer>
        </PageSection>
      </React.Fragment>
    );
  }
}

Feed.defaultProps = {
  compProps: null,
};

Feed.propTypes = {
  compProps: PropTypes.shape({ activeUC: PropTypes.number.isRequired }),
};

export { Feed };
