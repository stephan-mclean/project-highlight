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
  EditBook,
  NewEntry,
  Settings
} from "../../../pages";
import EntryList from "../../EntryList/EntryList";
import PrivateRoute from "./PrivateRoute";

export default ({ location, history }) => (
  <AppContainer>
    <TopNav>
      <TopNavHeader>
        <Link to={ROUTES.HOME.path}>
          {ROUTES.getTitleByPath(location.pathname)}
        </Link>
      </TopNavHeader>

      <TopNavRightNavItem
        icon="cog"
        onClick={() => history.push(ROUTES.SETTINGS.path)}
      />
    </TopNav>

    <PageContainer>
      <Switch>
        <PrivateRoute exact path={ROUTES.BOOKS.path} component={Books} />
        <PrivateRoute exact path={ROUTES.NEW_BOOK.path} component={NewBook} />
        <PrivateRoute
          exact
          path={ROUTES.NEW_BOOK_FOR_ENTRY.path}
          component={NewBook}
        />
        <PrivateRoute exact path={ROUTES.VIEW_BOOK.path} component={ViewBook} />
        <PrivateRoute exact path={ROUTES.EDIT_BOOK.path} component={EditBook} />
        <PrivateRoute exact path={ROUTES.ENTRIES.path} component={EntryList} />
        <PrivateRoute exact path={ROUTES.NEW_ENTRY.path} component={NewEntry} />
        <PrivateRoute exact path={ROUTES.SETTINGS.path} component={Settings} />

        <Redirect exact from={ROUTES.PRIVATE.path} to={ROUTES.BOOKS.path} />
      </Switch>
    </PageContainer>

    <BottomNav>
      <Link to={ROUTES.BOOKS.path}>
        <NavItem icon="book" label="Books" />
      </Link>
      <Button
        buttonType={OUTLINE_TYPE}
        buttonStyle={PRIMARY_STYLE}
        circle
        onClick={() => {
          if (location.pathname === ROUTES.BOOKS.path) {
            history.push(ROUTES.NEW_BOOK.path);
          } else if (location.pathname === ROUTES.ENTRIES.path) {
            history.push(ROUTES.NEW_ENTRY.path);
          }
        }}
      >
        <FontAwesomeIcon icon="plus" />
      </Button>
      <Link to={ROUTES.ENTRIES.path}>
        <NavItem icon="sticky-note" label="Entries" />
      </Link>
    </BottomNav>
  </AppContainer>
);
