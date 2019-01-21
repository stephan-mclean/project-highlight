import React from "react";
import { storiesOf } from "@storybook/react";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";

import Button, {
  DEFAULT_TYPE as defaultButtonType,
  OUTLINE_TYPE as outlineButtonType,
  LINK_TYPE as linkButtonType,
  DEFAULT_STYLE as defaultButtonStyle,
  PRIMARY_STYLE as primaryButtonStyle,
  ACCENT_STYLE as accentButtonStyle,
  DANGER_STYLE as dangerButtonStyle
} from "./Button";

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0.5rem;
`;

const stories = storiesOf("Components", module);
stories.add("Button", () => (
  <ThemeProvider theme={Theme.main}>
    <StoryContainer>
      <RowContainer>
        <Button type={defaultButtonType}>Button</Button>
        <Button type={defaultButtonType} buttonStyle={primaryButtonStyle}>
          Button
        </Button>
        <Button type={defaultButtonType} buttonStyle={accentButtonStyle}>
          Button
        </Button>
        <Button type={defaultButtonType} buttonStyle={dangerButtonStyle}>
          Button
        </Button>
      </RowContainer>

      <RowContainer>
        <Button type={outlineButtonType}>Button</Button>
        <Button type={outlineButtonType} buttonStyle={primaryButtonStyle}>
          Button
        </Button>
        <Button type={outlineButtonType} buttonStyle={accentButtonStyle}>
          Button
        </Button>
        <Button type={outlineButtonType} buttonStyle={dangerButtonStyle}>
          Button
        </Button>
      </RowContainer>

      <RowContainer>
        <Button type={linkButtonType}>Button</Button>
        <Button type={linkButtonType} buttonStyle={primaryButtonStyle}>
          Button
        </Button>
        <Button type={linkButtonType} buttonStyle={accentButtonStyle}>
          Button
        </Button>
        <Button type={linkButtonType} buttonStyle={dangerButtonStyle}>
          Button
        </Button>
      </RowContainer>

      <RowContainer>
        <Button type={defaultButtonType} circle>
          +
        </Button>
        <Button
          type={defaultButtonType}
          buttonStyle={primaryButtonStyle}
          circle
        >
          +
        </Button>
        <Button type={defaultButtonType} buttonStyle={accentButtonStyle} circle>
          +
        </Button>
        <Button type={defaultButtonType} buttonStyle={dangerButtonStyle} circle>
          +
        </Button>
      </RowContainer>

      <RowContainer>
        <Button type={outlineButtonType} circle>
          +
        </Button>
        <Button
          type={outlineButtonType}
          buttonStyle={primaryButtonStyle}
          circle
        >
          +
        </Button>
        <Button type={outlineButtonType} buttonStyle={accentButtonStyle} circle>
          +
        </Button>
        <Button type={outlineButtonType} buttonStyle={dangerButtonStyle} circle>
          +
        </Button>
      </RowContainer>
    </StoryContainer>
  </ThemeProvider>
));