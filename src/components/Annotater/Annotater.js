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

const CurrentAnnotation = styled.div`
  position: absolute;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
  background-color: #ffffff;
  border: ${props => `1px solid ${props.theme.colors.background.default}`};
  border-radius: 0.25rem;
  padding: 0.25rem;
`;

const Mark = styled.mark`
  background-color: ${props => props.theme.colors.primary.light};
  color: ${props => props.theme.colors.primary.dark};
`;

class Annotater extends Component {
  constructor(props) {
    super(props);

    this.handleTextSelection = this.handleTextSelection.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.onAddAnnotation = this.onAddAnnotation.bind(this);
    this.renderCurrentAnnotations = this.renderCurrentAnnotations.bind(this);
    this.renderAnnotatedText = this.renderAnnotatedText.bind(this);

    this.state = { displayPopOver: "none" };

    this.contentRef = React.createRef();
    this.popoverBtnRef = React.createRef();
  }

  handleTextSelection() {
    console.log("handle text selection");

    const selection = window.getSelection();
    console.log(selection);
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0).cloneRange();
      const { startOffset, endOffset } = range;
      console.log(range);

      const rects = range.getClientRects();
      if (rects.length) {
        const rect = rects[0];

        console.log(rect);
        console.log("x: ", rect.left);
        console.log("y: ", rect.top);

        if (rect.top - 32 < 0) {
          this.setState({
            displayPopOver: "block",
            popoverTop: rect.top + rect.height,
            popoverLeft: rect.left,
            startOffset,
            endOffset
          });
        } else {
          this.setState({
            displayPopOver: "block",
            popoverTop: rect.top - 32,
            popoverLeft: rect.left,
            startOffset,
            endOffset
          });
        }
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

  renderCurrentAnnotations() {
    console.log("rendering", this.props.currentAnnotations);
    return this.props.currentAnnotations.map(annotation => {
      const position = this.getAnnotationPosition(annotation);
      console.log("position of annotation", position);
      return (
        <CurrentAnnotation {...position}>
          <FontAwesomeIcon icon="comment" />
        </CurrentAnnotation>
      );
    });
  }

  renderAnnotatedText() {
    const { text, currentAnnotations } = this.props;
    let result = text;

    currentAnnotations.forEach(annotation => {
      const { startOffset, endOffset } = annotation;
      const markedText = result.substring(startOffset, endOffset);
      result =
        result.substring(0, startOffset) +
        `<Mark>${markedText}</Mark>` +
        result.substring(endOffset, result.length);
    });

    console.log("result", result);

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
        <span
          ref={this.contentRef}
          dangerouslySetInnerHTML={{ __html: this.renderAnnotatedText() }}
        />
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
