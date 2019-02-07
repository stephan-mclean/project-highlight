import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import BookSummary from "../../components/BookSummary/BookSummary";
import EntryList from "../../components/EntryList/EntryList";
import { H6 } from "../../components/Fonts/Fonts";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import Button, { LINK_TYPE } from "../../components/Button/Button";

const EntriesHeader = styled(H6)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.foreground.default};
`;

class ViewBookComp extends Component {
  constructor(props) {
    super(props);

    this.onEditBook = this.onEditBook.bind(this);

    this.state = { canEditBook: !props.book.gBooksID };
  }

  onEditBook() {
    console.log("on edit book");
  }

  render() {
    return (
      <Fragment>
        {this.state.canEditBook && (
          <ButtonGroup right>
            <ButtonGroup.Item>
              <Button
                type="button"
                buttonType={LINK_TYPE}
                onClick={this.onEditBook}
              >
                Edit
              </Button>
            </ButtonGroup.Item>
          </ButtonGroup>
        )}
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
