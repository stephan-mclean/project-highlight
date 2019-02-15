import React, { Component } from "react";
import { connect } from "react-redux";
import { ROUTES } from "../../constants";
import { logInWithEmailAndPass } from "../../actions";
import PublicPageContainer from "../../components/PublicPageContainer/PublicPageContainer";
import { Heading } from "./styleHelper/styleHelper";
import AuthHelper from "./helper/SignUpLogInHelper";

class LoginComp extends Component {
  constructor(props) {
    super(props);

    this.goToSignUp = this.goToSignUp.bind(this);
    this.loginWithEmail = this.loginWithEmail.bind(this);
  }

  loginWithEmail(values) {
    const { email, password } = values;
    this.props.logInWithEmailAndPass(email, password);
  }

  goToSignUp() {
    this.props.history.push(ROUTES.SIGNUP.path);
  }

  getEmailBtnLabel() {
    return "Log in with email";
  }

  getGoogleBtnLabel() {
    return "Log in with google";
  }

  getFacebookBtnLabel() {
    return "Log in with facebook";
  }

  getOrBtnLabel() {
    return "Sign up";
  }

  render() {
    return (
      <PublicPageContainer>
        <Heading>Login</Heading>
        <AuthHelper
          handleOrBtnRedirect={this.goToSignUp}
          handleEmailFormSubmission={this.loginWithEmail}
          shouldEmailFormConfirmPassword={false}
          renderEmailBtnLabel={this.getEmailBtnLabel}
          renderGoogleBtnLabel={this.getGoogleBtnLabel}
          renderFacebookBtnLabel={this.getFacebookBtnLabel}
          renderOrBtnLabel={this.getOrBtnLabel}
        />
      </PublicPageContainer>
    );
  }
}

export const Login = connect(
  null,
  { logInWithEmailAndPass }
)(LoginComp);
