import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Themes from "./theme/Theme";
import { ROUTES } from "./constants";
import { PublicRoutes, PrivateRoutes } from "./components/routing";
import "./initFaIcons";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: true
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
