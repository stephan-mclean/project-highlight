import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import Input from "../../components/Input/Input";
import TextArea from "../../components/TextArea/TextArea";
import Button, {
  ACCENT_STYLE,
  OUTLINE_TYPE
} from "../../components/Button/Button";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";

class NewEntryComp extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.log("new entry submit", values);
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
              Add entry
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

export const NewEntry = NewEntryComp;
