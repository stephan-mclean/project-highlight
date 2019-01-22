import React from "react";
import { Route } from "react-router-dom";
import { ROUTES } from "../../constants";
import PageContainer from "../PageContainer/PageContainer";

export default () => (
  <PageContainer>
    <Route exact path={`/${ROUTES.HOME}`} component={() => <div>HOME</div>} />
    <Route exact path={`/${ROUTES.BOOKS}`} component={() => <div>BOOKS</div>} />
    <Route
      exact
      path={`/${ROUTES.ENTRIES}`}
      component={() => <div>ENTRIES</div>}
    />
    <Route
      exact
      path={`/${ROUTES.SETTINGS}`}
      component={() => <div>SETTINGS</div>}
    />
  </PageContainer>
);
