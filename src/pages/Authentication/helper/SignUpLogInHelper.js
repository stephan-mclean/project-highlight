import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import EmailForm from "../form/SignUpEmailForm";
import { signInWithGoogle, signInWithFacebook } from "../../../actions";
import { ROUTES } from "../../../constants";
import Button, {
  PRIMARY_STYLE,
  ACCENT_STYLE,
  LINK_TYPE
} from "../../../components/Button/Button";
import { VerticalButtonGroup } from "../../../components/ButtonGroup/ButtonGroup";
import { OrContainer } from "../styleHelper/styleHelper";

class SignUpLogInHelper extends Component {
  constructor(props) {
    super(props);

    this.renderEmailForm = this.renderEmailForm.bind(this);
    this.renderAuthButtons = this.renderAuthButtons.bind(this);
    this.toggleEmailForm = this.toggleEmailForm.bind(this);

    this.authenticateWithGoogle = this.authenticateWithGoogle.bind(this);
    this.authenticateWithFacebook = this.authenticateWithFacebook.bind(this);

    this.state = { shouldRenderEmailForm: false };
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

  toggleEmailForm() {
    this.setState({ shouldRenderEmailForm: !this.state.shouldRenderEmailForm });
  }

  authenticateWithGoogle() {
    this.props.signInWithGoogle();
  }

  authenticateWithFacebook() {
    this.props.signInWithFacebook();
  }

  renderEmailForm() {
    return (
      <EmailForm
        onSubmit={this.props.handleEmailFormSubmission}
        onCancel={this.toggleEmailForm}
        shouldConfirmPassword={this.props.shouldEmailFormConfirmPassword}
      />
    );
  }

  renderAuthButtons() {
    return (
      <Fragment>
        <VerticalButtonGroup>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={ACCENT_STYLE}
              onClick={this.toggleEmailForm}
              block
            >
              {this.props.renderEmailBtnLabel()}
            </Button>
          </VerticalButtonGroup.Item>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={PRIMARY_STYLE}
              onClick={this.authenticateWithGoogle}
              block
            >
              {this.props.renderGoogleBtnLabel()}
            </Button>
          </VerticalButtonGroup.Item>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonStyle={PRIMARY_STYLE}
              onClick={this.authenticateWithFacebook}
              block
            >
              {this.props.renderFacebookBtnLabel()}
            </Button>
          </VerticalButtonGroup.Item>
        </VerticalButtonGroup>

        <OrContainer>Or</OrContainer>

        <Button
          type="button"
          buttonType={LINK_TYPE}
          block
          onClick={this.props.handleOrBtnRedirect}
        >
          {this.props.renderOrBtnLabel()}
        </Button>
      </Fragment>
    );
  }

  render() {
    const { shouldRenderEmailForm } = this.state;
    if (shouldRenderEmailForm) {
      return this.renderEmailForm();
    }

    return this.renderAuthButtons();
  }
}

SignUpLogInHelper.propTypes = {
  handleOrBtnRedirect: PropTypes.func.isRequired,
  handleEmailFormSubmission: PropTypes.func.isRequired,
  shouldEmailFormConfirmPassword: PropTypes.bool.isRequired,
  renderEmailBtnLabel: PropTypes.func.isRequired,
  renderGoogleBtnLabel: PropTypes.func.isRequired,
  renderFacebookBtnLabel: PropTypes.func.isRequired,
  renderOrBtnLabel: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.currentUser
  };
};

SignUpLogInHelper = withRouter(SignUpLogInHelper);

export default connect(
  mapStateToProps,
  { signInWithGoogle, signInWithFacebook }
)(SignUpLogInHelper);
