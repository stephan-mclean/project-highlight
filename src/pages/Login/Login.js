import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ROUTES } from "../../constants";
import { doLogin } from "../../actions";
import Button, {
  OUTLINE_TYPE,
  PRIMARY_STYLE
} from "../../components/Button/Button";

class LoginComp extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
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

  render() {
    return (
      <Fragment>
        <Button
          type={OUTLINE_TYPE}
          buttonStyle={PRIMARY_STYLE}
          onClick={this.login}
        >
          Log in
        </Button>
      </Fragment>
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
