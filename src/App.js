import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "./components/Link/Link";
import Themes from "./theme/Theme";
import AppContainer from "./components/AppContainer/AppContainer";
import MainRouter from "./components/MainRouter/MainRouter";
import {
  TopNav,
  TopNavHeader,
  TopNavRightNavItem,
  BottomNav,
  NavItem
} from "./components/Nav";
import Button, {
  OUTLINE_TYPE,
  PRIMARY_STYLE
} from "./components/Button/Button";
import { ROUTES } from "./constants";
import "./initFaIcons";

class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={Themes.main}>
          <AppContainer>
            <TopNav>
              <TopNavHeader>
                <Link to={`/${ROUTES.HOME}`}>TopNav</Link>
              </TopNavHeader>
              <Link to={`/${ROUTES.SETTINGS}`}>
                <TopNavRightNavItem icon="cog" />
              </Link>
            </TopNav>

            <MainRouter />

            <BottomNav>
              <Link to={`/${ROUTES.BOOKS}`}>
                <NavItem icon="book" label="Books" />
              </Link>
              <Button type={OUTLINE_TYPE} buttonStyle={PRIMARY_STYLE} circle>
                <FontAwesomeIcon icon="plus" />
              </Button>
              <Link to={`/${ROUTES.ENTRIES}`}>
                <NavItem icon="sticky-note" label="Entries" />
              </Link>
            </BottomNav>
          </AppContainer>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
