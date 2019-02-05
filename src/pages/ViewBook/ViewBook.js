import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import BookSummary from "../../components/BookSummary/BookSummary";
import EntryList from "../../components/EntryList/EntryList";
import { H6 } from "../../components/Fonts/Fonts";

const EntriesHeader = styled(H6)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.foreground.default};
`;

class ViewBookComp extends Component {
  render() {
    return (
      <Fragment>
        <BookSummary {...this.props.book} />
        <EntriesHeader>Entries</EntriesHeader>
        <EntryList filterByBookID={this.props.match.params.bookId} />
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
