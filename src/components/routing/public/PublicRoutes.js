import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ROUTES } from "../../../constants";

export default () => (
  <Switch>
    <Route exact path={`/${ROUTES.LOGIN}`} component={() => <div>LOGIN</div>} />
    <Route
      exact
      path={`/${ROUTES.SIGNUP}`}
      component={() => <div>SIGNUP</div>}
    />

    <Redirect exact from={`/${ROUTES.PUBLIC}`} to="/public/login" />
  </Switch>
);
