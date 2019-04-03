import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uploadFile } from "../../../firebase";
import { required } from "../../../form/validations";
import Input from "../../../components/Input/Input";
import FileInput from "../../../components/FileInput/FileInput";
import TextArea from "../../../components/TextArea/TextArea";
import Button, {
  ACCENT_STYLE,
  OUTLINE_TYPE
} from "../../../components/Button/Button";
import ButtonGroup from "../../../components/ButtonGroup/ButtonGroup";

class NewBookManually extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.coverImgFileValue !== this.props.coverImgFileValue &&
      this.props.coverImgFileValue
    ) {
      uploadFile(this.props.coverImgFileValue).then(url => {
        console.log("IT WORKED", url);

        this.setState({ coverSrc: url });
      });
    }
  }

  onSubmit(values) {
    if (this.state && this.state.coverSrc) {
      delete values["coverImgFile"];
      values.coverSrc = this.state.coverSrc;
    }

    this.props.onAddBook(values);
  }

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      pristine,
      isAddLoading
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="coverImgFile"
          label="Cover Image"
          accept="image/*"
          buttonType={OUTLINE_TYPE}
          component={FileInput}
        />
        <Field
          validate={required}
          name="title"
          label="Title"
          type="text"
          data-cy="new-book-manually-title"
          component={Input}
        />
        <Field name="subtitle" label="Subtitle" type="text" component={Input} />
        <Field
          name="description"
          rows="4"
          label="Description"
          data-cy="new-book-manually-description"
          component={TextArea}
        />

        <ButtonGroup right>
          <ButtonGroup.Item>
            <Button
              type="button"
              buttonType={OUTLINE_TYPE}
              onClick={this.props.cancelAddBook}
            >
              {this.props.cancelAddBookLabel()}
            </Button>
          </ButtonGroup.Item>
          <ButtonGroup.Item>
            <Button
              type="submit"
              buttonType={OUTLINE_TYPE}
              buttonStyle={ACCENT_STYLE}
              disabled={invalid || submitting || pristine}
              data-cy="new-book-manually-submit-btn"
            >
              {isAddLoading && <FontAwesomeIcon icon="spinner" spin />}
              {!isAddLoading && this.props.addBookLabel()}
            </Button>
          </ButtonGroup.Item>
        </ButtonGroup>
      </form>
    );
  }
}

NewBookManually.propTypes = {
  onAddBook: PropTypes.func.isRequired,
  cancelAddBook: PropTypes.func.isRequired,
  addBookLabel: PropTypes.func,
  cancelAddBookLabel: PropTypes.func,
  isAddLoading: PropTypes.bool
};

NewBookManually.defaultProps = {
  addBookLabel: () => "Add Book",
  cancelAddBookLabel: () => "Cancel"
};

NewBookManually = reduxForm({
  form: "addbookmanually"
})(NewBookManually);

const selector = formValueSelector("addbookmanually");
const mapStateToProps = (state, ownProps) => {
  const coverImgFileValue = selector(state, "coverImgFile");
  const { initialValues } = ownProps;
  return { coverImgFileValue, initialValues };
};

export default connect(
  mapStateToProps,
  null
)(NewBookManually);
