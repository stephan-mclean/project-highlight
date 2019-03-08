import React, { Component } from "react";
import { connect } from "react-redux";
import TabSet, { Tab } from "../../components/TabSet/TabSet";
import NewBookSearch from "./search/NewBookSearch";
import NewBookSearchResults from "./search/NewBookSearchResults";
import NewBookManually from "./manual/NewBookManually";
import { addBook, resetNewBook, updateNewEntry } from "../../actions";
import { ROUTES } from "../../constants";

class NewBookComp extends Component {
  constructor(props) {
    super(props);

    this.renderBookSearchTab = this.renderBookSearchTab.bind(this);
    this.renderAddManuallyTab = this.renderAddManuallyTab.bind(this);
    this.renderLibraryTab = this.renderLibraryTab.bind(this);
    this.onAddBook = this.onAddBook.bind(this);
    this.onChooseBookForEntry = this.onChooseBookForEntry.bind(this);
    this.goToHome = this.goToHome.bind(this);

    const isForEntry =
      this.props.location.pathname === ROUTES.NEW_BOOK_FOR_ENTRY.path;

    this.state = {
      isForEntry
    };
  }

  renderBookSearchTab() {
    return (
      <NewBookSearch onAddBook={this.onAddBook} cancelAddBook={this.goToHome} />
    );
  }

  renderAddManuallyTab() {
    return (
      <NewBookManually
        onAddBook={this.onAddBook}
        cancelAddBook={this.goToHome}
      />
    );
  }

  renderLibraryTab() {
    const books = {
      ...this.props.books,
      results: this.props.books.list // search results comp expects results as list name
    };

    console.log("going to render", books);

    return (
      <NewBookSearchResults
        search={books}
        hideBackToSearch={true}
        onAddBook={this.onChooseBookForEntry}
      />
    );
  }

  goToHome() {
    this.props.history.push(ROUTES.HOME.path);
  }

  onAddBook(book) {
    this.props.addBook(book);
  }

  componentDidUpdate() {
    const { newBook } = this.props;
    if (newBook.bookAdded) {
      this.props.resetNewBook();
      if (this.state.isForEntry) {
        console.log("need to go to new entry here");
        this.onChooseBookForEntry(newBook.bookAdded);
      } else {
        this.goToHome();
      }
    }
  }

  onChooseBookForEntry(book) {
    console.log("chose library book", book);

    this.props.updateNewEntry({
      ...this.props.newEntry,
      book
    });

    this.props.history.push(ROUTES.NEW_ENTRY.path);
  }

  render() {
    if (this.state.isForEntry) {
      return (
        <TabSet>
          <Tab
            render={this.renderLibraryTab}
            header="My Books"
            data-cy="tab-my-books"
          />
          <Tab
            render={this.renderBookSearchTab}
            header="Search"
            data-cy="tab-search"
          />
          <Tab
            render={this.renderAddManuallyTab}
            header="Add manually"
            data-cy="tab-add-manually"
          />
        </TabSet>
      );
    }

    return (
      <TabSet>
        <Tab
          render={this.renderBookSearchTab}
          header="Search"
          data-cy="tab-search"
        />
        <Tab
          render={this.renderAddManuallyTab}
          header="Add manually"
          data-cy="tab-add-manually"
        />
      </TabSet>
    );
  }
}

const mapStateToProps = ({ books, newEntry, newBook }) => {
  return {
    books,
    newEntry,
    newBook
  };
};

export const NewBook = connect(
  mapStateToProps,
  { addBook, resetNewBook, updateNewEntry }
)(NewBookComp);
