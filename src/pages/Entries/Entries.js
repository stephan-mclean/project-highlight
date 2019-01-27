import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getEntries } from "../../actions";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import Entry from "../../components/Entry/Entry";

class EntriesComp extends Component {
  constructor(props) {
    super(props);

    this.props.getEntries();
    this.renderEntries = this.renderEntries.bind(this);
  }

  renderEntries() {
    return (
      <Fragment>
        {this.props.entries.list && this.props.entries.list.length && (
          <Fragment>
            {this.props.entries.list.map(entry => {
              return <Entry {...entry} key={entry.id} />;
            })}
          </Fragment>
        )}
      </Fragment>
    );
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
