import React, { Component } from "react";
import PropTypes from "prop-types";

class NewBookSearch extends Component {
  constructor(props) {
    super(props);

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
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

export default NewBookSearch;
