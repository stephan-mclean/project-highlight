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
    entries
  };
};

export const Entries = connect(
  mapStateToProps,
  { getEntries }
)(EntriesComp);
