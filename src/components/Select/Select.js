import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { B1, B2 } from "../Fonts/Fonts";

const SelectLabel = styled(B1)`
  margin-bottom: 0.25rem;
`;

const OptionLabel = styled(B2)`
  color: ${props =>
    props.isSelected
      ? props.theme.colors.background.tertiary
      : props.theme.colors.background.secondary};
  margin-left: 0.25rem;
`;

const OptionCheckIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  color: ${props => props.theme.colors.background.tertiary};
  margin-right: 0.25rem;
`;

const OptionContainer = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${props =>
    props.isSelected
      ? `1px solid ${props.theme.colors.background.default}`
      : `1px solid ${props.theme.colors.background.tertiary}`};
  margin-bottom: 0.5rem;
`;

const Select = ({ label, options, input }) => (
  <Fragment>
    {label && <SelectLabel>{label}</SelectLabel>}
    {options.map(option => (
      <OptionContainer
        isSelected={input.value === option}
        onClick={() => props.onChange(option)}
        key={`selectOption${option}`}
      >
        <OptionLabel isSelected={input.value === option}>{option}</OptionLabel>
        {input.value === option && <OptionCheckIcon icon="check" />}
      </OptionContainer>
    ))}
  </Fragment>
);

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  input: PropTypes.object.isRequired
};

export default Select;
