import React from "react";
import { ChartBullet, ChartContainer } from "@patternfly/react-charts";

class ResponsiveChartBullet extends React.Component {
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
    const adjWidth = width < 300 ? 300 : width;
    return (
      <div ref={this.containerRef} style={{ height: "500px" }}>
        <ChartContainer
          ariaDesc="Storage capacity"
          ariaTitle="Bullet chart example"
          height={500}
          width={adjWidth}
        >
          <ChartBullet
            comparativeWarningMeasureData={[{ name: "Warning", y: 78 }]}
            constrainToVisibleArea
            height={500}
            labels={({ datum }) => `${datum.name}: ${datum.y}`}
            maxDomain={{ y: 100 }}
            padding={{
              bottom: 100, // Adjusted to accommodate legend
              left: 150, // Adjusted to accommodate labels
              right: 50,
              top: 75,
            }}
            primarySegmentedMeasureData={[
              { name: "Measure", y: 15 },
              { name: "Measure", y: 50 },
            ]}
            qualitativeRangeData={[
              { name: "Range", y: 40 },
              { name: "Range", y: 65 },
            ]}
            standalone={false}
            subTitle="Measure details"
            title="Text label"
            width={adjWidth}
          />
          <ChartBullet
            comparativeWarningMeasureData={[{ name: "Warning", y: 88 }]}
            constrainToVisibleArea
            height={500}
            labels={({ datum }) => `${datum.name}: ${datum.y}`}
            maxDomain={{ y: 100 }}
            padding={{
              bottom: 100, // Adjusted to accommodate legend
              left: 150, // Adjusted to accommodate labels
              right: 50,
              top: 300,
            }}
            primarySegmentedMeasureData={[
              { name: "Measure", y: 25 },
              { name: "Measure", y: 60 },
            ]}
            qualitativeRangeData={[
              { name: "Range", y: 50 },
              { name: "Range", y: 75 },
            ]}
            standalone={false}
            subTitle="Measure details"
            title="Text label"
            width={adjWidth}
          />
          <ChartBullet
            comparativeWarningMeasureData={[{ name: "Warning", y: 98 }]}
            constrainToVisibleArea
            height={500}
            labels={({ datum }) => `${datum.name}: ${datum.y}`}
            maxDomain={{ y: 100 }}
            padding={{
              bottom: 100, // Adjusted to accommodate legend
              left: 150, // Adjusted to accommodate labels
              right: 50,
              top: 525,
            }}
            primarySegmentedMeasureData={[
              { name: "Measure", y: 35 },
              { name: "Measure", y: 70 },
            ]}
            qualitativeRangeData={[
              { name: "Range", y: 60 },
              { name: "Range", y: 85 },
            ]}
            standalone={false}
            subTitle="Measure details"
            title="Text label"
            width={adjWidth}
          />
          <ChartBullet
            comparativeWarningMeasureData={[{ name: "Warning", y: 78 }]}
            comparativeWarningMeasureLegendData={[{ name: "Warning" }]}
            constrainToVisibleArea
            height={500}
            labels={({ datum }) => `${datum.name}: ${datum.y}`}
            maxDomain={{ y: 100 }}
            padding={{
              bottom: 100, // Adjusted to accommodate legend
              left: 150, // Adjusted to accommodate labels
              right: 50,
              top: 750,
            }}
            primarySegmentedMeasureData={[
              { name: "Measure", y: 15 },
              { name: "Measure", y: 50 },
            ]}
            primarySegmentedMeasureLegendData={[
              { name: "Measure 1" },
              { name: "Measure 2" },
            ]}
            qualitativeRangeData={[
              { name: "Range", y: 40 },
              { name: "Range", y: 65 },
            ]}
            qualitativeRangeLegendData={[
              { name: "Range 1" },
              { name: "Range 2" },
            ]}
            standalone={false}
            subTitle="Measure details"
            title="Text label"
            width={adjWidth}
          />
        </ChartContainer>
      </div>
    );
  }
}

export { ResponsiveChartBullet };
