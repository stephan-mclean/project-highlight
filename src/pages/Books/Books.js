import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getBooks, getEntries, removeBooksByID } from "../../actions";
import BookTile, { BookTileGrid } from "../../components/BookTile/BookTile";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import Button, {
  LINK_TYPE,
  DANGER_STYLE
} from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import { ROUTES } from "../../constants";

const BookTileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

class BooksComp extends Component {
  constructor(props) {
    super(props);

    this.props.getBooks();
    // Preload entries
    this.props.getEntries();

    this.renderBooks = this.renderBooks.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.markedForDeletion = this.markedForDeletion.bind(this);
    this.onDeleteBooks = this.onDeleteBooks.bind(this);

    this.state = { editMode: false, booksToDelete: [] };
  }

  handleBookClick(book) {
    console.log("book click", book);
    if (this.state.editMode) {
      this.toggleBookSelection(book);
    } else {
      this.props.history.push(`/${ROUTES.BOOKS}/${book.id}`);
    }
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode,
      booksToDelete: []
    });
  }

  onDeleteBooks() {
    this.props.removeBooksByID(this.state.booksToDelete);
    this.setState({
      editMode: false,
      booksToDelete: []
    });
  }

  markedForDeletion(book) {
    return this.state.booksToDelete.includes(book.id);
  }

  toggleBookSelection(book) {
    console.log("toggle book", book);
    const { booksToDelete } = this.state;
    if (booksToDelete.includes(book.id)) {
      const indexOfBook = booksToDelete.indexOf(book.id);
      this.setState({
        booksToDelete: booksToDelete.filter((item, i) => indexOfBook !== i)
      });
    } else {
      this.setState({
        booksToDelete: [...booksToDelete, book.id]
      });
    }
  }

  renderBooks() {
    return (
      <Fragment>
        <ButtonGroup right>
          {!this.state.editMode && (
            <ButtonGroup.Item>
              <Button buttonType={LINK_TYPE} onClick={this.toggleEditMode}>
                Edit
              </Button>
            </ButtonGroup.Item>
          )}
          {this.state.editMode && (
            <ButtonGroup.Item>
              <Button buttonType={LINK_TYPE} onClick={this.toggleEditMode}>
                Cancel
              </Button>
            </ButtonGroup.Item>
          )}
          {this.state.editMode && this.state.booksToDelete.length > 0 && (
            <ButtonGroup.Item>
              <Button
                buttonType={LINK_TYPE}
                buttonStyle={DANGER_STYLE}
                onClick={this.onDeleteBooks}
              >
                Delete
              </Button>
            </ButtonGroup.Item>
          )}
        </ButtonGroup>

        {this.props.books.list && this.props.books.list.length > 0 && (
          <BookTileGrid>
            {this.props.books.list.map(book => (
              <BookTileContainer key={book.id}>
                <BookTile
                  {...book}
                  onClick={this.handleBookClick.bind(this, book)}
                />

                {this.state.editMode && (
                  <Checkbox
                    label="Select"
                    input={{
                      checked: this.markedForDeletion(book),
                      onChange: this.toggleBookSelection.bind(this, book)
                    }}
                  />
                )}
              </BookTileContainer>
            ))}
          </BookTileGrid>
        )}

        {(!this.props.books.list || !this.props.books.list.length) && (
          <Fragment>NO BOOKS</Fragment>
        )}
      </Fragment>
    );
  }

  render() {
    return (
      <ContentLoader
        loading={this.props.books.loading}
        error={this.props.books.error}
        onLoad={this.renderBooks}
      />
    );
  }
}

const mapStateToProps = ({ books }) => {
  return {
    books: {
      ...books,
      list: books.list
        ? books.list.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }

            return 0;
          })
        : []
    }
  };
};

export const Books = connect(
  mapStateToProps,
  { getBooks, getEntries, removeBooksByID }
)(BooksComp);
