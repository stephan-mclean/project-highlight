import React, { Component } from "react";
import { connect } from "react-redux";
import { ROUTES } from "../../constants";
import { signUpWithEmailAndPass } from "../../actions";
import PublicPageContainer from "../../components/PublicPageContainer/PublicPageContainer";
import { Heading, SubHeading } from "./styleHelper/styleHelper";
import AuthHelper from "./helper/SignUpLogInHelper";

class SignUpComp extends Component {
  constructor(props) {
    super(props);

    this.signUp = this.signUp.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
  }

  signUp(values) {
    const { email, password } = values;
    this.props.signUpWithEmailAndPass(email, password);
  }

  goToLogin() {
    this.props.history.push(ROUTES.LOGIN.path);
  }

  getEmailBtnLabel() {
    return "Sign up with email";
  }

  getGoogleBtnLabel() {
    return "Sign up with google";
  }

  getFacebookBtnLabel() {
    return "Sign up with facebook";
  }

  getOrBtnLabel() {
    return "Log in";
  }

  render() {
    return (
      <PublicPageContainer>
        <Heading>Sign Up</Heading>
        <SubHeading>
          Start cataloging your digital notes for your physical books today
        </SubHeading>
        <AuthHelper
          handleOrBtnRedirect={this.goToLogin}
          handleEmailFormSubmission={this.signUp}
          shouldEmailFormConfirmPassword={true}
          renderEmailBtnLabel={this.getEmailBtnLabel}
          renderGoogleBtnLabel={this.getGoogleBtnLabel}
          renderFacebookBtnLabel={this.getFacebookBtnLabel}
          renderOrBtnLabel={this.getOrBtnLabel}
        />
      </PublicPageContainer>
    );
  }
}

export const SignUp = connect(
  null,
  { signUpWithEmailAndPass }
)(SignUpComp);
