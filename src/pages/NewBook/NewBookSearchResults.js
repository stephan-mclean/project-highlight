import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Button, {
  DEFAULT_STYLE,
  OUTLINE_TYPE
} from "../../components/Button/Button";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import BookSummary from "../../components/BookSummary/BookSummary";

const SearchResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchResultIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors.foreground.default};
  font-size: 1rem;
`;

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
              <SearchResultContainer>
                <BookSummary
                  key={result.gBooksID}
                  {...result}
                  showDescription={false}
                />
                <SearchResultIcon icon="chevron-right" />
              </SearchResultContainer>
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
