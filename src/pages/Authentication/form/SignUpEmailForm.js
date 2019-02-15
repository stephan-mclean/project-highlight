import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { required } from "../../../form/validations";
import Input from "../../../components/Input/Input";
import Button, {
  ACCENT_STYLE,
  OUTLINE_TYPE
} from "../../../components/Button/Button";
import { VerticalButtonGroup } from "../../../components/ButtonGroup/ButtonGroup";

class SignUpEmailForm extends Component {
  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      pristine,
      shouldConfirmPassword
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <Field
          name="email"
          type="text"
          label="Email"
          component={Input}
          validate={required}
        />
        <Field
          name="password"
          label="Password"
          type="password"
          component={Input}
          validate={required}
        />

        {shouldConfirmPassword && (
          <Field
            name="confirmpassword"
            label="Confirm Password"
            type="password"
            component={Input}
            validate={required}
          />
        )}

        <VerticalButtonGroup>
          <VerticalButtonGroup.Item>
            <Button
              type="submit"
              buttonStyle={ACCENT_STYLE}
              block
              disabled={invalid || submitting || pristine}
            >
              {this.props.submitBtnLabel()}
            </Button>
          </VerticalButtonGroup.Item>
          <VerticalButtonGroup.Item>
            <Button
              type="button"
              buttonType={OUTLINE_TYPE}
              block
              onClick={this.props.onCancel}
            >
              {this.props.cancelBtnLabel()}
            </Button>
          </VerticalButtonGroup.Item>
        </VerticalButtonGroup>
      </form>
    );
  }
}

SignUpEmailForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitBtnLabel: PropTypes.func,
  cancelBtnLabel: PropTypes.func,
  shouldConfirmPassword: PropTypes.bool
};

SignUpEmailForm.defaultProps = {
  submitBtnLabel: () => "Sign Up",
  cancelBtnLabel: () => "Cancel",
  shouldConfirmPassword: true
};

export default reduxForm({
  form: "signupemail",
  validate: (values, props) => {
    const errors = {};
    if (props.shouldConfirmPassword) {
      if (values.password !== values.confirmpassword) {
        const error = "Passwords must match";
        errors.password = error;
        errors.confirmpassword = error;
      }
    }
    return errors;
  }
})(SignUpEmailForm);
