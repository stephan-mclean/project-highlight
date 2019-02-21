import React, { Component } from "react";
import PropTypes from "prop-types";
import AnnotationForm from "./form/AnnotationForm";
import TextHighlighter from "./text/TextHighlighter";
import Popover from "./popover/Popover";
import * as uuid from "uuid";

const getPopoverPosition = rect => {
  const result = {
    popoverLeft: rect.left
  };

  if (rect.top - 32 < 0) {
    result.popoverTop = rect.top + rect.height;
  } else {
    result.popoverTop = rect.top - 32;
  }

  return result;
};

class Annotater extends Component {
  constructor(props) {
    super(props);

    this.handleTextSelection = this.handleTextSelection.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.renderPopOver = this.renderPopOver.bind(this);

    this.onAddAnnotation = this.onAddAnnotation.bind(this);

    this.onAnnotationClick = this.onAnnotationClick.bind(this);
    this.editCurrentlySelectedAnnotation = this.editCurrentlySelectedAnnotation.bind(
      this
    );
    this.deleteCurrentlySelectedAnnotation = this.deleteCurrentlySelectedAnnotation.bind(
      this
    );

    this.renderAnnotationForm = this.renderAnnotationForm.bind(this);
    this.onCompleteAnnotationForm = this.onCompleteAnnotationForm.bind(this);
    this.onCancelAnnotationForm = this.onCancelAnnotationForm.bind(this);

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

  handleTextSelection(e) {
    if (e.target !== this.contentRef.current) {
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
        const popoverPosition = getPopoverPosition(rect);

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
    const rect = e.target.getBoundingClientRect();
    const popoverPosition = getPopoverPosition(rect);

    this.setState({
      shouldDisplayPopover: true,
      ...popoverPosition,
      renderPopoverForExistingAnnotation: true,
      currentlySelectedAnnotation: annotation
    });
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

  renderPopOver() {
    if (!this.state.shouldDisplayPopover) {
      return null;
    }

    const {
      renderPopoverForExistingAnnotation,
      popoverLeft,
      popoverTop
    } = this.state;

    return (
      <Popover
        shouldRenderEditButtons={renderPopoverForExistingAnnotation}
        onEdit={this.editCurrentlySelectedAnnotation}
        onDelete={this.deleteCurrentlySelectedAnnotation}
        onAnnotate={this.onAddAnnotation}
        editBtnRef={this.popoverEditBtnRef}
        deleteBtnRef={this.popoverDeleteBtnRef}
        annotateBtnRef={this.popoverBtnRef}
        top={popoverTop}
        left={popoverLeft}
      />
    );
  }

  onAddAnnotation() {
    const { startOffset, endOffset } = this.state;
    this.setState({
      currentlySelectedAnnotation: { startOffset, endOffset },
      showAnnotationForm: true
    });

    this.handleOnBlur();
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

  onCompleteAnnotationForm(annotation) {
    const { currentAnnotations } = this.props;
    const updatedAnnotations = [...currentAnnotations];
    if (annotation.id) {
      const indexOfExistingAnnotation = updatedAnnotations.findIndex(
        current => current.id === annotation.id
      );
      if (indexOfExistingAnnotation > -1) {
        updatedAnnotations.splice(indexOfExistingAnnotation, 1);
        updatedAnnotations.push(annotation);
      }
    } else {
      const newlyAddedAnnotation = {
        ...annotation,
        id: uuid()
      };
      updatedAnnotations.push(newlyAddedAnnotation);
    }

    this.props.updateAnnotations(updatedAnnotations);

    this.setState({
      currentlySelectedAnnotation: null,
      showAnnotationForm: false
    });
  }

  onCancelAnnotationForm() {
    this.setState({
      currentlySelectedAnnotation: null,
      showAnnotationForm: false
    });
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
  text: PropTypes.string
};

export default Annotater;
