import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Themes from "./theme/Theme";
import AppContainer from "./components/AppContainer/AppContainer";
import PageContainer from "./components/PageContainer/PageContainer";
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
import "./initFaIcons";

class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={Themes.main}>
          <AppContainer>
            <TopNav>
              <TopNavHeader>TopNav</TopNavHeader>
              <TopNavRightNavItem icon="cog" />
            </TopNav>

            <PageContainer>
              <Route exact path="/" component={() => <div>HOME</div>} />
            </PageContainer>

            <BottomNav>
              <NavItem icon="book" label="Books" />
              <Button type={OUTLINE_TYPE} buttonStyle={PRIMARY_STYLE} circle>
                <FontAwesomeIcon icon="plus" />
              </Button>
              <NavItem icon="sticky-note" label="Entries" />
            </BottomNav>
          </AppContainer>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
