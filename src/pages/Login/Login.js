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
import { H4, Overline } from "../../components/Fonts/Fonts";

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

    this.login = this.login.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
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

  login() {
    this.props.doLogin();
  }

  goToSignUp() {
    this.props.history.push(`/${ROUTES.SIGNUP}`);
  }

  render() {
    return (
      <PublicPageContainer>
        <Heading>Login</Heading>
        <VerticalButtonGroup>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={ACCENT_STYLE}
              onClick={this.login}
              block
            >
              Log in with email
            </Button>
          </VerticalButtonGroup.Item>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={PRIMARY_STYLE}
              onClick={this.login}
              block
            >
              Log in with google
            </Button>
          </VerticalButtonGroup.Item>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={PRIMARY_STYLE}
              onClick={this.login}
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
  { doLogin }
)(LoginComp);
