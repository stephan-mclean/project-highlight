import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ROUTES } from "../../../constants";

const PrivateRoute = ({ component: Component, currentUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        currentUser !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/${ROUTES.PUBLIC}`} />
        )
      }
    />
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.currentUser
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
