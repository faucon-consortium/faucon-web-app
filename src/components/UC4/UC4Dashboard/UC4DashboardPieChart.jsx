import React from "react";

import { Title } from "@patternfly/react-core";
import { ChartPie, ChartThemeColor } from "@patternfly/react-charts";

class UC4DashboardPieChart extends React.Component {
  constructor(props) {
    super(props);
    const { data, legend, legendData } = props;
    this.state = {
      data: data,
      legend: legend,
      legendData: legendData,
    };
  }

  //   [{ x: "Cats", y: 35 },
  //   { x: "Dogs", y: 55 },
  //   { x: "Birds", y: 10 },]

  // [
  //   { name: "Cats: 35" },
  //   { name: "Dogs: 55" },
  //   { name: "Birds: 10" },
  // ]

  render() {
    const { data, legend, legendData } = this.state;
    console.log(legendData);
    return (
      <div>
        <div style={{ height: "500px", width: "500px" }}>
          <ChartPie
            constrainToVisibleArea
            legendAllowWrap
            data={data}
            height={500}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            legendData={legendData}
            legendPosition="bottom"
            padding={{
              bottom: 65,
              left: 20,
              right: 20,
              top: 20,
            }}
            themeColor={ChartThemeColor.blue}
            width={500}
          />
        </div>
        <Title
          style={{ paddingTop: "3em", paddingBottom: "3em" }}
          headingLevel="h4"
          size="xl"
        >
          {legend}
        </Title>
      </div>
    );
  }
}

export { UC4DashboardPieChart };
