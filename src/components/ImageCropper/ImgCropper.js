import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button, { OUTLINE_TYPE, ACCENT_STYLE } from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";

const Canvas = styled.canvas`
  display: none;
`;

const CropContainer = styled.div`
  max-width: 70%;
  margin: auto;
`;

class ImgCropper extends Component {
  static propTypes = {
    imgSrc: PropTypes.string,
    imgType: PropTypes.string,
    onCropFinish: PropTypes.func
  };

  canvasRef = React.createRef();

  state = {
    crop: {
      width: 50,
      height: 50,
      x: 0,
      y: 0
    }
  };

  onCrop = crop => {
    this.setState({ crop });
  };

  onCropComplete = (crop, pixelCrop) => {
    this.setState({ crop, pixelCrop });
  };

  doCrop = () => {
    const { imgSrc, imgType, onCropFinish } = this.props;
    const { pixelCrop } = this.state;
    const canvas = this.canvasRef.current;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      ctx.drawImage(
        img,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
      const croppedImg = canvas.toDataURL(imgType);

      onCropFinish(croppedImg, {
        width: pixelCrop.width,
        height: pixelCrop.height
      });
    };
  };

  render() {
    const { imgSrc } = this.props;
    const { crop } = this.state;

    return (
      <Fragment>
        <CropContainer>
          <ReactCrop
            src={imgSrc}
            crop={crop}
            onChange={this.onCrop}
            onComplete={this.onCropComplete}
          />
        </CropContainer>

        <Canvas ref={this.canvasRef} />

        <ButtonGroup right>
          <ButtonGroup.Item>
            <Button buttonType={OUTLINE_TYPE}>Cancel</Button>
          </ButtonGroup.Item>

          <ButtonGroup.Item>
            <Button
              buttonType={OUTLINE_TYPE}
              buttonStyle={ACCENT_STYLE}
              onClick={this.doCrop}
            >
              Crop Image
            </Button>
          </ButtonGroup.Item>
        </ButtonGroup>
      </Fragment>
    );
  }
}

export default ImgCropper;
