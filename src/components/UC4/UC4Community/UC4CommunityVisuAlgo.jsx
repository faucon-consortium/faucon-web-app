import React from "react";
import {
  HelperText,
  HelperTextItem,
  Grid,
  GridItem,
  Drawer,
  DrawerPanelContent,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
} from "@patternfly/react-core";

import {
  TableComposable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@patternfly/react-table";

import ExclamationIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-icon";

class UC4CommunityVisuAlgo extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    const len = data.length >= 10 ? 10 : data.length;
    const rows = new Array(len);
    data.sort((f, s) => s.nb_doc - f.nb_doc);
    for (let i = 0; i < len; i += 1) {
      rows[i] = {
        cells: [
          i + 1,
          data[i].nb_ip + data[i].nb_doc,
          data[i].nb_doc,
          data[i].nb_ip,
        ],
        isRowSelected: false,
      };
    }
    this.state = {
      algo: props.algo,
      rows: rows,
      data: props.data,
      isExpanded: false,
      drawerData: "",
      topAuthors: "",
      selectedTopAuthors: [],
    };

    this.drawerRef = React.createRef();

    this.onExpand = () => {
      if (this.drawerRef.current) this.drawerRef.current.focus();
    };

    this.onClick = () => {
      const { isExpanded } = this.state;
      this.setState({
        isExpanded: !isExpanded,
      });
    };

    this.onCloseClick = () => {
      this.setState({
        isExpanded: false,
      });
    };

    this.onRowClick = (event, rowIndex) => {
      const { topAuthors } = this.state;
      for (let i = 0; i < rows.length; i += 1) {
        rows[i].isRowSelected = false;
      }
      rows[rowIndex].isRowSelected = !rows[rowIndex].isRowSelected;
      data.sort((f, s) => s.nb_doc - f.nb_doc);
      const docids = data[rowIndex].docids.slice(0, 9);
      const topAuth = topAuthors[rowIndex].slice(0, 9);
      this.onClick();
      this.setState({ drawerData: docids, selectedTopAuthors: [topAuth] });
    };
  }

  componentDidMount() {
    this.getTopAuthors();
  }

  getTopAuthors() {
    const { algo } = this.state;
    fetch(`http://localhost:5002/getcommunity/authors/${algo}`)
      .then((res) => res.json())
      .then((data) => {
        if (
          Object.prototype.hasOwnProperty.call(data, "result") &&
          data.result !== "not found"
        ) {
          this.setState({ topAuthors: data.result });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  error(message) {
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

  communityTab() {
    const { rows, isExpanded, drawerData, selectedTopAuthors } = this.state;
    const columns = [
      "Id",
      "Community Total Size",
      "Number of documents",
      "Number of users",
    ];

    const genDrawer = () => {
      if (drawerData == null) return <div />;
      const drawerCols = ["Docid", "wa_zoom", "wa_vignette"];
      const drawerRows = new Array(Object.keys(drawerData).length);
      const drawerAuthors = ["Authors"];
      Object.keys(drawerData).forEach((key, idx) => {
        drawerRows[idx] = [
          drawerData[key].docid,
          drawerData[key].wa_zoom,
          drawerData[key].wa_vignette,
        ];
      });

      return (
        <div>
          <TableComposable aria-label="Simple table" variant="compact">
            <Thead>
              <Tr>
                {drawerCols.map((column, columnIndex) => (
                  <Th key={columnIndex}>{column}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {drawerRows.map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <Td
                      key={`${rowIndex}_${cellIndex}`}
                      dataLabel={columns[cellIndex]}
                    >
                      {cell}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </TableComposable>
          <TableComposable aria-label="Simple table" variant="compact">
            <Thead>
              <Tr>
                {drawerAuthors.map((column, columnIndex) => (
                  <Th key={columnIndex}>{column}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {selectedTopAuthors.map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <Td
                      key={`${rowIndex}_${cellIndex}`}
                      dataLabel={columns[cellIndex]}
                    >
                      {cell}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </TableComposable>
        </div>
      );
    };

    const panelContent = (
      <DrawerPanelContent>
        <DrawerHead>
          <span ref={this.drawerRef}>{genDrawer()}</span>
          <DrawerActions>
            <DrawerCloseButton onClick={this.onCloseClick} />
          </DrawerActions>
        </DrawerHead>
      </DrawerPanelContent>
    );

    const drawerContent = (
      <TableComposable aria-label="Simple table" variant="default">
        <Thead>
          <Tr>
            {columns.map((column, columnIndex) => (
              <Th key={columnIndex}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, rowIndex) => (
            <Tr
              key={rowIndex}
              onRowClick={(event) => this.onRowClick(event, rowIndex)}
              // isHoverable
              isRowSelected={row.isRowSelected}
            >
              {row.cells.map((cell, cellIndex) => (
                <Td
                  key={`${rowIndex}_${cellIndex}`}
                  dataLabel={columns[cellIndex]}
                >
                  {cell}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    );

    return (
      <Drawer isExpanded={isExpanded} onExpand={this.onExpand}>
        <DrawerContent panelContent={panelContent}>
          <DrawerContentBody>{drawerContent}</DrawerContentBody>
        </DrawerContent>
      </Drawer>
    );
  }

  // communityData() {
  //   const { algo } = this.state;
  //   fetch(`http://localhost:5002/getcommunity/full/${algo}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!Object.prototype.hasOwnProperty.call(data, "result")) {
  //         this.setState({
  //           data: null,
  //           rows: [],
  //         });
  //       } else {
  //         const { result } = data;
  //         if (Array.isArray(result)) {
  //           const len = result.length >= 10 ? 10 : result.length;
  //           const rows = new Array(len);
  //           for (let i = 0; i < len; i += 1) {
  //             rows[i] = {
  //               cells: [
  //                 i + 1,
  //                 result[i].nb_ip + result[i].nb_doc,
  //                 result[i].nb_doc,
  //                 result[i].nb_ip,
  //               ],
  //               isRowSelected: false,
  //             };
  //           }
  //           this.setState({
  //             data: result,
  //             rows: rows,
  //           });
  //         } else {
  //           this.setState({
  //             data: null,
  //             rows: [],
  //           });
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       this.setState({
  //         data: null,
  //       });
  //       console.error("Error:", error);
  //     });
  // }

  render() {
    const { data } = this.state;
    if (data == null) return this.error("No data");
    return <div>{this.communityTab()}</div>;
  }
}

export { UC4CommunityVisuAlgo };
