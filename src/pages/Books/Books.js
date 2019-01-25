import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getBooks } from "../../actions";
import BookTile, { BookTileGrid } from "../../components/BookTile/BookTile";

class BooksComp extends Component {
  componentWillMount() {
    console.log("load books");
    this.props.getBooks();
  }

  componentDidUpdate() {
    console.log("books update", this.props);
  }

  render() {
    return (
      <Fragment>
        {this.props.books.list && this.props.books.list.length && (
          <BookTileGrid>
            {this.props.books.list.map(book => (
              <BookTile {...book} />
            ))}
          </BookTileGrid>
        )}
        {(!this.props.books.list || !this.props.books.list.length) && (
          <div>NO BOOKS</div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ books }) => {
  return { books };
};

export const Books = connect(
  mapStateToProps,
  { getBooks }
)(BooksComp);
