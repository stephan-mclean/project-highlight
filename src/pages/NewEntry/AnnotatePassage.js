import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import { B1 } from "../../components/Fonts/Fonts";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import Button, {
  OUTLINE_TYPE,
  ACCENT_STYLE
} from "../../components/Button/Button";

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
        passage: {
          text: result.text
        }
      });
    });
  }

  renderPassage() {
    return (
      <Fragment>
        <B1>{this.state.passage.text}</B1>
        <ButtonGroup right>
          <ButtonGroup.Item>
            <Button buttonType={OUTLINE_TYPE}>Cancel</Button>
          </ButtonGroup.Item>

          <ButtonGroup.Item>
            <Button
              buttonType={OUTLINE_TYPE}
              buttonStyle={ACCENT_STYLE}
              onClick={() => this.props.onAddPassage(this.state.passage)}
            >
              Done
            </Button>
          </ButtonGroup.Item>
        </ButtonGroup>
      </Fragment>
    );
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
  passageFile: PropTypes.object,
  onAddPassage: PropTypes.func
};

export default AnnotatePassage;
