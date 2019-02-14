import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ROUTES } from "../../constants";
import {
  logInWithEmailAndPass,
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
import { H4, Overline } from "../../components/Fonts/Fonts";
import LogInEmailForm from "../SignUp/form/SignUpEmailForm";

const Heading = styled(H4)`
  margin-bottom: 1rem;
`;

const OrContainer = styled(Overline)`
  display: block;
  text-align: center;
  margin-bottom: 1rem;
`;

class LoginComp extends Component {
  constructor(props) {
    super(props);

    this.goToSignUp = this.goToSignUp.bind(this);
    this.renderLoginButtons = this.renderLoginButtons.bind(this);
    this.renderLogInEmailForm = this.renderLogInEmailForm.bind(this);
    this.loginWithEmail = this.loginWithEmail.bind(this);
    this.toggleLoginWithEmailForm = this.toggleLoginWithEmailForm.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);

    this.state = { isLoggingInWithEmail: false };
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

  loginWithGoogle() {
    console.log("login with google");
    this.props.signInWithGoogle();
  }

  loginWithFacebook() {
    console.log("login with facebook");
    this.props.signInWithFacebook();
  }

  loginWithEmail(values) {
    const { email, password } = values;
    this.props.logInWithEmailAndPass(email, password);
  }

  toggleLoginWithEmailForm() {
    this.setState({ isLoggingInWithEmail: !this.state.isLoggingInWithEmail });
  }

  getLoginEmailSubmitBtnLabel() {
    return "Log In";
  }

  goToSignUp() {
    this.props.history.push(`/${ROUTES.SIGNUP}`);
  }

  renderLogInEmailForm() {
    return (
      <LogInEmailForm
        onSubmit={this.loginWithEmail}
        onCancel={this.toggleLoginWithEmailForm}
        submitBtnLabel={this.getLoginEmailSubmitBtnLabel}
        shouldConfirmPassword={false}
      />
    );
  }

  renderLoginButtons() {
    return (
      <Fragment>
        <VerticalButtonGroup>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={ACCENT_STYLE}
              onClick={this.toggleLoginWithEmailForm}
              block
            >
              Log in with email
            </Button>
          </VerticalButtonGroup.Item>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={PRIMARY_STYLE}
              onClick={this.loginWithGoogle}
              block
            >
              Log in with google
            </Button>
          </VerticalButtonGroup.Item>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={PRIMARY_STYLE}
              onClick={this.loginWithFacebook}
              block
            >
              Log in with facebook
            </Button>
          </VerticalButtonGroup.Item>
        </VerticalButtonGroup>

        <OrContainer>Or</OrContainer>

        <Button
          type="button"
          buttonType={LINK_TYPE}
          block
          onClick={this.goToSignUp}
        >
          Sign up
        </Button>
      </Fragment>
    );
  }

  render() {
    const { isLoggingInWithEmail } = this.state;
    return (
      <PublicPageContainer>
        <Heading>Login</Heading>
        {isLoggingInWithEmail && this.renderLogInEmailForm()}
        {!isLoggingInWithEmail && this.renderLoginButtons()}
      </PublicPageContainer>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.currentUser
  };
};

export const Login = connect(
  mapStateToProps,
  { logInWithEmailAndPass, signInWithGoogle, signInWithFacebook }
)(LoginComp);
