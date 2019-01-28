import React, { Component } from "react";
import { connect } from "react-redux";
import TabSet, { Tab } from "../../components/TabSet/TabSet";
import NewBookSearch from "./NewBookSearch";
import { addBook } from "../../actions";

class NewBookComp extends Component {
  constructor(props) {
    super(props);

    this.renderBookSearchTab = this.renderBookSearchTab.bind(this);
    this.renderAddManuallyTab = this.renderAddManuallyTab.bind(this);
    this.onAddBook = this.onAddBook.bind(this);
  }

  renderBookSearchTab() {
    return <NewBookSearch onAddBook={this.onAddBook} />;
  }

  renderAddManuallyTab() {
    return <div>ADD MANUALLY</div>;
  }

  onAddBook(book) {
    console.log("on add book", this, book);
    this.props.addBook(book);
  }

  render() {
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
