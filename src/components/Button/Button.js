import styled from "styled-components";
import PropTypes from "prop-types";
import {
  getBackgroundColor,
  getBorder,
  getBorderDisabled,
  getDisabledBackgroundColor,
  getDisabledFontColor,
  getFontColor,
  getHoverBackgroundColor,
  getHoverBorder,
  getHoverFontColor,
  getWidth,
  ACCENT_STYLE,
  AVAILABLE_STYLES,
  AVAILABLE_TYPES,
  DANGER_STYLE,
  DEFAULT_STYLE,
  DEFAULT_TYPE,
  LINK_TYPE,
  OUTLINE_TYPE,
  PRIMARY_STYLE
} from "./styleHelper";

const Button = styled.button`
  height: ${props => (props.circle ? "3rem" : "2rem")};
  width: ${props => getWidth(props)};
  border-radius: ${props =>
    props.circle ? "1.5rem" : props.theme.defaultBorderRadius};
  padding: ${props =>
    props.buttonType === LINK_TYPE || props.circle ? "0" : "0.5rem"};
  font-size: ${props =>
    props.circle ? "1rem" : props.theme.fonts.button.size};
  font-weight: ${props => props.theme.fonts.button.weight};
  letter-spacing: ${props => props.theme.fonts.button.letterspacing};
  line-height: 1rem;
  font-family: "Muli", sans-serif;
  text-transform: uppercase;
  background-color: ${props =>
    props.disabled
      ? getDisabledBackgroundColor(props)
      : getBackgroundColor(props)};
  color: ${props =>
    props.disabled ? getDisabledFontColor(props) : getFontColor(props)};
  border: ${props =>
    props.disabled ? getBorderDisabled(props) : getBorder(props)};
  text-decoration: ${props =>
    props.buttonType === LINK_TYPE ? "underline" : "none"};

  :hover:enabled,
  :active:enabled {
    cursor: pointer;
    background-color: ${props => getHoverBackgroundColor(props)};
    color: ${props => getHoverFontColor(props)};
    border: ${props => getHoverBorder(props)};
    transition: all 0.3s ease;
  }
`;

Button.propTypes = {
  buttonType: PropTypes.oneOf(AVAILABLE_TYPES),
  buttonStyle: PropTypes.oneOf(AVAILABLE_STYLES)
};

Button.defaultProps = {
  buttonType: DEFAULT_TYPE,
  buttonStyle: DEFAULT_STYLE
};

export default Button;

export {
  DEFAULT_TYPE,
  OUTLINE_TYPE,
  LINK_TYPE,
  DEFAULT_STYLE,
  PRIMARY_STYLE,
  ACCENT_STYLE,
  DANGER_STYLE
};
