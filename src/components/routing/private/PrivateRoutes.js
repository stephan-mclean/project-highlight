import React from "react";
import { Redirect, Switch } from "react-router-dom";
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
import PageContainer from "../../PageContainer/PageContainer";
import { ROUTES } from "../../../constants";
import {
  Books,
  NewBook,
  ViewBook,
  Entries,
  NewEntry,
  Settings
} from "../../../pages";
import PrivateRoute from "./PrivateRoute";

export default ({ location, history }) => (
  <AppContainer>
    <TopNav>
      <TopNavHeader>
        <Link to={`/${ROUTES.HOME}`}>TopNav</Link>
      </TopNavHeader>
      <Link to={`/${ROUTES.SETTINGS}`}>
        <TopNavRightNavItem icon="cog" />
      </Link>
    </TopNav>

    <PageContainer>
      <Switch>
        <PrivateRoute exact path={`/${ROUTES.BOOKS}`} component={Books} />
        <PrivateRoute exact path={`/${ROUTES.NEW_BOOK}`} component={NewBook} />
        <PrivateRoute
          exact
          path={`/${ROUTES.BOOKS}/:bookId`}
          component={ViewBook}
        />
        <PrivateRoute exact path={`/${ROUTES.ENTRIES}`} component={Entries} />
        <PrivateRoute
          exact
          path={`/${ROUTES.NEW_ENTRY}`}
          component={NewEntry}
        />
        <PrivateRoute exact path={`/${ROUTES.SETTINGS}`} component={Settings} />

        <Redirect exact from={`/${ROUTES.PRIVATE}`} to={`/${ROUTES.BOOKS}`} />
      </Switch>
    </PageContainer>

    <BottomNav>
      <Link to={`/${ROUTES.BOOKS}`}>
        <NavItem icon="book" label="Books" />
      </Link>
      <Button
        buttonType={OUTLINE_TYPE}
        buttonStyle={PRIMARY_STYLE}
        circle
        onClick={() => {
          if (location.pathname === `/${ROUTES.BOOKS}`) {
            history.push(`/${ROUTES.NEW_BOOK}`);
          } else if (location.pathname === `/${ROUTES.ENTRIES}`) {
            history.push(`/${ROUTES.NEW_ENTRY}`);
          }
        }}
      >
        <FontAwesomeIcon icon="plus" />
      </Button>
      <Link to={`/${ROUTES.ENTRIES}`}>
        <NavItem icon="sticky-note" label="Entries" />
      </Link>
    </BottomNav>
  </AppContainer>
);
