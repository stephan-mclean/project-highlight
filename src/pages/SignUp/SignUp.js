import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ROUTES } from "../../constants";
import { doLogin } from "../../actions";
import Button, {
  PRIMARY_STYLE,
  ACCENT_STYLE,
  LINK_TYPE
} from "../../components/Button/Button";
import { VerticalButtonGroup } from "../../components/ButtonGroup/ButtonGroup";
import PublicPageContainer from "../../components/PublicPageContainer/PublicPageContainer";
import { H4, H6, Overline } from "../../components/Fonts/Fonts";

const Heading = styled(H4)`
  margin-bottom: 0.5rem;
`;

const SubHeading = styled(H6)`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.foreground.tertiary};
`;

const OrContainer = styled(Overline)`
  display: block;
  text-align: center;
  margin-bottom: 1rem;
`;

class SignUpComp extends Component {
  constructor(props) {
    super(props);

    this.signUp = this.signUp.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
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

  signUp() {
    console.log("sign up");
  }

  goToLogin() {
    this.props.history.push(`/${ROUTES.LOGIN}`);
  }

  render() {
    return (
      <PublicPageContainer>
        <Heading>Sign Up</Heading>
        <SubHeading>
          Start cataloging your digital notes for your physical books today
        </SubHeading>
        <VerticalButtonGroup>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={ACCENT_STYLE}
              onClick={this.login}
              block
            >
              Sign up with email
            </Button>
          </VerticalButtonGroup.Item>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={PRIMARY_STYLE}
              onClick={this.login}
              block
            >
              Sign up with google
            </Button>
          </VerticalButtonGroup.Item>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={PRIMARY_STYLE}
              onClick={this.login}
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
  { doLogin }
)(SignUpComp);
