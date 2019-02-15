import React, { Component } from "react";
import { connect } from "react-redux";
import NewBookManually from "../NewBook/manual/NewBookManually";
import { ROUTES } from "../../constants";
import { editBook as doEditBook } from "../../actions";

class EditBookComp extends Component {
  constructor(props) {
    super(props);

    this.onEditBook = this.onEditBook.bind(this);
    this.onCancelEditBook = this.onCancelEditBook.bind(this);
    this.returnToViewBook = this.returnToViewBook.bind(this);
  }

  componentDidUpdate() {
    const { editBook } = this.props;
    if (editBook.editBookPublished) {
      this.returnToViewBook();
    }
  }

  returnToViewBook() {
    this.props.history.push(
      `${ROUTES.BOOKS.path}/${this.props.match.params.bookId}`
    );
  }

  onEditBook(values) {
    this.props.doEditBook(values);
  }

  onCancelEditBook() {
    this.returnToViewBook();
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

const mapStateToProps = ({ books, editBook }, ownProps) => {
  return {
    book: books.list.find(book => book.id === ownProps.match.params.bookId),
    editBook
  };
};

export const EditBook = connect(
  mapStateToProps,
  { doEditBook }
)(EditBookComp);
