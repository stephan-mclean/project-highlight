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
        <Button buttonType={defaultButtonType}>Button</Button>
        <Button buttonType={defaultButtonType} buttonStyle={primaryButtonStyle}>
          Button
        </Button>
        <Button buttonType={defaultButtonType} buttonStyle={accentButtonStyle}>
          Button
        </Button>
        <Button buttonType={defaultButtonType} buttonStyle={dangerButtonStyle}>
          Button
        </Button>
      </RowContainer>

      <RowContainer>
        <Button buttonType={defaultButtonType} disabled>
          Button
        </Button>
        <Button
          buttonType={defaultButtonType}
          buttonStyle={primaryButtonStyle}
          disabled
        >
          Button
        </Button>
        <Button
          buttonType={defaultButtonType}
          buttonStyle={accentButtonStyle}
          disabled
        >
          Button
        </Button>
        <Button
          buttonType={defaultButtonType}
          buttonStyle={dangerButtonStyle}
          disabled
        >
          Button
        </Button>
      </RowContainer>

      <RowContainer>
        <Button buttonType={outlineButtonType}>Button</Button>
        <Button buttonType={outlineButtonType} buttonStyle={primaryButtonStyle}>
          Button
        </Button>
        <Button buttonType={outlineButtonType} buttonStyle={accentButtonStyle}>
          Button
        </Button>
        <Button buttonType={outlineButtonType} buttonStyle={dangerButtonStyle}>
          Button
        </Button>
      </RowContainer>

      <RowContainer>
        <Button buttonType={outlineButtonType} disabled>
          Button
        </Button>
        <Button
          buttonType={outlineButtonType}
          buttonStyle={primaryButtonStyle}
          disabled
        >
          Button
        </Button>
        <Button
          buttonType={outlineButtonType}
          buttonStyle={accentButtonStyle}
          disabled
        >
          Button
        </Button>
        <Button
          buttonType={outlineButtonType}
          buttonStyle={dangerButtonStyle}
          disabled
        >
          Button
        </Button>
      </RowContainer>

      <RowContainer>
        <Button buttonType={linkButtonType}>Button</Button>
        <Button buttonType={linkButtonType} buttonStyle={primaryButtonStyle}>
          Button
        </Button>
        <Button buttonType={linkButtonType} buttonStyle={accentButtonStyle}>
          Button
        </Button>
        <Button buttonType={linkButtonType} buttonStyle={dangerButtonStyle}>
          Button
        </Button>
      </RowContainer>

      <RowContainer>
        <Button buttonType={defaultButtonType} circle>
          +
        </Button>
        <Button
          buttonType={defaultButtonType}
          buttonStyle={primaryButtonStyle}
          circle
        >
          +
        </Button>
        <Button
          buttonType={defaultButtonType}
          buttonStyle={accentButtonStyle}
          circle
        >
          +
        </Button>
        <Button
          buttonType={defaultButtonType}
          buttonStyle={dangerButtonStyle}
          circle
        >
          +
        </Button>
      </RowContainer>

      <RowContainer>
        <Button buttonType={outlineButtonType} circle>
          +
        </Button>
        <Button
          buttonType={outlineButtonType}
          buttonStyle={primaryButtonStyle}
          circle
        >
          +
        </Button>
        <Button
          buttonType={outlineButtonType}
          buttonStyle={accentButtonStyle}
          circle
        >
          +
        </Button>
        <Button
          buttonType={outlineButtonType}
          buttonStyle={dangerButtonStyle}
          circle
        >
          +
        </Button>
      </RowContainer>
    </StoryContainer>
  </ThemeProvider>
));
