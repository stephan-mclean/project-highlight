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
              <TopNavHeader>
                <Link to="/">TopNav</Link>
              </TopNavHeader>
              <Link to="/settings">
                <TopNavRightNavItem icon="cog" />
              </Link>
            </TopNav>

            <PageContainer>
              <Route exact path="/" component={() => <div>HOME</div>} />
              <Route exact path="/books" component={() => <div>BOOKS</div>} />
              <Route
                exact
                path="/entries"
                component={() => <div>ENTRIES</div>}
              />
              <Route
                exact
                path="/settings"
                component={() => <div>SETTINGS</div>}
              />
            </PageContainer>

            <BottomNav>
              <Link to="/books">
                <NavItem icon="book" label="Books" />
              </Link>
              <Button type={OUTLINE_TYPE} buttonStyle={PRIMARY_STYLE} circle>
                <FontAwesomeIcon icon="plus" />
              </Button>
              <Link to="/entries">
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
