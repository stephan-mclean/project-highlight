import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import BookSummary from "../../components/BookSummary/BookSummary";
import EntryList from "../../components/EntryList/EntryList";
import { H6 } from "../../components/Fonts/Fonts";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import Button, {
  LINK_TYPE,
  DANGER_STYLE
} from "../../components/Button/Button";
import { removeBookByID } from "../../actions";
import { ROUTES } from "../../constants";

const EntriesHeader = styled(H6)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.foreground.default};
`;

class ViewBookComp extends Component {
  constructor(props) {
    super(props);

    this.onEditBook = this.onEditBook.bind(this);
    this.onDeleteBook = this.onDeleteBook.bind(this);

    this.state = { canEditBook: !props.book.gBooksID };
  }

  onEditBook() {
    this.props.history.push(`/${ROUTES.BOOKS}/${this.props.book.id}/edit`);
  }

  onDeleteBook() {
    this.props.removeBookByID(this.props.book.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.book && !this.props.book) {
      // Book deleted, redirect
      this.props.history.push(`/${ROUTES.HOME}`);
    }
  }

  render() {
    return (
      <Fragment>
        <ButtonGroup right>
          {this.state.canEditBook && (
            <ButtonGroup.Item>
              <Button
                type="button"
                buttonType={LINK_TYPE}
                onClick={this.onEditBook}
              >
                Edit
              </Button>
            </ButtonGroup.Item>
          )}
          <ButtonGroup.Item>
            <Button
              type="button"
              buttonType={LINK_TYPE}
              buttonStyle={DANGER_STYLE}
              onClick={this.onDeleteBook}
            >
              Delete
            </Button>
          </ButtonGroup.Item>
        </ButtonGroup>

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
  { removeBookByID }
)(ViewBookComp);
