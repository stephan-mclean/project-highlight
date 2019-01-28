import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import BookSummary from "../../components/BookSummary/BookSummary";
import EntryList from "../../components/EntryList/EntryList";
import { H6 } from "../../components/Fonts/Fonts";

const EntriesHeader = styled(H6)`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.foreground.default};
`;

class ViewBookComp extends Component {
  render() {
    return (
      <Fragment>
        <BookSummary {...this.props.book} />
        <EntriesHeader>Entries</EntriesHeader>
        <EntryList entries={this.props.entries} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ books, entries }, ownProps) => {
  return {
    book: books.list.find(book => book.id === ownProps.match.params.bookId),
    entries: entries.list
      ? entries.list.filter(
          entry => entry.book.id === ownProps.match.params.bookId
        )
      : []
  };
};

export const ViewBook = connect(
  mapStateToProps,
  null
)(ViewBookComp);
