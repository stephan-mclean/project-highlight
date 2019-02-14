import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ROUTES } from "../../constants";
import {
  signUpWithEmailAndPass,
  signInWithGoogle,
  signInWithFacebook
} from "../../actions";
import Button, {
  PRIMARY_STYLE,
  ACCENT_STYLE,
  LINK_TYPE
} from "../../components/Button/Button";
import { VerticalButtonGroup } from "../../components/ButtonGroup/ButtonGroup";
import PublicPageContainer from "../../components/PublicPageContainer/PublicPageContainer";
import { Heading, OrContainer, SubHeading } from "./styleHelper/styleHelper";
import SignUpEmailForm from "./form/SignUpEmailForm";

class SignUpComp extends Component {
  constructor(props) {
    super(props);

    this.signUp = this.signUp.bind(this);
    this.renderSignUpForm = this.renderSignUpForm.bind(this);
    this.toggleSignUpManually = this.toggleSignUpManually.bind(this);
    this.renderSignUpButtons = this.renderSignUpButtons.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);

    this.state = { isSigningUpManually: false };
  }

  componentWillMount() {
    if (this.props.currentUser) {
      this.props.history.push(`/${ROUTES.PRIVATE}`);
    }
  }

  componentDidUpdate() {
    if (this.props.currentUser) {
      this.props.history.push(`/${ROUTES.PRIVATE}`);
    }
  }

  toggleSignUpManually() {
    this.setState({ isSigningUpManually: !this.state.isSigningUpManually });
  }

  signUp(values) {
    const { email, password } = values;
    this.props.signUpWithEmailAndPass(email, password);
  }

  goToLogin() {
    this.props.history.push(`/${ROUTES.LOGIN}`);
  }

  loginWithGoogle() {
    console.log("login with google");
    this.props.signInWithGoogle();
  }

  loginWithFacebook() {
    console.log("login with facebook");
    this.props.signInWithFacebook();
  }

  renderSignUpForm() {
    return (
      <SignUpEmailForm
        onSubmit={this.signUp}
        onCancel={this.toggleSignUpManually}
        shouldConfirmPassword={true}
      />
    );
  }

  renderSignUpButtons() {
    return (
      <Fragment>
        <VerticalButtonGroup>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={ACCENT_STYLE}
              onClick={this.toggleSignUpManually}
              block
            >
              Sign up with email
            </Button>
          </VerticalButtonGroup.Item>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={PRIMARY_STYLE}
              onClick={this.loginWithGoogle}
              block
            >
              Sign up with google
            </Button>
          </VerticalButtonGroup.Item>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={PRIMARY_STYLE}
              onClick={this.loginWithFacebook}
              block
            >
              Sign up with facebook
            </Button>
          </VerticalButtonGroup.Item>
        </VerticalButtonGroup>

        <OrContainer>Or</OrContainer>

        <Button
          type="button"
          buttonType={LINK_TYPE}
          block
          onClick={this.goToLogin}
        >
          Log In
        </Button>
      </Fragment>
    );
  }

  render() {
    const { isSigningUpManually } = this.state;

    return (
      <PublicPageContainer>
        <Heading>Sign Up</Heading>
        <SubHeading>
          Start cataloging your digital notes for your physical books today
        </SubHeading>
        {!isSigningUpManually && this.renderSignUpButtons()}
        {isSigningUpManually && this.renderSignUpForm()}
      </PublicPageContainer>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.currentUser
  };
};

export const SignUp = connect(
  mapStateToProps,
  { signUpWithEmailAndPass, signInWithGoogle, signInWithFacebook }
)(SignUpComp);
