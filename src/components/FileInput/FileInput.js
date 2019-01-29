import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button, { DEFAULT_TYPE, DEFAULT_STYLE } from "../Button/Button";
import { B1 } from "../Fonts/Fonts";

const Label = styled(B1)`
  margin-bottom: 0.25rem;
`;

const StyledFileInput = styled.input`
  display: none;
`;

class FileInput extends Component {
  constructor(props) {
    super(props);

    this.fileInputRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    console.log("file upload", e, e.target.files[0]);
    const { input } = this.props;
    input.onChange(e.target.files[0]);
  }

  onClick() {
    this.fileInputRef.current.click();
  }

  render() {
    return (
      <Fragment>
        <StyledFileInput
          type="file"
          accept={this.props.accept}
          ref={this.fileInputRef}
          onChange={this.onChange}
        />
        <Label>{this.props.label}</Label>
        <Button
          type={this.props.buttonType}
          buttonStyle={this.props.buttonStyle}
          onClick={this.onClick}
        >
          {this.props.renderButtonLabel()}
        </Button>

        {this.props.input.value && <span>{this.props.input.value.name}</span>}
      </Fragment>
    );
  }
}

FileInput.propTypes = {
  label: PropTypes.string,
  renderButtonLabel: PropTypes.func,
  input: PropTypes.object.isRequired,
  accept: PropTypes.string
};

FileInput.defaultProps = {
  renderButtonLabel: () => "Choose File",
  buttonType: DEFAULT_TYPE,
  buttonStyle: DEFAULT_STYLE
};

export default FileInput;
