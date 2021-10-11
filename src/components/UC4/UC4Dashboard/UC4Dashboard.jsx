import React from "react";

import {
  HelperText,
  HelperTextItem,
  Grid,
  GridItem,
  Title,
  TextContent,
  Text,
  TextVariants,
  Divider,
  Flex,
  FlexItem,
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

import { UC4DashboardPieChart } from "./UC4DashboardPieChart.jsx";

class UC4Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      globalData: null,
      topAuthorsDocs: null,
      topAuthorsZoomVig: null,
      topAuthorsOrders: null,
      topDocs: null,
      // allAuthors: null,
    };
  }

  componentDidMount() {
    const { globalData } = this.state;
    if (globalData == null) this.getStats();
  }

  getStats() {
    fetch(`http://localhost:5002/getstats/`)
      .then((res) => res.json())
      .then((data) => {
        if (!Object.prototype.hasOwnProperty.call(data, "result")) {
          this.setState({
            globalData: null,
            topAuthorsDocs: null,
            topAuthorsZoomVig: null,
            topAuthorsOrders: null,
          });
        } else if (data.result === "not found") {
          this.setState({
            globalData: null,
            topAuthorsDocs: null,
            topAuthorsZoomVig: null,
            topAuthorsOrders: null,
          });
        } else {
          const { result } = data;
          this.setState({
            globalData: result.global_stats,
            topAuthorsDocs: result.top_authors_docs,
            topAuthorsZoomVig: result.top_authors_zoom_vig,
            topAuthorsOrders: result.top_authors_orders,
            topDocs: result.top_docs,
            // allAuthors: result.all_authors,
          });
        }
      })
      .catch((error) => {
        this.setState({
          globalData: null,
          topAuthorsDocs: null,
          topAuthorsZoomVig: null,
          topAuthorsOrders: null,
        });
        console.error("Error:", error);
      });
  }

  errorCommunity(message) {
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

  docTab(docs) {
    const columns = ["docid", "ark", "Title", "wa_vignette", "wa_zoom"];
    const rows = new Array(docs.length);
    docs.forEach((key, idx) => {
      rows[idx] = [key.docID, key.ark, key.title, key.waVignette, key.waZoom];
    });
    return (
      <TableComposable aria-label="Simple table" variant="compact">
        <Thead>
          <Tr>
            {columns.map((column, columnIndex) => (
              <Th key={columnIndex}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, rowIndex) => (
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
    );
  }

  authorTab(tab) {
    const columns = [
      "Name",
      "Number of documents",
      "Total wa_vignette",
      "Total wa_zoom",
      "Total orders",
    ];
    const rows = new Array(tab.length);
    tab.forEach((key, idx) => {
      rows[idx] = [
        `${key.firstName} ${key.lastName}`,
        key.nbDoc,
        key.waVignette,
        key.waZoom,
        key.nbCommands,
      ];
    });
    return (
      <TableComposable aria-label="Simple table" variant="compact">
        <Thead>
          <Tr>
            {columns.map((column, columnIndex) => (
              <Th key={columnIndex}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, rowIndex) => (
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
    );
  }

  globalStats() {
    const {
      globalData,
      topAuthorsDocs,
      topAuthorsZoomVig,
      topAuthorsOrders,
      topDocs,
    } = this.state;
    const totalDocs = globalData.total_docs;
    const totalIps = globalData.total_ips;
    const totalAuthors = globalData.total_authors;
    const totalCommands = globalData.total_commandes;
    console.log(topDocs);
    return (
      <div>
        <Flex
          style={{ paddingTop: "1em", textAlign: "center" }}
          justifyContent={{ default: "justifyContentSpaceEvenly" }}
        >
          <FlexItem>
            <TextContent>
              <Text component={TextVariants.h2}>
                Total number of documents in the database : {totalDocs}
              </Text>
            </TextContent>
          </FlexItem>
          <Divider isVertical />
          <FlexItem>
            <TextContent>
              <Text component={TextVariants.h2}>
                Total number of users in the database : {totalIps}
              </Text>
            </TextContent>
          </FlexItem>
          <Divider isVertical />
          <FlexItem>
            <TextContent>
              <Text component={TextVariants.h2}>
                Total number of authors in the database : {totalAuthors}
              </Text>
            </TextContent>
          </FlexItem>
          <Divider isVertical />
          <FlexItem>
            <TextContent>
              <Text component={TextVariants.h2}>
                Total number of orders in the database : {totalCommands}
              </Text>
            </TextContent>
          </FlexItem>
        </Flex>
        <Divider style={{ paddingTop: "1em", textAlign: "center" }} />
        <Grid hasGutter style={{ paddingTop: "1em", textAlign: "center" }}>
          {/* <GridItem span={12}></GridItem> */}
          <GridItem span={4}>{this.authorTab(topAuthorsDocs)}</GridItem>
          <GridItem span={4}>{this.authorTab(topAuthorsZoomVig)}</GridItem>
          <GridItem span={4}>{this.authorTab(topAuthorsOrders)}</GridItem>
          <GridItem span={4}>
            <Title style={{ paddingBottom: "3em" }} headingLevel="h4" size="xl">
              Table of the authors with the most documents
            </Title>
          </GridItem>
          <GridItem span={4}>
            <Title style={{ paddingBottom: "3em" }} headingLevel="h4" size="xl">
              Table of the authors with the most interactions
            </Title>
          </GridItem>
          <GridItem span={4}>
            <Title style={{ paddingBottom: "3em" }} headingLevel="h4" size="xl">
              Table of the authors with the most orders
            </Title>
          </GridItem>
          {/* <GridItem span={1} /> */}
          <GridItem span={4}>{this.pieChartDocs(topAuthorsDocs)}</GridItem>
          {/* <GridItem span={1} /> */}
          <GridItem span={4}>
            {this.pieChartInteractions(topAuthorsZoomVig)}
          </GridItem>
          {/* <GridItem span={1} /> */}
          <GridItem span={4}>{this.pieChartOrders(topAuthorsOrders)}</GridItem>
          {/* <GridItem span={1} /> */}
          <GridItem span={12}>{this.docTab(topDocs)}</GridItem>
        </Grid>
        {/* {this.pieChart(topAuthorsDocs)} */}
      </div>
    );
  }

  pieChartDocs(authors) {
    const data = [];
    const legendData = [];
    let docTot = 0;
    authors.forEach((author) => {
      docTot += author.nbDoc;
    });
    authors.forEach((author) => {
      const percent = Math.round((author.nbDoc * 100) / docTot);
      const name = `${author.firstName} ${author.lastName}`;
      data.push({ x: name, y: percent });
      legendData.push({ name: `${name}: ${percent}%` });
    });
    return (
      <UC4DashboardPieChart
        data={data}
        legend="Percentage of the number of docs from the top authors"
        legendData={legendData}
      />
    );
  }

  pieChartOrders(authors) {
    const data = [];
    const legendData = [];
    let comTot = 0;
    authors.forEach((author) => {
      comTot += author.nbCommands;
    });
    authors.forEach((author) => {
      const percent = Math.round((author.nbCommands * 100) / comTot);
      const name = `${author.firstName} ${author.lastName}`;
      data.push({ x: name, y: percent });
      legendData.push({ name: `${name}: ${percent}%` });
    });
    return (
      <UC4DashboardPieChart
        data={data}
        legend="Percentage of the number of orders from the top authors"
        legendData={legendData}
      />
    );
  }

  pieChartInteractions(authors) {
    const data = [];
    const legendData = [];
    let intTot = 0;
    authors.forEach((author) => {
      intTot += author.waVignette + author.waZoom;
    });
    authors.forEach((author) => {
      const percent = Math.round(
        ((author.waVignette + author.waZoom) * 100) / intTot
      );
      const name = `${author.firstName} ${author.lastName}`;
      data.push({ x: name, y: percent });
      legendData.push({ name: `${name}: ${percent}%` });
    });
    return (
      <UC4DashboardPieChart
        data={data}
        legend="Percentage of the number of interactions from the top authors"
        legendData={legendData}
      />
    );
  }

  render() {
    const {
      globalData,
      topAuthorsDocs,
      topAuthorsZoomVig,
      topAuthorsOrders,
      topDocs,
    } = this.state;
    if (
      globalData == null ||
      topAuthorsDocs == null ||
      topAuthorsZoomVig == null ||
      topAuthorsOrders == null ||
      topDocs == null
    ) {
      return this.errorCommunity("Missing data");
    }
    return this.globalStats();
  }
}

export { UC4Dashboard };
