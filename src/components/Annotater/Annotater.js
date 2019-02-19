import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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

class Annotater extends Component {
  constructor(props) {
    super(props);

    this.handleTextSelection = this.handleTextSelection.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.onAddAnnotation = this.onAddAnnotation.bind(this);

    this.state = { displayPopOver: "none" };

    this.contentRef = React.createRef();
    this.popoverBtnRef = React.createRef();
  }

  componentDidMount() {
    // TODO: Populate current annotations here
    console.log(this.contentRef);

    const range = document.createRange();
    range.setStart(this.contentRef.current.firstChild, 435);
    range.setEnd(this.contentRef.current.firstChild, 449);

    const rects = range.getClientRects();

    console.log(rects);

    console.log(range);
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

  render() {
    const { children } = this.props;

    return (
      <div
        onMouseUp={this.handleTextSelection}
        onTouchEnd={this.handleTextSelection}
        tabIndex={0}
        onBlur={this.handleOnBlur}
      >
        <span ref={this.contentRef}>{children}</span>
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
  onAddAnnotation: PropTypes.func.isRequired
};

export default Annotater;
