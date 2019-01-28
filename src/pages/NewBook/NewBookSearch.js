import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchBooks } from "../../actions";

class NewBookSearch extends Component {
  constructor(props) {
    super(props);

    this.onSearchSubmit = this.onSearchSubmit.bind(this);

    this.state = {
      // Initially show the search form
      shouldShowSearchForm: true
    };

    console.log("new book search", this.props);

    this.props.searchBooks({ author: "Tom Hanks" });
  }

  componentDidUpdate() {
    console.log("book search update", this.props);
  }

  onSearchSubmit(values) {
    console.log("search submit", values);
  }

  render() {
    return <div>SEARCH</div>;
  }
}

NewBookSearch.propTypes = {
  onAddBook: PropTypes.func.isRequired
};

const mapStateToProps = ({ bookSearch }) => {
  return { bookSearch };
};

NewBookSearch = connect(
  mapStateToProps,
  { searchBooks }
)(NewBookSearch);

export default NewBookSearch;
