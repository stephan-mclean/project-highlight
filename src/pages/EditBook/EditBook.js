import React, { Component } from "react";
import { connect } from "react-redux";
import NewBookManually from "../NewBook/manual/NewBookManually";
import { ROUTES } from "../../constants";

class EditBookComp extends Component {
  constructor(props) {
    super(props);

    this.onEditBook = this.onEditBook.bind(this);
    this.onCancelEditBook = this.onCancelEditBook.bind(this);
  }

  onEditBook(values) {
    console.log("edit book", values);
  }

  onCancelEditBook() {
    this.props.history.push(
      `/${ROUTES.BOOKS}/${this.props.match.params.bookId}`
    );
  }

  getEditBookBtnLabel() {
    return "Edit Book";
  }

  render() {
    return (
      <NewBookManually
        onAddBook={this.onEditBook}
        cancelAddBook={this.onCancelEditBook}
        initialValues={this.props.book}
        addBookLabel={this.getEditBookBtnLabel}
      />
    );
  }
}

const mapStateToProps = ({ books }, ownProps) => {
  return {
    book: books.list.find(book => book.id === ownProps.match.params.bookId)
  };
};

export const EditBook = connect(
  mapStateToProps,
  null
)(EditBookComp);
