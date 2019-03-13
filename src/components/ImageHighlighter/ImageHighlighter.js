import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CanvasDraw from "react-canvas-draw";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

class ImageHighlighter extends Component {
  static propTypes = {
    imgSrc: PropTypes.string.isRequired,
    imgDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }).isRequired
  };

  state = { clientWidth: null };

  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
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
    const { imgSrc, imgDimensions } = this.props;
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
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          imgSrc={imgSrc}
          brushColor="rgba(167, 68, 130, 0.5)"
          brushRadius={4}
        />
      );
    }

    return null;
  };

  render() {
    return (
      <Container ref={this.containerRef}>{this.renderHighlighter()}</Container>
    );
  }
}

export default ImageHighlighter;
