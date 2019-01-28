import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Button, {
  DEFAULT_STYLE,
  OUTLINE_TYPE
} from "../../components/Button/Button";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import BookSummary from "../../components/BookSummary/BookSummary";

class NewBookSearchResults extends Component {
  constructor(props) {
    super(props);

    this.renderSearchResultsList = this.renderSearchResultsList.bind(this);
  }

  renderSearchResultsList() {
    const { search } = this.props;
    if (search.results && search.results.length) {
      return (
        <Fragment>
          {search.results.map(result => {
            return (
              <BookSummary
                key={result.gBooksID}
                {...result}
                showDescription={false}
              />
            );
          })}
        </Fragment>
      );
    }

    return <Fragment>NO RESULTS</Fragment>;
  }

  render() {
    return (
      <Fragment>
        <ContentLoader
          loading={this.props.search.loading}
          error={this.props.search.error}
          onLoad={this.renderSearchResultsList}
        />

        <Button
          type={OUTLINE_TYPE}
          buttonStyle={DEFAULT_STYLE}
          onClick={this.props.backToSearch}
        >
          Back
        </Button>
      </Fragment>
    );
  }
}

NewBookSearchResults.propTypes = {
  search: PropTypes.object.isRequired,
  backToSearch: PropTypes.func.isRequired
};

export default NewBookSearchResults;
