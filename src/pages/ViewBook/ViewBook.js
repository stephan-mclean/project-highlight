import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import BookSummary from "../../components/BookSummary/BookSummary";

class ViewBookComp extends Component {
  render() {
    return (
      <Fragment>
        <BookSummary {...this.props.book} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ books }, ownProps) => {
  return {
    book: books.list.find(book => book.id === ownProps.match.params.bookId)
  };
};

export const ViewBook = connect(
  mapStateToProps,
  null
)(ViewBookComp);
