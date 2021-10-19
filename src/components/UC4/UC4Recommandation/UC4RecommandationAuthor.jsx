import React from "react";

import {
  TableComposable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@patternfly/react-table";

import { Flex, FlexItem, Title, Bullseye } from "@patternfly/react-core";

class UC4RecommandationAuthor extends React.Component {
  constructor(props) {
    super(props);
    const methods = [
      "louvain",
      "leiden",
      "label_propagation",
      "eigenvector",
      "spinglass",
    ];
    const commsStas = {};
    methods.forEach((method) => {
      commsStas[method] = new Array(10);
    });

    this.state = {
      author: props.author,
      commsStas: commsStas,
      methods: methods,
    };
  }

  componentDidMount() {
    this.getStats();
  }

  getStats() {
    const { methods, author, commsStas } = this.state;
    methods.forEach((method) => {
      for (let idx = 0; idx < 5; idx += 1) {
        fetch(`http://localhost:5002/getcommunity/${method}/${idx}/${author}`)
          .then((res) => res.json())
          .then((data) => {
            if (!Object.prototype.hasOwnProperty.call(data, "result")) {
              this.setState({ commsStas: [] });
            } else if (data.result === "not found") {
              this.setState({ commsStas: [] });
            } else {
              console.log(data.result);
              commsStas[method][idx] = data.result;
              this.forceUpdate();
            }
          })
          .catch((error) => {
            this.setState({ commsStas: [] });
            console.error("Error:", error);
          });
      }
    });
  }

  getTable(method) {
    const { commsStas } = this.state;
    const columns = [
      "Algorithm",
      "Index",
      "Number of users",
      "Number of documents",
      "Vignette count",
      "Zoom count",
      "Familiar users",
      "Percent",
    ];
    console.log(commsStas);
    const rows = commsStas[method].map((result, idx) => ({
      cells: [
        method,
        idx + 1,
        result.total,
        result.docs,
        result.vignette,
        result.zoom,
        result.familiar,
        result.percent,
      ],
      isRowSelected: false,
    }));

    const onRowClick = (event, rowIndex) => {
      const updatedRows = [...rows];
      updatedRows[rowIndex].isRowSelected = !rows[rowIndex].isRowSelected;
    };

    return (
      <TableComposable aria-label="Misc table" variant="compact">
        <Thead noWrap>
          <Tr>
            <Th>{columns[0]}</Th>
            <Th>{columns[1]}</Th>
            <Th>{columns[2]}</Th>
            <Th>{columns[3]}</Th>
            <Th>{columns[4]}</Th>
            <Th>{columns[5]}</Th>
            <Th>{columns[6]}</Th>
            <Th>{columns[7]}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, rowIndex) => (
            <Tr
              key={rowIndex}
              onRowClick={(event) => onRowClick(event, rowIndex, row.cells)}
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

  render() {
    const { methods, author } = this.state;
    const tabs = methods.map((method) => this.getTable(method));
    return (
      <Flex direction={{ default: "column" }}>
        <FlexItem>
          <Bullseye>
            <Title headingLevel="h2" size="3xl" style={{ paddingTop: "0.8em" }}>
              Community statistics for {author}
            </Title>
          </Bullseye>
        </FlexItem>
        {tabs.map((tab) => (
          <FlexItem>{tab}</FlexItem>
        ))}
      </Flex>
    );
  }
}

export { UC4RecommandationAuthor };
