import React from "react";
import {
  SearchInput,
  Grid,
  GridItem,
  DataList,
  DataListItem,
  DataListCell,
  // DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import { UC4RecommandationAuthor } from "./UC4RecommandationAuthor";

class UC4Recommandation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      resultsCount: 0,
      currentResult: 1,
      items: [],
      results: [],
      selectedDataListItemId: "",
      author: "",
    };

    this.onChange = (value) => {
      const { items } = this.state;
      const res = items.filter((word) =>
        word.toLowerCase().includes(value.toLowerCase())
      );
      this.setState({
        value: value,
        resultsCount: res.length,
        results: value === "" ? [] : res,
      });
    };

    this.onSelectDataListItem = (id) => {
      this.setState({ selectedDataListItemId: id });
    };

    this.onSearch = () => {
      const { results } = this.state;
      this.setState({ author: results[0] });
    };

    this.onClear = () => {
      this.setState({
        value: "",
        resultsCount: 0,
        currentResult: 1,
        results: [],
        author: "",
      });
    };

    this.onNext = () => {
      this.setState((prevState) => {
        const newCurrentResult = prevState.currentResult + 1;
        return {
          currentResult:
            newCurrentResult <= prevState.resultsCount
              ? newCurrentResult
              : prevState.resultsCount,
        };
      });
    };

    this.onPrevious = () => {
      this.setState((prevState) => {
        const newCurrentResult = prevState.currentResult - 1;
        return {
          currentResult: newCurrentResult > 0 ? newCurrentResult : 1,
        };
      });
    };
  }

  componentDidMount() {
    this.getAuthors();
  }

  componentWillUnmount() {}

  getAuthors() {
    fetch(`http://localhost:5002/getauthors`)
      .then((res) => res.json())
      .then((data) => {
        if (!Object.prototype.hasOwnProperty.call(data, "result")) {
          this.setState({
            value: "",
            resultsCount: 0,
            currentResult: 1,
            items: [],
            results: [],
            author: "",
          });
        } else if (data.result === "not found") {
          this.setState({
            value: "",
            resultsCount: 0,
            currentResult: 1,
            items: [],
            results: [],
            author: "",
          });
        } else {
          this.setState({ items: data.result });
        }
      })
      .catch((error) => {
        this.setState({
          value: "",
          resultsCount: 0,
          currentResult: 1,
          items: [],
          results: [],
          author: "",
        });
        console.error("Error:", error);
      });
  }

  makeDatalist() {
    const { results, selectedDataListItemId } = this.state;
    return (
      <DataList
        selectedDataListItemId={selectedDataListItemId}
        onSelectDataListItem={this.onSelectDataListItem}
      >
        {results.slice(0, 20).map((result, idx) => (
          <DataListItem key={idx}>
            <DataListItemRow>
              dataListCells=
              {[
                <DataListCell key={idx} isFilled>
                  <span id={idx}>{result}</span>
                </DataListCell>,
              ]}
            </DataListItemRow>
          </DataListItem>
        ))}
      </DataList>
    );
  }

  dataList() {
    const { value, currentResult, resultsCount } = this.state;
    return (
      <Grid>
        <GridItem span={12}>
          <SearchInput
            placeholder="Find authors name"
            value={value}
            onChange={this.onChange}
            onClear={this.onClear}
            resultsCount={`${currentResult} / ${resultsCount}`}
            onNextClick={this.onNext}
            onPreviousClick={this.onPrevious}
            onSearch={this.onSearch}
          />
        </GridItem>
        <GridItem span={12}>{this.makeDatalist()}</GridItem>
      </Grid>
    );
  }

  render() {
    const { author } = this.state;
    if (author === "") return this.dataList();
    return <UC4RecommandationAuthor author={author} />;
  }
}

export { UC4Recommandation };
