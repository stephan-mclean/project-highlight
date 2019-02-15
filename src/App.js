import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Themes from "./theme/Theme";
import { ROUTES } from "./constants";
import { PublicRoutes, PrivateRoutes } from "./components/routing";
import { getCurrentUser } from "./actions";
import "./initFaIcons";
import { GlobalStyle } from "./theme/GlobalStyle";

class App extends Component {
  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={Themes.main}>
          <Fragment>
            <Route
              exact
              path={ROUTES.HOME.path}
              render={() => {
                return this.props.currentUser ? (
                  <Redirect to={ROUTES.PRIVATE.path} />
                ) : (
                  <Redirect to={ROUTES.PUBLIC.path} />
                );
              }}
            />

            <Route path={ROUTES.PRIVATE.path} component={PrivateRoutes} />
            <Route path={ROUTES.PUBLIC.path} component={PublicRoutes} />

            <GlobalStyle />
            <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
          </Fragment>
        </ThemeProvider>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.currentUser
  };
};

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(App);
