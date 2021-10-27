import React from "react";
import {
  // DataListItemCells,
  Bullseye,
  Button,
  Card,
  DataList,
  DataListCell,
  DataListItem,
  DataListItemRow,
  Divider,
  EmptyState,
  EmptyStateSecondaryActions,
  EmptyStateVariant,
  Gallery,
  Grid,
  GridItem,
  SearchInput,
  Title,
} from "@patternfly/react-core";

import { UC4RecommandationAuthor } from "./UC4RecommandationAuthor.jsx";

import victorHugo from "../../../assets/hugo.jpg";
import delacroix from "../../../assets/delacroix.jpg";
import caroll from "../../../assets/caroll.jpg";
import koudelka from "../../../assets/koudelka.jpg";
import dore from "../../../assets/dore.jpg";
import utamaro from "../../../assets/utamaro.jpg";
import vian from "../../../assets/vian.jpg";

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
      tweets: [],
    };

    this.onChange = (value) => {
      const { items } = this.state;
      const res = items.filter((word) =>
        word.toLowerCase().includes(value.toLowerCase())
      );
      this.setState({
        value: value,
        resultsCount: value === "" ? 0 : res.length,
        results: value === "" ? [] : res,
      });
    };

    this.onSelectDataListItem = (id) => {
      this.setState({ selectedDataListItemId: id });
    };

    this.onClick = (author) => {
      console.log(author);
      this.setState({ author: author });
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
    this.getTweets();
  }

  componentWillUnmount() {}

  getTweets() {
    fetch(`http://localhost:5002/gettweets/`)
      .then((res) => res.json())
      .then((data) => {
        if (!Object.prototype.hasOwnProperty.call(data, "result")) {
          this.setState({ tweets: [] });
        } else if (data.result === "not found") {
          this.setState({ tweets: [] });
        } else {
          this.setState({ tweets: data.result });
        }
      })
      .catch((error) => {
        this.setState({ tweets: [] });
        console.error("Error:", error);
      });
  }

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

  acquireImage(idx) {
    if (idx === 0) {
      return delacroix;
    }
    if (idx === 1) {
      return victorHugo;
    }
    if (idx === 2) {
      return dore;
    }
    if (idx === 3) {
      return koudelka;
    }
    if (idx === 4) {
      return utamaro;
    }
    if (idx === 5) {
      return caroll;
    }
    return vian;
  }

  tweetGallery() {
    const { tweets } = this.state;
    console.log(tweets);
    return (
      <Gallery
        hasGutter
        minWidths={{
          md: "100px",
          lg: "150px",
          xl: "200px",
          "2xl": "300px",
        }}
      >
        {tweets.map((tweet, idx) => (
          <Card isHoverable isCompact key={idx}>
            <Bullseye>
              <EmptyState variant={EmptyStateVariant.xs}>
                <img
                  src={this.acquireImage(idx)}
                  alt="huge"
                  width="100"
                  height="100"
                />
                <Title headingLevel="h2" size="md">
                  {tweet.text}
                </Title>
                <Divider />
                <Title headingLevel="h6" size="md">
                  {tweet.date}
                </Title>
                <EmptyStateSecondaryActions>
                  <Button
                    variant="secondary"
                    onClick={() => this.onClick(tweet.author)}
                  >
                    Check Author
                  </Button>
                </EmptyStateSecondaryActions>
              </EmptyState>
            </Bullseye>
          </Card>
        ))}
      </Gallery>
    );
  }

  dataList() {
    const { value, currentResult, resultsCount } = this.state;
    const bottom =
      resultsCount !== 0 ? this.makeDatalist() : this.tweetGallery();
    return (
      <Grid hasGutter>
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
        <GridItem span={12} style={{ paddingLeft: "1em" }}>
          {bottom}
        </GridItem>
      </Grid>
    );
  }

  render() {
    const { author } = this.state;
    if (author == null || author === "") return this.dataList();
    return <UC4RecommandationAuthor author={author} />;
  }
}

export { UC4Recommandation };
