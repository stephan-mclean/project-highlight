import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ROUTES } from "../../../constants";
import { Login, SignUp } from "../../../pages";

export default () => (
  <Switch>
    <Route exact path={`/${ROUTES.LOGIN}`} component={Login} />
    <Route exact path={`/${ROUTES.SIGNUP}`} component={SignUp} />

    <Redirect exact from={`/${ROUTES.PUBLIC}`} to={`/${ROUTES.LOGIN}`} />
  </Switch>
);
