import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
import { PublicRoutes, PrivateRoutes } from "./components/routing";
import "./initFaIcons";

const test = (
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
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    };
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={Themes.main}>
          <Fragment>
            <Route
              exact
              path={`/${ROUTES.HOME}`}
              render={() =>
                this.state.authenticated ? (
                  <Redirect to="/private" />
                ) : (
                  <Redirect to="/public" />
                )
              }
            />

            <Route path="/private" component={PrivateRoutes} />
            <Route path="/public" component={PublicRoutes} />
          </Fragment>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
