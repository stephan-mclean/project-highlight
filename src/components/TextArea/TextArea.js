import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { B1 } from "../Fonts/Fonts";

const Label = styled(B1)`
  margin-bottom: 0.25rem;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.25rem;
  background-color: ${props => props.theme.colors.background.default};
  font-size: ${props => props.theme.fonts.b1.size};
  font-weight: ${props => props.theme.fonts.b1.weight};
  letter-spacing: ${props => props.theme.fonts.b1.letterspacing};
  color: ${props => props.theme.colors.background.tertiary};
  border: none;
  ::placeholder {
    color: ${props => props.theme.colors.background.secondary};
  }
`;

const TextArea = ({ label, placeholder, input }) => (
  <Fragment>
    {label && <Label>{label}</Label>}
    <StyledTextArea {...input} placeholder={placeholder} />
  </Fragment>
);

TextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired
};

export default TextArea;
