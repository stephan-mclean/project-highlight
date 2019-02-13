import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logOut } from "../../actions";
import Button, { DANGER_STYLE } from "../../components/Button/Button";

class SettingsComp extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.logOut();
  }

  render() {
    return (
      <Fragment>
        <Button type="button" buttonStyle={DANGER_STYLE} onClick={this.logOut}>
          Log Out
        </Button>
      </Fragment>
    );
  }
}

export const Settings = connect(
  null,
  { logOut }
)(SettingsComp);
