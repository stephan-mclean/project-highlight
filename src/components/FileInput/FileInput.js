import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { DEFAULT_TYPE, DEFAULT_STYLE } from "../Button/Button";
import { B1, Overline } from "../Fonts/Fonts";

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled(B1)`
  margin-bottom: 0.25rem;
`;

const FileNameLabel = styled(Overline)`
  color: ${props => props.theme.colors.foreground.secondary};
`;

const StyledFileInput = styled.input`
  display: none;
`;

const FileInputButton = styled(Button)`
  display: block;
  margin-bottom: 0.25rem;
`;

const FileCheckIcon = styled(FontAwesomeIcon)`
  margin-right: 0.25rem;
`;

class FileInput extends Component {
  constructor(props) {
    super(props);

    this.fileInputRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    const { input } = this.props;
    input.onChange(e.target.files[0]);
  }

  onClick() {
    this.fileInputRef.current.click();
  }

  render() {
    return (
      <Container>
        <StyledFileInput
          type="file"
          accept={this.props.accept}
          ref={this.fileInputRef}
          onChange={this.onChange}
        />
        <Label>{this.props.label}</Label>
        <FileInputButton
          buttonType={this.props.buttonType}
          buttonStyle={this.props.buttonStyle}
          onClick={this.onClick}
        >
          {this.props.renderButtonLabel()}
        </FileInputButton>

        {this.props.input.value && (
          <FileNameLabel>
            <FileCheckIcon icon="check-circle" />
            {this.props.input.value.name}
          </FileNameLabel>
        )}
      </Container>
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
