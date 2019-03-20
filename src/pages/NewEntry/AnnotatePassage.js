import React, { Component } from "react";
import Jimp from "jimp/es";
import PropTypes from "prop-types";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import ImgCropper from "../../components/ImageCropper/ImgCropper";
import ImgHighlighter from "../../components/ImageHighlighter/ImageHighlighter";

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

        this.setState({
          passageImgSrc: imgSrcString,
          imageLoading: false
        });
      });
    });
  };

  onImageHighlighted = highlights => {
    const { updatedPassageFile, croppedImgDimensions } = this.state;
    const passageToAdd = {
      file: updatedPassageFile,
      fileDimensions: croppedImgDimensions,
      highlights
    };

    this.props.onAddPassage(passageToAdd);
  };

  renderImageHighlighter = () => {
    const { croppedImg, croppedImgDimensions } = this.state;
    const { onCancel } = this.props;
    return (
      <ImgHighlighter
        imgSrc={croppedImg}
        imgDimensions={croppedImgDimensions}
        onFinishHighlight={this.onImageHighlighted}
        onCancel={onCancel}
      />
    );
  };

  onCrop = (croppedImage, dimensions) => {
    const urltoFile = (url, filename, mimeType) => {
      return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buf => new File([buf], filename, { type: mimeType }));
    };

    const { passageFile } = this.props;

    this.setState({ imageLoading: true });

    urltoFile(croppedImage, passageFile.name, passageFile.type).then(file => {
      console.log("got updated passage file", file);
      this.setState({
        cropComplete: true,
        croppedImg: croppedImage,
        croppedImgDimensions: dimensions,
        updatedPassageFile: file,
        imageLoading: false
      });
    });
  };

  renderImageCropper = () => {
    const { passageImgSrc } = this.state;
    const { passageFile, onCancel } = this.props;
    return (
      <ImgCropper
        imgSrc={passageImgSrc}
        imgType={passageFile.type}
        onCropFinish={this.onCrop}
        onCancel={onCancel}
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
  onAddPassage: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default AnnotatePassage;
