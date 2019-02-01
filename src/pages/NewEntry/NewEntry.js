import React, { Component, Fragment } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextArea from "../../components/TextArea/TextArea";
import Picker from "../../components/Picker/Picker";
import Button, {
  ACCENT_STYLE,
  OUTLINE_TYPE
} from "../../components/Button/Button";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import { updateNewEntry, publishEntry } from "../../actions";
import { ROUTES } from "../../constants";

class NewEntryComp extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onBookPickerClick = this.onBookPickerClick.bind(this);

    console.log("new entry", this.props);
  }

  componentDidUpdate(prevProps) {
    console.log("new entry update", this.props);

    if (this.props.newEntry.publishedEntry) {
      console.log("published, redirect");
      this.props.history.push(`/${ROUTES.ENTRIES}`);
    }
  }

  onSubmit(values) {
    console.log("new entry submit", values);

    const { notes } = values;
    const toPublish = {
      ...this.props.newEntry,
      notes
    };

    this.props.publishEntry(toPublish);
  }

  onBookPickerClick() {
    console.log("book picker click");

    const newEntryVal = this.props.newEntry;
    newEntryVal.notes = this.props.notesFormVal;

    console.log("storing draft entry", newEntryVal);
    this.props.updateNewEntry(newEntryVal);
    this.props.history.push(`/${ROUTES.NEW_BOOK_FOR_ENTRY}`);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="notes"
          label="Notes"
          placeholder="Add any additional notes you have here.."
          rows="4"
          component={TextArea}
        />

        <Picker
          label="Book"
          onClick={this.onBookPickerClick}
          value={this.props.newEntry.book.title}
        />

        <ButtonGroup>
          <ButtonGroup.Item>
            <Button buttonType={OUTLINE_TYPE} type="button">
              Cancel
            </Button>
          </ButtonGroup.Item>
          <ButtonGroup.Item>
            <Button
              type="submit"
              buttonType={OUTLINE_TYPE}
              buttonStyle={ACCENT_STYLE}
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
}

NewEntryComp = reduxForm({
  form: "newentry"
})(NewEntryComp);

const selector = formValueSelector("newentry");
const mapStateToProps = state => {
  const notesVal = selector(state, "notes");
  return {
    notesFormVal: notesVal,
    newEntry: state.newEntry,
    initialValues: state.newEntry
  };
};

NewEntryComp = connect(
  mapStateToProps,
  { updateNewEntry, publishEntry }
)(NewEntryComp);

export const NewEntry = NewEntryComp;
