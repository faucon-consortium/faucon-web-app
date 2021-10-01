import React from "react";
import {
  HelperText,
  HelperTextItem,
  Grid,
  GridItem,
  Tabs,
  Tab,
  TabTitleText,
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

import { UC4CommunityVisuAlgo } from "./UC4CommunityVisuAlgo.jsx";
import { UC4CommunityVisuChart } from "./UC4CommunityVisuChart.jsx";

class UC4CommunityVisu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: [],
      communititesStats: [],
      communitiesSizes: [],
      fetchError: null,
      activeTabKey: 0,
    };
    this.handleTabClick = (event, tabIndex) => {
      this.setState({
        activeTabKey: tabIndex,
      });
    };
  }

  componentDidMount() {
    const { communities } = this.state;
    if (communities.length === 0) this.communityList();
  }

  communityList() {
    fetch("http://localhost:5002/getcommunity")
      .then((res) => res.json())
      .then((data) => {
        if (!Object.prototype.hasOwnProperty.call(data, "result")) {
          this.setState({
            communities: [],
            communititesStats: [],
            communitiesSizes: [],
            fetchError: data,
          });
        } else {
          const { result } = data;
          if (Array.isArray(result)) {
            this.setState({
              communities: result,
              communititesStats: [],
              communitiesSizes: [],
              fetchError: null,
            });
          } else {
            this.setState({
              communities: [],
              communititesStats: [],
              communitiesSizes: [],
              fetchError: result,
            });
          }
        }
      })
      .catch((error) => {
        this.setState({
          communities: [],
          communititesStats: [],
          communitiesSizes: [],
          fetchError: error,
        });
        console.error("Error:", error);
      });
  }

  communityStats(algorithm) {
    fetch(`http://localhost:5002/getcommunity/${algorithm}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Object.prototype.hasOwnProperty.call(data, "result")) {
          this.setState({
            communities: [],
            communititesStats: [],
            communitiesSizes: [],
            fetchError: data,
          });
        } else if (data.result === "not found") {
          this.setState({
            communities: [],
            communititesStats: [],
            communitiesSizes: [],
            fetchError: data.result,
          });
        } else {
          const { communititesStats } = this.state;
          communititesStats[algorithm] = data.result;
          console.assert(Object.keys(communititesStats).length !== 0);
        }
      })
      .catch((error) => {
        this.setState({
          communities: [],
          communititesStats: [],
          communitiesSizes: [],
          fetchError: error,
        });
        console.error("Error:", error);
      });
  }

  communitySizes(algorithm) {
    fetch(`http://localhost:5002/getcommunity/sizes/${algorithm}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Object.prototype.hasOwnProperty.call(data, "result")) {
          this.setState({
            communities: [],
            communititesStats: [],
            communitiesSizes: [],
            fetchError: data,
          });
        } else if (data.result === "not found") {
          this.setState({
            communities: [],
            communititesStats: [],
            communitiesSizes: [],
            fetchError: data.result,
          });
        } else {
          const { communitiesSizes } = this.state;
          communitiesSizes[algorithm] = data.result;
          console.assert(Object.keys(communitiesSizes).length !== 0);
        }
      })
      .catch((error) => {
        this.setState({
          communities: [],
          communititesStats: [],
          communitiesSizes: [],
          fetchError: error,
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

  communitiesTabs() {
    const { communities, activeTabKey } = this.state;
    const tooltipRef = React.createRef();
    const comTabs = communities.map((community, idx) => (
      <Tab
        eventKey={idx + 2}
        key={idx + 2}
        title={<TabTitleText>{community}</TabTitleText>}
      >
        <UC4CommunityVisuAlgo algo={community} />
      </Tab>
    ));
    return (
      <div>
        <Tabs
          isFilled
          activeKey={activeTabKey}
          onSelect={this.handleTabClick}
          isBox={false}
        >
          <Tab
            eventKey={0}
            key={0}
            title={<TabTitleText>Global View</TabTitleText>}
            ref={tooltipRef}
          >
            {this.communititesTable()}
            {this.communitiesCharts()}
          </Tab>
          <Tab
            eventKey={1}
            key={1}
            title={<TabTitleText>Find element in community</TabTitleText>}
          >
            <div>Ploup</div>
          </Tab>
          {comTabs}
        </Tabs>
      </div>
    );
  }

  communititesTable() {
    const { communities, communititesStats } = this.state;
    if (communities.length === 0) return <div />;
    if (Object.keys(communititesStats).length === 0) {
      communities.forEach((community) => {
        this.communityStats(community);
      });
    }

    if (Object.getOwnPropertyNames(communititesStats).length === 1)
      return <div />;

    const columns = [
      "Algorith name",
      "Community count",
      "Average size",
      "Average number of documents",
      "Average number of users",
    ];
    const rows = new Array(Object.keys(communititesStats).length);
    Object.keys(communititesStats).forEach((key, idx) => {
      rows[idx] = [
        communititesStats[key].name,
        communititesStats[key].communities_nb,
        communititesStats[key].average_size,
        communititesStats[key].average_doc_in_communities,
        communititesStats[key].average_ip_in_communities,
      ];
    });
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

  communitiesCharts() {
    const { communities, communitiesSizes } = this.state;
    if (communities.length === 0) return <div />;
    console.assert(communitiesSizes != null);
    if (Object.keys(communitiesSizes).length === 0) {
      communities.forEach((community) => {
        this.communitySizes(community);
      });
    }

    const legendData = [
      { childName: "louvain", name: "Louvain" },
      { childName: "leiden", name: "Leiden" },
      { childName: "label_propagation", name: "Label Propagation" },
      // { childName: "markov", name: "Markov" },
      { childName: "eigenvector", name: "Eigen Vector" },
      // { childName: "paris", name: "Paris" },
      { childName: "spinglass", name: "Spinglass" },
      // { childName: "walktrap", name: "Walktrap" },
    ];

    if (Object.getOwnPropertyNames(communitiesSizes).length === 1)
      return <div />;
    const docidData = Object.keys(communitiesSizes).map((community) => {
      const sizes = communitiesSizes[community];
      const res = [0, 0, 0, 0, 0, 0, 0, 0];
      sizes.docid.forEach((size) => {
        if (size >= 0 && size < 50) res[0] += 1;
        if (size >= 50 && size < 100) res[1] += 1;
        if (size >= 100 && size < 500) res[2] += 1;
        if (size >= 500 && size < 1000) res[3] += 1;
        if (size >= 1000 && size < 2000) res[4] += 1;
        if (size >= 2000 && size < 5000) res[5] += 1;
        if (size >= 5000 && size < 10000) res[6] += 1;
        if (size >= 10000) res[7] += 1;
      });
      return [
        { name: community, x: "0-49", y: res[0] },
        { name: community, x: "50-99", y: res[1] },
        { name: community, x: "100-499", y: res[2] },
        { name: community, x: "500-999", y: res[3] },
        { name: community, x: "1000-1999", y: res[4] },
        { name: community, x: "2000-4999", y: res[5] },
        { name: community, x: "5000-9999", y: res[6] },
        { name: community, x: "10000+", y: res[7] },
      ];
    });
    const ipData = Object.keys(communitiesSizes).map((community) => {
      const sizes = communitiesSizes[community];
      const res = [0, 0, 0, 0, 0, 0, 0, 0];
      sizes.ip.forEach((size) => {
        if (size >= 0 && size < 50) res[0] += 1;
        if (size >= 50 && size < 100) res[1] += 1;
        if (size >= 100 && size < 500) res[2] += 1;
        if (size >= 500 && size < 1000) res[3] += 1;
        if (size >= 1000 && size < 2000) res[4] += 1;
        if (size >= 2000 && size < 5000) res[5] += 1;
        if (size >= 5000 && size < 10000) res[6] += 1;
        if (size >= 10000) res[7] += 1;
      });
      return [
        { name: community, x: "0-49", y: res[0] },
        { name: community, x: "50-99", y: res[1] },
        { name: community, x: "100-499", y: res[2] },
        { name: community, x: "500-999", y: res[3] },
        { name: community, x: "1000-1999", y: res[4] },
        { name: community, x: "2000-4999", y: res[5] },
        { name: community, x: "5000-9999", y: res[6] },
        { name: community, x: "10000+", y: res[7] },
      ];
    });
    return (
      <div>
        <UC4CommunityVisuChart
          data={docidData}
          legendData={legendData}
          xlegend="Number of documents"
          ylegend="Number of communities"
          bottomLegend="Number of communities of each total of documents"
        />
        <UC4CommunityVisuChart
          data={ipData}
          legendData={legendData}
          xlegend="Number of users"
          ylegend="Number of communities"
          bottomLegend="Number of communities of each total of users"
        />
      </div>
    );
  }

  render() {
    const { fetchError } = this.state;

    const res =
      fetchError == null ? (
        <div>{this.communitiesTabs()}</div>
      ) : (
        this.errorCommunity(`No communities found (${fetchError})`)
      );
    return <div>{res}</div>;
  }
}

export { UC4CommunityVisu };
