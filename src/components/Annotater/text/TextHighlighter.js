import React, { Component } from "react";
import PropTypes from "prop-types";
import Mark from "../../Mark/Mark";

class TextHighlighter extends Component {
  onAnnotationClick(annotation, e) {
    this.props.onAnnotationClick(annotation, e);
  }

  render() {
    const { text, annotations } = this.props;
    let result = [text];

    let start = 0;
    annotations
      .sort((a, b) => a.startOffset - b.startOffset)
      .forEach((annotation, index) => {
        const { startOffset, endOffset } = annotation;
        const markedText = text.substring(startOffset, endOffset);
        const mark = (
          <Mark
            key={annotation.id}
            onClick={this.onAnnotationClick.bind(this, annotation)}
          >
            {markedText}
          </Mark>
        );

        if (result.length > 1) {
          result = [
            ...result.slice(0, index * 2),
            text.substring(start, startOffset),
            mark,
            text.substring(endOffset, text.length)
          ];
        } else {
          result = [
            text.substring(0, startOffset),
            mark,
            text.substring(endOffset, text.length)
          ];
        }

        start = endOffset;
      });

    return this.props.renderTextBy(this.props.textRef, result);
  }
}

TextHighlighter.propTypes = {
  text: PropTypes.string,
  renderTextBy: PropTypes.func,
  annotations: PropTypes.array.isRequired,
  textRef: PropTypes.func,
  onAnnotationClick: PropTypes.func
};

TextHighlighter.defaultProps = {
  onAnnotationClick: () => {},
  renderTextBy: (ref, text) => <span ref={ref}>{text}</span>
};

export default TextHighlighter;
