import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button, { LINK_TYPE, DANGER_STYLE } from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import AnnotationForm from "./form/AnnotationForm";
import TextHighlighter from "./text/TextHighlighter";

const Popover = styled.div`
  height: 2rem;
  background-color: #ffffff;
  border: ${props => `1px solid ${props.theme.colors.background.default}`};
  border-radius: 0.25rem;
  position: absolute;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

class Annotater extends Component {
  constructor(props) {
    super(props);

    this.handleTextSelection = this.handleTextSelection.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.onAddAnnotation = this.onAddAnnotation.bind(this);
    this.renderPopOver = this.renderPopOver.bind(this);
    this.renderPopOverButtons = this.renderPopOverButtons.bind(this);
    this.editCurrentlySelectedAnnotation = this.editCurrentlySelectedAnnotation.bind(
      this
    );
    this.deleteCurrentlySelectedAnnotation = this.deleteCurrentlySelectedAnnotation.bind(
      this
    );
    this.renderAnnotationForm = this.renderAnnotationForm.bind(this);
    this.onCompleteAnnotationForm = this.onCompleteAnnotationForm.bind(this);
    this.onCancelAnnotationForm = this.onCancelAnnotationForm.bind(this);
    this.onAnnotationClick = this.onAnnotationClick.bind(this);

    this.state = {
      shouldDisplayPopover: false,
      renderPopoverForExistingAnnotation: false,
      currentlySelectedAnnotation: null,
      showAnnotationForm: false
    };

    this.contentRef = React.createRef();
    this.popoverBtnRef = React.createRef();
    this.popoverEditBtnRef = React.createRef();
    this.popoverDeleteBtnRef = React.createRef();
  }

  getPopoverPosition(rect) {
    const result = {
      popoverLeft: rect.left
    };

    if (rect.top - 32 < 0) {
      result.popoverTop = rect.top + rect.height;
    } else {
      result.popoverTop = rect.top - 32;
    }

    return result;
  }

  handleTextSelection(e) {
    if (e.target !== this.contentRef.current || this.props.isReadOnly) {
      return;
    }

    const selection = window.getSelection();

    /**
     * The offset from the range will be incorrect,
     * as it will not count text in the elements added
     * to the text for highlighting.
     *
     * The code below will add to the offset from the range, accounting
     * for the entire text, including the nested elements.
     */
    let offsetToAdd = 0;
    if (selection.anchorNode.previousSibling) {
      let previousSibling = selection.anchorNode.previousSibling;

      while (previousSibling) {
        if (previousSibling.length) {
          offsetToAdd += previousSibling.length;
        } else if (previousSibling.innerText) {
          offsetToAdd += previousSibling.innerText.length;
        }

        previousSibling = previousSibling.previousSibling;
      }
    }

    if (selection.rangeCount) {
      const range = selection.getRangeAt(0).cloneRange();
      const { startOffset, endOffset } = range;

      const rects = range.getClientRects();
      if (rects.length) {
        const rect = rects[0];
        const popoverPosition = this.getPopoverPosition(rect);

        this.setState({
          shouldDisplayPopover: true,
          startOffset: startOffset + offsetToAdd,
          endOffset: endOffset + offsetToAdd,
          ...popoverPosition,
          renderPopoverForExistingAnnotation: false
        });
      }
    }
  }

  handleOnBlur(e) {
    const targetIsNotAnnotateBtnRef =
      !this.popoverBtnRef.current ||
      (e && e.relatedTarget !== this.popoverBtnRef.current);
    const targetIsNotEditBtnRef =
      !this.popoverEditBtnRef.current ||
      (e && e.relatedTarget !== this.popoverEditBtnRef.current);
    const targetIsNotDeleteBtnRef =
      !this.popoverDeleteBtnRef.current ||
      (e && e.relatedTarget !== this.popoverDeleteBtnRef.current);

    if (
      (targetIsNotAnnotateBtnRef &&
        targetIsNotDeleteBtnRef &&
        targetIsNotEditBtnRef) ||
      !e
    ) {
      this.setState({ shouldDisplayPopover: false });
    }
  }

  onAnnotationClick(annotation, e) {
    if (this.props.isReadOnly) {
      return;
    }

    const rect = e.target.getBoundingClientRect();
    const popoverPosition = this.getPopoverPosition(rect);

    this.setState({
      shouldDisplayPopover: true,
      ...popoverPosition,
      renderPopoverForExistingAnnotation: true,
      currentlySelectedAnnotation: annotation
    });
  }

  onAddAnnotation() {
    const { startOffset, endOffset } = this.state;
    this.setState({
      currentlySelectedAnnotation: { startOffset, endOffset },
      showAnnotationForm: true
    });

    this.handleOnBlur();
  }

  editCurrentlySelectedAnnotation() {
    this.setState({
      showAnnotationForm: true
    });
    this.handleOnBlur();
  }

  deleteCurrentlySelectedAnnotation() {
    const { currentlySelectedAnnotation } = this.state;

    const { currentAnnotations } = this.props;
    const currentAnnotationIndex = currentAnnotations.indexOf(
      currentlySelectedAnnotation
    );

    if (currentAnnotationIndex > -1) {
      const newAnnotations = [...currentAnnotations];
      newAnnotations.splice(currentAnnotationIndex, 1);

      this.props.updateAnnotations(newAnnotations);
    }

    this.handleOnBlur();
  }

  renderPopOverButtons() {
    let buttons;
    if (this.state.renderPopoverForExistingAnnotation) {
      buttons = (
        <ButtonGroup left>
          <ButtonGroup.Item>
            <Button
              type="button"
              buttonType={LINK_TYPE}
              ref={this.popoverEditBtnRef}
              onClick={this.editCurrentlySelectedAnnotation}
            >
              Edit
            </Button>
          </ButtonGroup.Item>
          <ButtonGroup.Item>
            <Button
              type="button"
              buttonType={LINK_TYPE}
              buttonStyle={DANGER_STYLE}
              ref={this.popoverDeleteBtnRef}
              onClick={this.deleteCurrentlySelectedAnnotation}
            >
              Delete
            </Button>
          </ButtonGroup.Item>
        </ButtonGroup>
      );
    } else {
      buttons = (
        <ButtonGroup left>
          <ButtonGroup.Item>
            <Button
              buttonType={LINK_TYPE}
              type="button"
              onClick={this.onAddAnnotation}
              ref={this.popoverBtnRef}
            >
              Annotate
            </Button>
          </ButtonGroup.Item>
        </ButtonGroup>
      );
    }

    return buttons;
  }

  renderPopOver() {
    if (this.props.isReadOnly || !this.state.shouldDisplayPopover) {
      return null;
    }

    return (
      <Popover
        display={this.state.displayPopOver}
        top={this.state.popoverTop}
        left={this.state.popoverLeft}
      >
        {this.renderPopOverButtons()}
      </Popover>
    );
  }

  onCompleteAnnotationForm(annotation) {
    console.log("finished annotating", annotation);

    const { currentAnnotations } = this.props;
    if (currentAnnotations.includes(annotation)) {
      console.log("edited annotation");
    } else {
      console.log("newly added annotation");

      this.props.updateAnnotations([...currentAnnotations, annotation]);
    }

    this.setState({
      currentlySelectedAnnotation: null,
      showAnnotationForm: false
    });
  }

  onCancelAnnotationForm() {
    console.log("cancelled annotating");
    this.setState({
      currentlySelectedAnnotation: null,
      showAnnotationForm: false
    });
  }

  renderAnnotationForm() {
    const { currentlySelectedAnnotation } = this.state;
    return (
      <AnnotationForm
        annotation={currentlySelectedAnnotation}
        onComplete={this.onCompleteAnnotationForm}
        onCancel={this.onCancelAnnotationForm}
      />
    );
  }

  render() {
    if (this.state.showAnnotationForm) {
      return this.renderAnnotationForm();
    }

    return (
      <div
        onMouseUp={this.handleTextSelection}
        onTouchEnd={this.handleTextSelection}
        tabIndex={0}
        onBlur={this.handleOnBlur}
      >
        <TextHighlighter
          text={this.props.text}
          annotations={this.props.currentAnnotations}
          textRef={this.contentRef}
          onAnnotationClick={this.onAnnotationClick}
        />
        {this.renderPopOver()}
      </div>
    );
  }
}

Annotater.propTypes = {
  updateAnnotations: PropTypes.func.isRequired,
  currentAnnotations: PropTypes.array,
  text: PropTypes.string,
  isReadOnly: PropTypes.bool
};

Annotater.defaultProps = {
  isReadOnly: false
};

export default Annotater;
