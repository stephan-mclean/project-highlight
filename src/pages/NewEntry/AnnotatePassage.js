import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Jimp from "jimp/es";
import PropTypes from "prop-types";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import Button, {
  OUTLINE_TYPE,
  ACCENT_STYLE
} from "../../components/Button/Button";
import ImgCropper from "../../components/ImageCropper/ImgCropper";
import CanvasDraw from "react-canvas-draw";

class AnnotatePassage extends Component {
  constructor(props) {
    super(props);

    this.onUpdateAnnotations = this.onUpdateAnnotations.bind(this);
    this.getImageReadyForCrop = this.getImageReadyForCrop.bind(this);
    this.renderMain = this.renderMain.bind(this);

    this.canvasRef = React.createRef();
    this.mainContainerRef = React.createRef();

    this.state = {
      imageLoading: true,
      imageReadinessFailed: false
    };
  }

  componentDidMount() {
    this.getImageReadyForCrop();
  }

  getImageReadyForCrop() {
    const toRead = URL.createObjectURL(this.props.passageFile);

    Jimp.read(toRead, (error, image) => {
      if (error) {
        console.error(error);
      }

      image.greyscale().getBuffer(this.props.passageFile.type, (err, buff) => {
        if (err) {
          console.error(err);
          this.setState({ imageReadinessFailed: true, imageLoading: false });
        }

        console.log("got buff", buff);

        const base64Image = buff.toString("base64");
        const imgSrcString =
          "data:" + this.props.passageFile.type + ";base64, " + base64Image;

        this.setState({ passageImgSrc: imgSrcString, imageLoading: false });
      });
    });
  }

  onUpdateAnnotations(annotations) {
    const { passage } = this.state;
    this.setState({
      passage: {
        ...passage,
        annotations
      }
    });
  }

  renderImageHighlighter = () => {
    const { croppedImg, croppedImgDimensions, canvasRef } = this.state;

    console.log(canvasRef);

    const canvas = canvasRef;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = croppedImg;

      img.onload = () => {
        ctx.drawImage(
          img,
          0,
          0,
          croppedImgDimensions.width,
          croppedImgDimensions.height,
          0,
          0,
          this.mainContainerRef.current.clientWidth,
          window.innerHeight
        );
      };
    }
  };

  renderCanvas = () => {
    return (
      <canvas
        width={this.mainContainerRef.current.clientWidth}
        height={window.innerHeight}
        ref={canvas => {
          if (canvas && !this.state.canvasRef) {
            this.setState({ canvasRef: canvas });
          }
        }}
      />
    );
  };

  onCrop = (croppedImage, dimensions) => {
    console.log("on crop", croppedImage);
    this.setState({
      cropComplete: true,
      croppedImg: croppedImage,
      croppedImgDimensions: dimensions
    });
  };

  renderImageCropper = () => {
    const { passageImgSrc } = this.state;
    const { passageFile } = this.props;
    return (
      <ImgCropper
        imgSrc={passageImgSrc}
        imgType={passageFile.type}
        onCropFinish={this.onCrop}
      />
    );
  };

  renderMain() {
    const { cropComplete, canvasRef } = this.state;
    return (
      <div ref={this.mainContainerRef}>
        {cropComplete && this.renderCanvas()}
        {!cropComplete && this.renderImageCropper()}
        {canvasRef && this.renderImageHighlighter()}
      </div>
    );
  }

  render() {
    return (
      <ContentLoader
        loading={this.state.imageLoading}
        error={this.state.imageReadinessFailed}
        onLoad={this.renderMain}
      />
    );
  }
}

AnnotatePassage.propTypes = {
  passageFile: PropTypes.object,
  onAddPassage: PropTypes.func
};

export default AnnotatePassage;
