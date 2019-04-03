import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchBooks } from "../../../actions";
import NewBookSearchResults from "./NewBookSearchResults";
import NewBookSearchForm from "./NewBookSearchForm";

class NewBookSearch extends Component {
  constructor(props) {
    super(props);

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.renderSearchForm = this.renderSearchForm.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.backToSearch = this.backToSearch.bind(this);

    this.state = {
      // Initially show the search form
      shouldShowSearchForm: true
    };
  }

  onSearchSubmit(values) {
    this.props.searchBooks(values);
    // Store the search values to allow the request to be retried.
    this.setState({ shouldShowSearchForm: false, currentSearchValues: values });
  }

  renderSearchForm() {
    return (
      <NewBookSearchForm
        cancelSearch={this.props.cancelAddBook}
        onSearchSubmit={this.onSearchSubmit}
      />
    );
  }

  backToSearch() {
    this.setState({ shouldShowSearchForm: true });
  }

  renderSearchResults() {
    const retrySearch = this.onSearchSubmit.bind(
      this,
      this.state.currentSearchValues
    );
    return (
      <NewBookSearchResults
        search={this.props.bookSearch}
        backToSearch={this.backToSearch}
        onAddBook={this.props.onAddBook}
        retrySearch={retrySearch}
      />
    );
  }

  render() {
    return (
      <Fragment>
        {this.state.shouldShowSearchForm && this.renderSearchForm()}
        {!this.state.shouldShowSearchForm && this.renderSearchResults()}
      </Fragment>
    );
  }
}

NewBookSearch.propTypes = {
  onAddBook: PropTypes.func.isRequired,
  cancelAddBook: PropTypes.func.isRequired
};

const mapStateToProps = ({ bookSearch }) => {
  return { bookSearch };
};

NewBookSearch = withRouter(NewBookSearch);

NewBookSearch = connect(
  mapStateToProps,
  { searchBooks }
)(NewBookSearch);

export default NewBookSearch;
