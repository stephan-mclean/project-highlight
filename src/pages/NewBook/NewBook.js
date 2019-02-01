import React, { Component } from "react";
import { connect } from "react-redux";
import TabSet, { Tab } from "../../components/TabSet/TabSet";
import NewBookSearch from "./search/NewBookSearch";
import NewBookManually from "./manual/NewBookManually";
import { addBook } from "../../actions";
import { ROUTES } from "../../constants";

class NewBookComp extends Component {
  constructor(props) {
    super(props);

    this.renderBookSearchTab = this.renderBookSearchTab.bind(this);
    this.renderAddManuallyTab = this.renderAddManuallyTab.bind(this);
    this.renderLibraryTab = this.renderLibraryTab.bind(this);
    this.onAddBook = this.onAddBook.bind(this);
    this.goToHome = this.goToHome.bind(this);

    const isForEntry =
      this.props.location.pathname === `/${ROUTES.NEW_BOOK_FOR_ENTRY}`;

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
    return <div>LIBRARY</div>;
  }

  goToHome() {
    this.props.history.push(`/${ROUTES.HOME}`);
  }

  onAddBook(book) {
    this.props.addBook(book);
    this.goToHome();
  }

  render() {
    if (this.state.isForEntry) {
      return (
        <TabSet>
          <Tab render={this.renderLibraryTab} header="My Books" />
          <Tab render={this.renderBookSearchTab} header="Search" />
          <Tab render={this.renderAddManuallyTab} header="Add manually" />
        </TabSet>
      );
    }

    return (
      <TabSet>
        <Tab render={this.renderBookSearchTab} header="Search" />
        <Tab render={this.renderAddManuallyTab} header="Add manually" />
      </TabSet>
    );
  }
}

export const NewBook = connect(
  null,
  { addBook }
)(NewBookComp);
