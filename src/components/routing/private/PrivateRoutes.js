import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

export default () => (
  <Switch>
    <Route exact path="/private/home" component={() => <div>HOME</div>} />

    <Redirect exact from="/private" to="/private/home" />
  </Switch>
);
