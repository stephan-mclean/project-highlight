import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import Input from "../../components/Input/Input";
import Button, {
  ACCENT_STYLE,
  OUTLINE_TYPE
} from "../../components/Button/Button";

class NewBookSearchForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.onSearchSubmit)}>
        <Field name="title" label="Title" type="text" component={Input} />
        <Field name="author" label="Author" type="text" component={Input} />
        <Field name="isbn" label="ISBN" type="text" component={Input} />
        <Button
          type="button"
          buttonType={OUTLINE_TYPE}
          onClick={this.props.cancelSearch}
        >
          Cancel
        </Button>
        <Button
          buttonType={OUTLINE_TYPE}
          buttonStyle={ACCENT_STYLE}
          type="submit"
        >
          Search
        </Button>
      </form>
    );
  }
}

NewBookSearchForm.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  cancelSearch: PropTypes.func.isRequired
};

export default reduxForm({
  form: "booksearch"
})(NewBookSearchForm);
