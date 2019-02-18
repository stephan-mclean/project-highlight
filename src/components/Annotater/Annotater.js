import React, { Component } from "react";
import styled from "styled-components";

const Popover = styled.div`
  height: 2rem;
  width: 5rem;
  background: black;
  position: absolute;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
  display: ${props => props.display};
`;

class Annotater extends Component {
  constructor(props) {
    super(props);

    this.handleTextSelection = this.handleTextSelection.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);

    this.state = { displayPopOver: "none" };

    this.contentRef = React.createRef();
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

  handleTextSelection(e) {
    console.log("handle text selection");

    const selection = window.getSelection();
    console.log(selection);
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0).cloneRange();
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
            popoverLeft: rect.left
          });
        } else {
          this.setState({
            displayPopOver: "block",
            popoverTop: rect.top,
            popoverLeft: rect.left
          });
        }
      }
    }
  }

  handleOnBlur() {
    this.setState({ displayPopOver: "none" });
    console.log("blur");
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
        />
      </div>
    );
  }
}

export default Annotater;
