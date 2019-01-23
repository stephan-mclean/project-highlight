import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "../../Link/Link";
import {
  TopNav,
  TopNavHeader,
  TopNavRightNavItem,
  BottomNav,
  NavItem
} from "../../Nav";
import Button, { OUTLINE_TYPE, PRIMARY_STYLE } from "../../Button/Button";
import AppContainer from "../../AppContainer/AppContainer";
import { ROUTES } from "../../../constants";

export default () => (
  <AppContainer>
    <TopNav>
      <TopNavHeader>
        <Link to={`/${ROUTES.HOME}`}>TopNav</Link>
      </TopNavHeader>
      <Link to={`/${ROUTES.SETTINGS}`}>
        <TopNavRightNavItem icon="cog" />
      </Link>
    </TopNav>

    <Switch>
      <Route
        exact
        path={`/${ROUTES.BOOKS}`}
        component={() => <div>BOOKS</div>}
      />
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

      <Redirect exact from="/private" to="/private/books" />
    </Switch>

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
