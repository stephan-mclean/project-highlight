import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CanvasDraw from "react-canvas-draw";
import Button, { OUTLINE_TYPE, ACCENT_STYLE } from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";

const HighlighterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

class ImageHighlighter extends Component {
  static propTypes = {
    imgSrc: PropTypes.string.isRequired,
    imgDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }).isRequired,
    onFinishHighlight: PropTypes.func,
    highlights: PropTypes.string,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    highlights: "",
    disabled: false
  };

  state = { clientWidth: null };

  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const container = this.containerRef.current;
    if (container && !this.state.clientWidth) {
      this.setState({
        clientWidth: container.clientWidth
      });
    }

    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize = () => {
    const updatedContainer = this.containerRef.current;
    if (updatedContainer) {
      this.setState({ clientWidth: updatedContainer.clientWidth });
    }
  };

  renderHighlighter = () => {
    const { clientWidth } = this.state;
    const { imgSrc, imgDimensions, highlights, disabled } = this.props;
    if (clientWidth) {
      let canvasWidth = imgDimensions.width;
      let canvasHeight = imgDimensions.height;

      if (clientWidth < canvasWidth) {
        const scale = canvasWidth / clientWidth;

        canvasWidth = clientWidth;
        canvasHeight = canvasHeight / scale;
      }

      return (
        <CanvasDraw
          ref={canvasDraw => (this.canvasRef = canvasDraw)}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          imgSrc={imgSrc}
          brushColor="rgba(167, 68, 130, 0.5)"
          brushRadius={4}
          saveData={highlights}
          disabled={disabled}
          immediateLoading={true}
        />
      );
    }

    return null;
  };

  finishHighlighting = () => {
    const highlights = this.canvasRef.getSaveData();
    this.props.onFinishHighlight(highlights);
  };

  render() {
    const { disabled } = this.props;
    return (
      <div ref={this.containerRef}>
        <HighlighterContainer>{this.renderHighlighter()}</HighlighterContainer>

        {!disabled && (
          <ButtonGroup right>
            <ButtonGroup.Item>
              <Button buttonType={OUTLINE_TYPE}>Cancel</Button>
            </ButtonGroup.Item>

            <ButtonGroup.Item>
              <Button
                buttonType={OUTLINE_TYPE}
                buttonStyle={ACCENT_STYLE}
                onClick={this.finishHighlighting}
              >
                Finish Annotating
              </Button>
            </ButtonGroup.Item>
          </ButtonGroup>
        )}
      </div>
    );
  }
}

export default ImageHighlighter;
