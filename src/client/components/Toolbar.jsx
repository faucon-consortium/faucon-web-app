import React from "react";
import {
  Button,
  ButtonVariant,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  InputGroup,
  KebabToggle,
  Select,
  SelectOption,
  SelectVariant,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

import {
  CloneIcon,
  EditIcon,
  FilterIcon,
  SearchIcon,
  SyncIcon,
} from "@patternfly/react-icons";

function ToolbarTest() {
  const items = (
    <React.Fragment>
      <ToolbarItem>
        <InputGroup>
          <TextInput
            name="textInput1"
            id="textInput1"
            type="search"
            aria-label="search input example"
          />
          <Button
            variant={ButtonVariant.control}
            aria-label="search button for search input"
          >
            <SearchIcon />
          </Button>
        </InputGroup>
      </ToolbarItem>
      <ToolbarItem>
        <Button variant="secondary">Action</Button>
      </ToolbarItem>
      <ToolbarItem variant="separator" />
      <ToolbarItem>
        <Button variant="primary">Action</Button>
      </ToolbarItem>
    </React.Fragment>
  );

  return <Toolbar id="toolbar">{items}</Toolbar>;
}

export { ToolbarTest };
