import React from "react";
import { Title } from "@patternfly/react-core";
import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartGroup,
  ChartThemeColor,
  ChartLegendTooltip,
  createContainer,
} from "@patternfly/react-charts";
// import '@patternfly/patternfly/patternfly-charts.css'; // Required for mix-blend-mode CSS property

class UC4CommunityVisuChart extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      width: 1000,
      data: props.data,
      legendData: props.legendData,
      xlegend: props.xlegend,
      ylegend: props.ylegend,
      bottomLegend: props.bottomLegend,
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
    const { width, data, legendData, xlegend, ylegend, bottomLegend } =
      this.state;
    const CursorVoronoiContainer = createContainer("voronoi", "cursor");

    return (
      <div
        ref={this.containerRef}
        style={{ height: "600px", textAlign: "center" }}
      >
        <Chart
          title="Area chart example"
          containerComponent={
            <CursorVoronoiContainer
              cursorDimension="x"
              labels={({ datum }) => `${datum.y}`}
              labelComponent={
                <ChartLegendTooltip
                  legendData={legendData}
                  title={(datum) => datum.x}
                />
              }
              mouseFollowTooltips
              voronoiDimension="x"
              // voronoiPadding={50}
            />
          }
          legendData={legendData}
          legendPosition="bottom"
          padding={{
            bottom: 100, // Adjusted to accommodate legend
            left: 80,
            right: 50,
            top: 50,
          }}
          maxDomain={{ y: 320 }}
          height={600}
          themeColor={ChartThemeColor.multiUnordered}
          width={width}
        >
          <ChartAxis label={xlegend} />
          <ChartAxis label={ylegend} dependentAxis showGrid />
          <ChartGroup>
            {data.map((algo, idx) => (
              <ChartArea
                key={idx}
                data={algo}
                name={algo[0].name}
                interpolation="monotoneX"
              />
            ))}
          </ChartGroup>
        </Chart>
        <Title style={{ paddingBottom: "3em" }} headingLevel="h4" size="xl">
          {bottomLegend}
        </Title>
      </div>
    );
  }
}

export { UC4CommunityVisuChart };
