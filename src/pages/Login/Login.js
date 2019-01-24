import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ROUTES } from "../../constants";

class LoginComp extends Component {
  componentWillMount() {
    if (this.props.currentUser) {
      this.props.history.push(`/${ROUTES.PRIVATE}`);
    }
  }

  componentWillUpdate(prevProps) {
    if (this.props.currentUser && !prevProps.currentUser) {
      this.props.history.push(`/${ROUTES.PRIVATE}`);
    }
  }

  render() {
    return <Fragment>LOGIN</Fragment>;
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.currentUser
  };
};

export const Login = connect(mapStateToProps)(LoginComp);
