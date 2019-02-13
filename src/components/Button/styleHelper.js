export const DEFAULT_TYPE = "default";
export const OUTLINE_TYPE = "outline";
export const LINK_TYPE = "link";
export const AVAILABLE_TYPES = [DEFAULT_TYPE, OUTLINE_TYPE, LINK_TYPE];

export const DEFAULT_STYLE = "default";
export const PRIMARY_STYLE = "primary";
export const ACCENT_STYLE = "accent";
export const DANGER_STYLE = "danger";
export const AVAILABLE_STYLES = [
  DEFAULT_STYLE,
  PRIMARY_STYLE,
  ACCENT_STYLE,
  DANGER_STYLE
];

export const getPrimaryColor = props => {
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

export const getPrimaryHoverColor = props => {
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

export const getBackgroundColor = props => {
  if ([OUTLINE_TYPE, LINK_TYPE].includes(props.buttonType)) {
    return "transparent";
  }

  return getPrimaryColor(props);
};

export const getPrimaryColorDisabled = props => {
  switch (props.buttonStyle) {
    case DEFAULT_STYLE:
      return props.theme.colors.foreground.quintenary;
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

export const getDisabledBackgroundColor = props => {
  if ([OUTLINE_TYPE, LINK_TYPE].includes(props.buttonType)) {
    return "transparent";
  }

  return getPrimaryColorDisabled(props);
};

export const getDisabledFontColor = props => {
  if ([OUTLINE_TYPE, LINK_TYPE].includes(props.buttonType)) {
    return props.theme.colors.foreground.quaternary;
  }

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

export const getFontColor = props => {
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
    return props.theme.colors.foreground.secondary;
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

export const getBorder = props => {
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
    return `1px solid ${props.theme.colors.foreground.secondary}`;
  }

  return "none";
};

export const getBorderDisabled = props => {
  if (props.buttonType === OUTLINE_TYPE) {
    return `1px solid ${props.theme.colors.foreground.quaternary}`;
  }

  return "none";
};

export const getHoverBackgroundColor = props => {
  if ([OUTLINE_TYPE, LINK_TYPE].includes(props.buttonType)) {
    return "none";
  }

  return getPrimaryHoverColor(props);
};

export const getHoverFontColor = props => {
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
    return props.theme.colors.foreground.primary;
  }

  switch (props.buttonStyle) {
    case DEFAULT_STYLE:
      return props.theme.colors.foreground.primary;
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

export const getHoverBorder = props => {
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
    return `1px solid ${props.theme.colors.foreground.primary}`;
  }

  return "none";
};

export const getWidth = props => {
  if (props.circle) {
    return "3rem";
  } else if (props.block) {
    return "100%";
  }

  return "auto";
};
