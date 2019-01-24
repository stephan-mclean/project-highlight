import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getEntries } from "../../actions";

class EntriesComp extends Component {
  componentWillMount() {
    this.props.getEntries();
  }

  componentDidUpdate() {
    console.log("entries update", this.props);
  }

  render() {
    return <Fragment>ENTRIES</Fragment>;
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
