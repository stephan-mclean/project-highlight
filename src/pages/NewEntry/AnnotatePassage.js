import React, { Component } from "react";
import PropTypes from "prop-types";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import { B1 } from "../../components/Fonts/Fonts";
const Tesseract = window.Tesseract;

class AnnotatePassage extends Component {
  constructor(props) {
    super(props);

    this.parsePassageText = this.parsePassageText.bind(this);
    this.renderPassage = this.renderPassage.bind(this);

    // Parse image here
    this.state = { loadingPassageText: true, loadingPassageError: false };
    console.log("annotate passage", this.props);
    this.parsePassageText();
  }

  parsePassageText() {
    console.log("parse passage text");
    Tesseract.recognize(this.props.passageFile).then(result => {
      console.log("tess result", result);
      this.setState({
        loadingPassageText: false,
        passageText: result.text
      });
    });
  }

  renderPassage() {
    return <B1>{this.state.passageText}</B1>;
  }

  render() {
    return (
      <ContentLoader
        loading={this.state.loadingPassageText}
        error={this.state.loadingPassageError}
        onLoad={this.renderPassage}
      />
    );
  }
}

AnnotatePassage.propTypes = {
  passageFile: PropTypes.object
};

export default AnnotatePassage;
