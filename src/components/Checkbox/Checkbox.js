import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { B1 } from "../Fonts/Fonts";

const Container = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  width: fill-available;
  min-height: 2rem;
  padding-left: 2.5rem;
  margin-bottom: 1rem;
`;

const Label = styled(B1)`
  margin-bottom: 0.25rem;
`;

const CheckboxContainer = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 2rem;
  width: 2rem;
  border-radius: 1rem;
  background-color: ${props => props.theme.colors.background.default};
`;

const CheckMark = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  visibility: hidden;
  color: ${props => props.theme.colors.background.light};
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  :checked ~ ${CheckboxContainer} {
    background-color: ${props => props.theme.colors.background.tertiary};

    ${CheckMark} {
      visibility: visible;
    }
  }
`;

export default ({ label, input, ...otherProps }) => (
  <Container {...otherProps}>
    <Label>{label}</Label>
    <Input type="checkbox" {...input} />
    <CheckboxContainer>
      <CheckMark icon="check" />
    </CheckboxContainer>
  </Container>
);
