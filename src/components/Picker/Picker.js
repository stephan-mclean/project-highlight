import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { B1, B2 } from "../Fonts/Fonts";

const PickerLabel = styled(B1)`
  margin-bottom: 0.25rem;
`;

const ValueLabel = styled(B2)`
  color: ${props => props.theme.colors.foreground.secondary};
  margin-left: 0.25rem;
`;

const ValueIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors.foreground.default};
  margin-right: 0.25rem;
`;

const ValueContainer = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${props => `1px solid ${props.theme.colors.background.default}`};
`;

const Picker = ({ label, value, onClick }) => (
  <Fragment>
    {label && <PickerLabel>{label}</PickerLabel>}
    <ValueContainer onClick={onClick}>
      <ValueLabel>{value}</ValueLabel>
      <ValueIcon icon="chevron-right" />
    </ValueContainer>
  </Fragment>
);

Picker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func
};

Picker.defaultProps = {
  value: "Choose",
  onClick: () => {}
};

export default Picker;
