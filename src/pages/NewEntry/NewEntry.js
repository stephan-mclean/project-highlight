import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextArea from "../../components/TextArea/TextArea";
import Input from "../../components/Input/Input";
import FileInput from "../../components/FileInput/FileInput";
import Picker from "../../components/Picker/Picker";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import Button, {
  ACCENT_STYLE,
  OUTLINE_TYPE
} from "../../components/Button/Button";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import AnnotatePassage from "./AnnotatePassage";
import { updateNewEntry, publishEntry, resetDraftEntry } from "../../actions";
import { uploadFile } from "../../firebase";
import { ROUTES } from "../../constants";

class NewEntryComp extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onBookPickerClick = this.onBookPickerClick.bind(this);
    this.renderNewEntryForm = this.renderNewEntryForm.bind(this);
    this.renderAnnotatePassage = this.renderAnnotatePassage.bind(this);
    this.onAddPassage = this.onAddPassage.bind(this);
    this.onCancelNewEntry = this.onCancelNewEntry.bind(this);
    this.cancelAnnotatePassage = this.cancelAnnotatePassage.bind(this);

    this.state = {
      shouldAnnotatePassage: false,
      isLoading: false,
      loadingFailed: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.newEntry.publishedEntry) {
      this.props.resetDraftEntry();
      this.props.history.push(ROUTES.ENTRIES.path);
    }

    if (
      this.props.passageFileVal &&
      this.props.passageFileVal !== prevProps.passageFileVal
    ) {
      this.setState({
        shouldAnnotatePassage: true
      });
    }
  }

  onSubmit(values) {
    const { notes, page } = values;
    const toPublish = {
      ...this.props.newEntry,
      notes: notes || "",
      page: page || "",
      passage: this.state.passage || this.props.newEntry.passage || {}
    };

    this.props.publishEntry(toPublish);
  }

  onBookPickerClick() {
    const newEntryVal = this.props.newEntry;

    this.props.updateNewEntry({
      ...newEntryVal,
      notes: this.props.notesFormVal,
      passage: this.state.passage
    });
    this.props.history.push(ROUTES.NEW_BOOK_FOR_ENTRY.path);
  }

  onCancelNewEntry() {
    this.props.resetDraftEntry();
    this.props.history.push(ROUTES.ENTRIES.path);
  }

  renderNewEntryForm() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="passageFile"
          label="Passage"
          accept="image/*"
          buttonType={OUTLINE_TYPE}
          component={FileInput}
        />

        <Field
          name="notes"
          label="Notes"
          placeholder="Add any additional notes you have here.."
          rows="4"
          component={TextArea}
          data-cy="new-entry-notes"
        />

        <Picker
          label="Book"
          onClick={this.onBookPickerClick}
          value={this.props.newEntry.book.title}
          data-cy="new-entry-book-picker"
        />

        {this.props.newEntry.book.title && (
          <Field name="page" label="Page" component={Input} />
        )}

        <ButtonGroup>
          <ButtonGroup.Item>
            <Button
              buttonType={OUTLINE_TYPE}
              type="button"
              onClick={this.onCancelNewEntry}
            >
              Cancel
            </Button>
          </ButtonGroup.Item>
          <ButtonGroup.Item>
            <Button
              type="submit"
              buttonType={OUTLINE_TYPE}
              buttonStyle={ACCENT_STYLE}
              data-cy="new-entry-submit-btn"
            >
              {this.props.newEntry.publishLoading && (
                <FontAwesomeIcon icon="spinner" spin />
              )}
              {!this.props.newEntry.publishLoading && "Add entry"}
            </Button>
          </ButtonGroup.Item>
        </ButtonGroup>
      </form>
    );
  }

  onAddPassage(addedPassage) {
    this.setState({ isLoading: true }, () => {
      uploadFile(addedPassage.file).then(url => {
        this.setState({
          passage: {
            file: url,
            fileDimensions: addedPassage.fileDimensions,
            highlights: addedPassage.highlights
          },
          isLoading: false,
          shouldAnnotatePassage: false
        });
      });
    });
  }

  cancelAnnotatePassage() {
    this.setState({ shouldAnnotatePassage: false });
  }

  renderAnnotatePassage() {
    return (
      <AnnotatePassage
        passageFile={this.props.passageFileVal}
        onAddPassage={this.onAddPassage}
        onCancel={this.cancelAnnotatePassage}
      />
    );
  }

  renderMain = () => {
    if (this.state.shouldAnnotatePassage) {
      return this.renderAnnotatePassage();
    }

    return this.renderNewEntryForm();
  };

  render() {
    return (
      <ContentLoader
        loading={this.state.isLoading}
        error={this.state.loadingFailed}
        onLoad={this.renderMain}
      />
    );
  }
}

NewEntryComp = reduxForm({
  form: "newentry"
})(NewEntryComp);

const selector = formValueSelector("newentry");
const mapStateToProps = state => {
  const notesVal = selector(state, "notes");
  const passageFileVal = selector(state, "passageFile");

  return {
    notesFormVal: notesVal,
    passageFileVal,
    newEntry: state.newEntry,
    initialValues: state.newEntry
  };
};

NewEntryComp = connect(
  mapStateToProps,
  { updateNewEntry, publishEntry, resetDraftEntry }
)(NewEntryComp);

export const NewEntry = NewEntryComp;
