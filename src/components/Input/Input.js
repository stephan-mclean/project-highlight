import React, { Fragment } from "react";
import styled from "styled-components";
import { B1 } from "../Fonts/Fonts";

const Label = styled(B1)`
  margin-bottom: 0.25rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0.25rem;
  background-color: ${props => props.theme.colors.background.default};
  font-size: ${props => props.theme.fonts.b1.size};
  font-weight: ${props => props.theme.fonts.b1.weight};
  letter-spacing: ${props => props.theme.fonts.b1.letterspacing};
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

export default Input;
