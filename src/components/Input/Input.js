import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { B1 } from "../Fonts/Fonts";

const Label = styled(B1)`
  margin-bottom: 0.25rem;
`;

const StyledInput = styled.input`
  width: fill-available;
  height: 2rem;
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

const Input = ({ label, placeholder, input }) => (
  <Fragment>
    {label && <Label>{label}</Label>}
    <StyledInput {...input} placeholder={placeholder} />
  </Fragment>
);

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired
};

export default Input;
