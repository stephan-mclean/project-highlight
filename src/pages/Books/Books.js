import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getBooks, getEntries } from "../../actions";
import BookTile, { BookTileGrid } from "../../components/BookTile/BookTile";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import { ROUTES } from "../../constants";

class BooksComp extends Component {
  constructor(props) {
    super(props);

    this.props.getBooks();
    // Preload entries
    this.props.getEntries();

    this.renderBooks = this.renderBooks.bind(this);
  }

  renderBooks() {
    return (
      <Fragment>
        {this.props.books.list && this.props.books.list.length && (
          <BookTileGrid>
            {this.props.books.list.map(book => (
              <BookTile
                key={book.id}
                {...book}
                onClick={() =>
                  this.props.history.push(`/${ROUTES.BOOKS}/${book.id}`)
                }
              />
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
  return { books };
};

export const Books = connect(
  mapStateToProps,
  { getBooks, getEntries }
)(BooksComp);
