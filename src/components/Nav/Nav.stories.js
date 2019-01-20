import React from "react";
import { storiesOf } from "@storybook/react";
import styled, { ThemeProvider } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "../../theme/Theme";
import Button, { OUTLINE_TYPE, PRIMARY_STYLE } from "../Button/Button";
import {
  TopNav,
  TopNavHeader,
  TopNavRightNavItem,
  BottomNav,
  NavItem
} from "./";

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 300px;
`;

const stories = storiesOf("Components", module);
stories.add("Nav", () => (
  <ThemeProvider theme={Theme.main}>
    <StoryContainer>
      <TopNav>
        <TopNavHeader>TopNav</TopNavHeader>
        <TopNavRightNavItem icon="cog" />
      </TopNav>

      <BottomNav>
        <NavItem icon="book" label="Books" />
        <Button type={OUTLINE_TYPE} buttonStyle={PRIMARY_STYLE} circle>
          <FontAwesomeIcon icon="plus" />
        </Button>
        <NavItem icon="sticky-note" label="Entries" />
      </BottomNav>
    </StoryContainer>
  </ThemeProvider>
));
