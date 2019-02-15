import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ROUTES } from "../../../constants";
import { Login, SignUp } from "../../../pages";

export default () => (
  <Switch>
    <Route exact path={ROUTES.LOGIN.path} component={Login} />
    <Route exact path={ROUTES.SIGNUP.path} component={SignUp} />

    <Redirect exact from={ROUTES.PUBLIC.path} to={ROUTES.LOGIN.path} />
  </Switch>
);
