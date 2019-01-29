import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm, formValueSelector } from "redux-form";
import Input from "../../../components/Input/Input";
import FileInput from "../../../components/FileInput/FileInput";
import TextArea from "../../../components/TextArea/TextArea";
import Button, {
  ACCENT_STYLE,
  OUTLINE_TYPE
} from "../../../components/Button/Button";

class NewBookManually extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.coverImgFileValue && this.props.coverImgFileValue) {
      console.log("do file upload");
    }
  }

  onSubmit(values) {
    console.log("add book manually", values);

    //this.props.onAddBook(values);

    // TODO: Set the coverSrc prop to the value of the download url
    // of the file uploaded in the componentDidUpdate fn
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="coverImgFile"
          label="Cover Image"
          accept=".txt"
          buttonType={OUTLINE_TYPE}
          component={FileInput}
        />
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

NewBookManually = reduxForm({
  form: "addbookmanually"
})(NewBookManually);

const selector = formValueSelector("addbookmanually");
const mapStateToProps = state => {
  const coverImgFileValue = selector(state, "coverImgFile");

  return { coverImgFileValue };
};

export default connect(
  mapStateToProps,
  null
)(NewBookManually);
