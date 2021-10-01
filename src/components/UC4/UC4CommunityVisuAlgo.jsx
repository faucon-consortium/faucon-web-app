import React from "react";
import {
  HelperText,
  HelperTextItem,
  Grid,
  GridItem,
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
    this.state = {
      algo: props.algo,
      rows: [],
      data: null,
    };

    this.onRowClick = (event, rowIndex) => {
      const { rows } = this.state;
      console.log(rows);
      console.log(rowIndex);
      for (let i = 0; i < rows.length; i += 1) {
        rows[i].isRowSelected = false;
      }
      rows[rowIndex].isRowSelected = !rows[rowIndex].isRowSelected;
      this.forceUpdate();
    };
  }

  componentDidMount() {
    const { data } = this.state;
    if (data == null) this.communityData();
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
    const { rows } = this.state;
    const columns = [
      "Id",
      "Community Total Size",
      "Number of documents",
      "Number of users",
    ];
    return (
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
              isHoverable
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
  }

  communityData() {
    const { algo } = this.state;
    fetch(`http://localhost:5002/getcommunity/full/${algo}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Object.prototype.hasOwnProperty.call(data, "result")) {
          this.setState({
            data: null,
            rows: [],
          });
        } else {
          const { result } = data;
          if (Array.isArray(result)) {
            const len = result.length >= 10 ? 10 : result.length;
            const rows = new Array(len);
            for (let i = 0; i < len; i += 1) {
              rows[i] = {
                cells: [
                  i + 1,
                  result[i].nb_ip + result[i].nb_doc,
                  result[i].nb_doc,
                  result[i].nb_ip,
                ],
                isRowSelected: false,
              };
            }
            this.setState({
              data: result,
              rows: rows,
            });
          } else {
            this.setState({
              data: null,
              rows: [],
            });
          }
        }
      })
      .catch((error) => {
        this.setState({
          data: null,
        });
        console.error("Error:", error);
      });
  }

  render() {
    const { data } = this.state;
    if (data == null) return this.error("No data");
    return <div>{this.communityTab()}</div>;
  }
}

export { UC4CommunityVisuAlgo };
