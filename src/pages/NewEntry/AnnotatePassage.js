import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import Button, {
  OUTLINE_TYPE,
  ACCENT_STYLE
} from "../../components/Button/Button";
import Annotater from "../../components/Annotater/Annotater";

const Tesseract = window.Tesseract;

class AnnotatePassage extends Component {
  constructor(props) {
    super(props);

    this.parsePassageText = this.parsePassageText.bind(this);
    this.renderPassage = this.renderPassage.bind(this);
    this.onUpdateAnnotations = this.onUpdateAnnotations.bind(this);

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
          text: result.text,
          annotations: []
        }
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

  renderPassage() {
    const { passage } = this.state;
    return (
      <Fragment>
        <Annotater
          text={passage.text}
          currentAnnotations={passage.annotations}
          updateAnnotations={this.onUpdateAnnotations}
        />
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
