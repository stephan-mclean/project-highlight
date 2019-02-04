import React, { Component } from "react";
import { connect } from "react-redux";
import { getEntries } from "../../actions";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import EntryList from "../../components/EntryList/EntryList";

class EntriesComp extends Component {
  constructor(props) {
    super(props);

    this.props.getEntries();
    this.renderEntries = this.renderEntries.bind(this);
  }

  renderEntries() {
    return <EntryList entries={this.props.entries.list} />;
  }

  render() {
    return (
      <ContentLoader
        loading={this.props.entries.loading}
        error={this.props.entries.error}
        onLoad={this.renderEntries}
      />
    );
  }
}

const mapStateToProps = ({ entries }) => {
  return {
    entries: {
      ...entries,
      list: entries.list
        ? entries.list.sort((a, b) => {
            const firstEntryDate = new Date(a.createdDate);
            const secondEntryDate = new Date(b.createdDate);

            return secondEntryDate - firstEntryDate;
          })
        : []
    }
  };
};

export const Entries = connect(
  mapStateToProps,
  { getEntries }
)(EntriesComp);
