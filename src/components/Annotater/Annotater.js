import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { LINK_TYPE } from "../Button/Button";

const Popover = styled.div`
  height: 2rem;
  background-color: #ffffff;
  border: ${props => `1px solid ${props.theme.colors.background.default}`};
  border-radius: 0.25rem;
  position: absolute;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
  display: ${props => props.display};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const Mark = styled.mark`
  background-color: ${props => props.theme.colors.primary.verylight};
  color: ${props => props.theme.colors.primary.dark};
`;

class Annotater extends Component {
  constructor(props) {
    super(props);

    this.handleTextSelection = this.handleTextSelection.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.onAddAnnotation = this.onAddAnnotation.bind(this);
    this.renderAnnotatedText = this.renderAnnotatedText.bind(this);

    this.state = { displayPopOver: "none" };

    this.contentRef = React.createRef();
    this.popoverBtnRef = React.createRef();
  }

  handleTextSelection() {
    console.log("handle text selection");

    const selection = window.getSelection();

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

        const newState = {
          displayPopOver: "block",
          popoverLeft: rect.left,
          startOffset: startOffset + offsetToAdd,
          endOffset: endOffset + offsetToAdd
        };

        if (rect.top - 32 < 0) {
          newState.popoverTop = rect.top + rect.height;
        } else {
          newState.popoverTop = rect.top - 32;
        }

        this.setState(newState);
      }
    }
  }

  handleOnBlur(e) {
    if (e && e.relatedTarget !== this.popoverBtnRef.current) {
      this.setState({ displayPopOver: "none" });
    }
  }

  onAddAnnotation() {
    const { startOffset, endOffset } = this.state;
    this.props.onAddAnnotation({ startOffset, endOffset });
    this.handleOnBlur();
  }

  getAnnotationPosition(annotation) {
    const range = document.createRange();
    range.setStart(this.contentRef.current.firstChild, annotation.startOffset);
    range.setEnd(this.contentRef.current.firstChild, annotation.endOffset);
    const rects = range.getClientRects();

    if (rects.length) {
      const rect = rects[0];
      const { left, top } = rect;
      return { left, top };
    }
  }

  renderAnnotatedText() {
    const { text, currentAnnotations } = this.props;
    let result = [text];

    let start = 0;
    currentAnnotations
      .sort((a, b) => a.startOffset - b.startOffset)
      .forEach(({ startOffset, endOffset }, index) => {
        const markedText = text.substring(startOffset, endOffset);

        if (result.length > 1) {
          result = [
            ...result.slice(0, index * 2),
            text.substring(start, startOffset),
            <Mark>{markedText}</Mark>,
            text.substring(endOffset, text.length)
          ];
        } else {
          result = [
            text.substring(0, startOffset),
            <Mark>{markedText}</Mark>,
            text.substring(endOffset, text.length)
          ];
        }

        start = endOffset;
      });

    return result;
  }

  render() {
    return (
      <div
        onMouseUp={this.handleTextSelection}
        onTouchEnd={this.handleTextSelection}
        tabIndex={0}
        onBlur={this.handleOnBlur}
      >
        <span ref={this.contentRef}>{this.renderAnnotatedText()}</span>
        <Popover
          display={this.state.displayPopOver}
          top={this.state.popoverTop}
          left={this.state.popoverLeft}
        >
          <Button
            buttonType={LINK_TYPE}
            type="button"
            onClick={this.onAddAnnotation}
            ref={this.popoverBtnRef}
          >
            Annotate
          </Button>
        </Popover>
      </div>
    );
  }
}

Annotater.propTypes = {
  onAddAnnotation: PropTypes.func.isRequired,
  currentAnnotations: PropTypes.array
};

export default Annotater;
