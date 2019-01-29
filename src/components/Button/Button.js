import styled from "styled-components";
import PropTypes from "prop-types";

const DEFAULT_TYPE = "default";
const OUTLINE_TYPE = "outline";
const LINK_TYPE = "link";
const AVAILABLE_TYPES = [DEFAULT_TYPE, OUTLINE_TYPE, LINK_TYPE];

const DEFAULT_STYLE = "default";
const PRIMARY_STYLE = "primary";
const ACCENT_STYLE = "accent";
const DANGER_STYLE = "danger";
const AVAILABLE_STYLES = [
  DEFAULT_STYLE,
  PRIMARY_STYLE,
  ACCENT_STYLE,
  DANGER_STYLE
];

const getPrimaryColor = props => {
  switch (props.buttonStyle) {
    case DEFAULT_STYLE:
      return props.theme.colors.foreground.quaternary;
    case PRIMARY_STYLE:
      return props.theme.colors.primary.default;
    case ACCENT_STYLE:
      return props.theme.colors.accent.default;
    case DANGER_STYLE:
      return props.theme.colors.danger.default;
    default:
      return null;
  }
};

const getPrimaryHoverColor = props => {
  switch (props.buttonStyle) {
    case DEFAULT_STYLE:
      return props.theme.colors.foreground.tertiary;
    case PRIMARY_STYLE:
      return props.theme.colors.primary.dark;
    case ACCENT_STYLE:
      return props.theme.colors.accent.dark;
    case DANGER_STYLE:
      return props.theme.colors.danger.dark;
    default:
      return null;
  }
};

const getBackgroundColor = props => {
  if ([OUTLINE_TYPE, LINK_TYPE].includes(props.buttonType)) {
    return "transparent";
  }

  return getPrimaryColor(props);
};

const getFontColor = props => {
  if (
    [OUTLINE_TYPE, LINK_TYPE].includes(props.buttonType) &&
    props.buttonStyle !== DEFAULT_STYLE
  ) {
    return getPrimaryColor(props);
  }

  if (
    [OUTLINE_TYPE, LINK_TYPE].includes(props.buttonType) &&
    props.buttonStyle === DEFAULT_STYLE
  ) {
    return props.theme.colors.foreground.tertiary;
  }

  switch (props.buttonStyle) {
    case DEFAULT_STYLE:
      return props.theme.colors.foreground.default;
    case PRIMARY_STYLE:
      return props.theme.colors.primary.verylight;
    case ACCENT_STYLE:
      return props.theme.colors.accent.verylight;
    case DANGER_STYLE:
      return props.theme.colors.danger.verylight;
    default:
      return null;
  }
};

const getBorder = props => {
  if (
    props.buttonType === OUTLINE_TYPE &&
    props.buttonStyle !== DEFAULT_STYLE
  ) {
    return `1px solid ${getPrimaryColor(props)}`;
  }

  if (
    props.buttonType === OUTLINE_TYPE &&
    props.buttonStyle === DEFAULT_STYLE
  ) {
    return `1px solid ${props.theme.colors.foreground.quaternary}`;
  }

  return "none";
};

const getHoverBackgroundColor = props => {
  if ([OUTLINE_TYPE, LINK_TYPE].includes(props.buttonType)) {
    return "none";
  }

  return getPrimaryHoverColor(props);
};

const getHoverFontColor = props => {
  if (
    [OUTLINE_TYPE, LINK_TYPE].includes(props.buttonType) &&
    props.buttonStyle !== DEFAULT_STYLE
  ) {
    return getPrimaryHoverColor(props);
  }

  if (
    [OUTLINE_TYPE, LINK_TYPE].includes(props.buttonType) &&
    props.buttonStyle === DEFAULT_STYLE
  ) {
    return props.theme.colors.foreground.secondary;
  }

  switch (props.buttonStyle) {
    case DEFAULT_STYLE:
      return props.theme.colors.foreground.secondary;
    case PRIMARY_STYLE:
      return props.theme.colors.primary.light;
    case ACCENT_STYLE:
      return props.theme.colors.accent.light;
    case DANGER_STYLE:
      return props.theme.colors.danger.light;
    default:
      return null;
  }
};

const getHoverBorder = props => {
  if (
    props.buttonType === OUTLINE_TYPE &&
    props.buttonStyle !== DEFAULT_STYLE
  ) {
    return `1px solid ${getPrimaryHoverColor(props)}`;
  }

  if (
    props.buttonType === OUTLINE_TYPE &&
    props.buttonStyle === DEFAULT_STYLE
  ) {
    return `1px solid ${props.theme.colors.foreground.secondary}`;
  }

  return "none";
};

const Button = styled.button`
  height: ${props => (props.circle ? "3rem" : "2rem")};
  width: ${props => (props.circle ? "3rem" : "auto")};
  border-radius: ${props =>
    props.circle ? "1.5rem" : props.theme.defaultBorderRadius};
  padding: ${props =>
    props.buttonType === LINK_TYPE || props.circle ? "0" : "0.5rem"};
  font-size: ${props =>
    props.circle ? "1rem" : props.theme.fonts.button.size};
  font-weight: ${props => props.theme.fonts.button.weight};
  letter-spacing: ${props => props.theme.fonts.button.letterspacing};
  font-family: "Muli", sans-serif;
  text-transform: uppercase;
  background-color: ${props => getBackgroundColor(props)};
  color: ${props => getFontColor(props)};
  border: ${props => getBorder(props)};
  text-decoration: ${props =>
    props.buttonType === LINK_TYPE ? "underline" : "none"};

  :hover,
  :active {
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
