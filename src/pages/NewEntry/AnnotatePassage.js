import React, { Component } from "react";
import Jimp from "jimp/es";
import PropTypes from "prop-types";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import ImgCropper from "../../components/ImageCropper/ImgCropper";
import CanvasDraw from "react-canvas-draw";

class AnnotatePassage extends Component {
  constructor(props) {
    super(props);

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

  getImageReadyForCrop = () => {
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

        const base64Image = buff.toString("base64");
        const imgSrcString =
          "data:" + this.props.passageFile.type + ";base64, " + base64Image;

        this.setState({ passageImgSrc: imgSrcString, imageLoading: false });
      });
    });
  };

  renderImageHighlighter = () => {
    const { croppedImg, croppedImgDimensions } = this.state;
    const clientWidth = this.mainContainerRef.current.clientWidth;

    let canvasWidth = croppedImgDimensions.width;
    let canvasHeight = croppedImgDimensions.height;

    if (clientWidth < croppedImgDimensions.width) {
      const scale = croppedImgDimensions.width / clientWidth;

      canvasWidth = clientWidth;
      canvasHeight = croppedImgDimensions.height / scale;
    }

    return (
      <CanvasDraw
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        imgSrc={croppedImg}
        brushColor="rgba(167, 68, 130, 0.5)"
        brushRadius={4}
      />
    );
  };

  onCrop = (croppedImage, dimensions) => {
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

  renderMain = () => {
    const { cropComplete } = this.state;
    return (
      <div ref={this.mainContainerRef}>
        {!cropComplete && this.renderImageCropper()}
        {cropComplete && this.renderImageHighlighter()}
      </div>
    );
  };

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
