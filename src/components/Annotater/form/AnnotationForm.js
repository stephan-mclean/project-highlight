import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import TextArea from "../../TextArea/TextArea";
import Button, { OUTLINE_TYPE, ACCENT_STYLE } from "../../Button/Button";
import ButtonGroup from "../../ButtonGroup/ButtonGroup";

class AnnotationForm extends Component {
  constructor(props) {
    super(props);

    this.onNotesChange = this.onNotesChange.bind(this);
    this.finishAnnotating = this.finishAnnotating.bind(this);

    this.state = {
      notes: this.props.annotation.notes
    };
  }

  onNotesChange(e) {
    const notes = e.target.value;
    this.setState({ notes });
  }

  finishAnnotating() {
    const { notes } = this.state;
    const annotation = {
      ...this.props.annotation,
      notes
    };

    this.props.onComplete(annotation);
  }

  render() {
    return (
      <Fragment>
        <TextArea
          label="Notes"
          input={{ value: this.state.notes, onChange: this.onNotesChange }}
        />

        <ButtonGroup right>
          <ButtonGroup.Item>
            <Button
              type="button"
              buttonType={OUTLINE_TYPE}
              onClick={this.props.onCancel}
            >
              Cancel
            </Button>
          </ButtonGroup.Item>
          <ButtonGroup.Item>
            <Button
              type="button"
              buttonType={OUTLINE_TYPE}
              buttonStyle={ACCENT_STYLE}
              onClick={this.finishAnnotating}
            >
              Add Annotation
            </Button>
          </ButtonGroup.Item>
        </ButtonGroup>
      </Fragment>
    );
  }
}

AnnotationForm.propTypes = {
  annotation: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default AnnotationForm;
