import React from "react";
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartThemeColor,
} from "@patternfly/react-charts";
import { VictoryZoomContainer } from "victory";

class ResponsiveChartLine extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      width: 0,
    };
    this.handleResize = () => {
      if (this.containerRef.current && this.containerRef.current.clientWidth) {
        this.setState({ width: this.containerRef.current.clientWidth });
      }
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    const { width } = this.state;

    return (
      <div ref={this.containerRef}>
        <p>This demonstrates zoom for the x axis only</p>
        <div style={{ height: "500px" }}>
          <Chart
            ariaDesc="Average number of pets"
            ariaTitle="Line chart example"
            containerComponent={<VictoryZoomContainer zoomDimension="x" />}
            legendData={[
              { name: "Cats" },
              { name: "Dogs", symbol: { type: "dash" } },
              { name: "Birds" },
              { name: "Mice" },
            ]}
            legendPosition="bottom-left"
            height={275}
            maxDomain={{ y: 10 }}
            minDomain={{ y: 0 }}
            padding={{
              bottom: 75, // Adjusted to accommodate legend
              left: 50,
              right: 50,
              top: 50,
            }}
            themeColor={ChartThemeColor.multiUnordered}
            width={width}
          >
            <ChartAxis tickValues={[2, 3, 4]} />
            <ChartAxis dependentAxis showGrid tickValues={[2, 5, 8]} />
            <ChartGroup>
              <ChartLine
                data={[
                  { name: "Cats", x: "2015", y: 1 },
                  { name: "Cats", x: "2016", y: 2 },
                  { name: "Cats", x: "2017", y: 5 },
                  { name: "Cats", x: "2018", y: 3 },
                ]}
              />
              <ChartLine
                data={[
                  { name: "Dogs", x: "2015", y: 2 },
                  { name: "Dogs", x: "2016", y: 1 },
                  { name: "Dogs", x: "2017", y: 7 },
                  { name: "Dogs", x: "2018", y: 4 },
                ]}
                style={{
                  data: {
                    strokeDasharray: "3,3",
                  },
                }}
              />
              <ChartLine
                data={[
                  { name: "Birds", x: "2015", y: 3 },
                  { name: "Birds", x: "2016", y: 4 },
                  { name: "Birds", x: "2017", y: 9 },
                  { name: "Birds", x: "2018", y: 5 },
                ]}
              />
              <ChartLine
                data={[
                  { name: "Mice", x: "2015", y: 3 },
                  { name: "Mice", x: "2016", y: 3 },
                  { name: "Mice", x: "2017", y: 8 },
                  { name: "Mice", x: "2018", y: 7 },
                ]}
              />
            </ChartGroup>
          </Chart>
        </div>
      </div>
    );
  }
}

export { ResponsiveChartLine };
