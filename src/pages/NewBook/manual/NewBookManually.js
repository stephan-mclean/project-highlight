import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import Input from "../../../components/Input/Input";
import TextArea from "../../../components/TextArea/TextArea";
import Button, {
  ACCENT_STYLE,
  OUTLINE_TYPE
} from "../../../components/Button/Button";

class NewBookManually extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.onAddBook)}>
        <Field name="title" label="Title" type="text" component={Input} />
        <Field name="subtitle" label="Subtitle" type="text" component={Input} />
        <Field name="description" label="Description" component={TextArea} />

        <Button
          type="button"
          buttonType={OUTLINE_TYPE}
          onClick={this.props.cancelAddBook}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          buttonType={OUTLINE_TYPE}
          buttonStyle={ACCENT_STYLE}
        >
          Add Book
        </Button>
      </form>
    );
  }
}

NewBookManually.propTypes = {
  onAddBook: PropTypes.func.isRequired,
  cancelAddBook: PropTypes.func.isRequired
};

export default reduxForm({
  form: "addbookmanually"
})(NewBookManually);
