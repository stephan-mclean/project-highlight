import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getBooks } from "../../actions";

class BooksComp extends Component {
  componentWillMount() {
    console.log("load books");
    this.props.getBooks();
  }

  componentDidUpdate() {
    console.log("books update", this.props);
  }

  render() {
    return <Fragment>BOOKS</Fragment>;
  }
}

const mapStateToProps = ({ books }) => {
  return { books };
};

export const Books = connect(
  mapStateToProps,
  { getBooks }
)(BooksComp);
