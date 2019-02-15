const HOME = {
  path: "/",
  name: "home",
  title: "Home"
};

const PUBLIC = {
  path: "/public",
  name: "public",
  title: "Public"
};

const PRIVATE = {
  path: "/private",
  name: "private",
  title: "Private"
};

const LOGIN = {
  path: `${PUBLIC.path}/login`,
  name: "login",
  title: "Log In"
};

const SIGNUP = {
  path: `${PUBLIC.path}/signup`,
  name: "signup",
  title: "Sign Up"
};

const BOOKS = {
  path: `${PRIVATE.path}/books`,
  name: "books",
  title: "Books"
};

const NEW_BOOK = {
  path: `${BOOKS.path}/new`,
  name: "new_book",
  title: "Add a new book"
};

const NEW_BOOK_FOR_ENTRY = {
  path: `${BOOKS.path}/newforentry`,
  name: "new_book_for_entry",
  title: "Add a new book"
};

const VIEW_BOOK = {
  path: `${BOOKS.path}/:bookId`,
  name: "view_book",
  title: "Books"
};

const EDIT_BOOK = {
  path: `${VIEW_BOOK.path}/edit`,
  name: "edit_book",
  title: "Edit Book"
};

const SETTINGS = {
  path: `${PRIVATE.path}/settings`,
  name: "settings",
  title: "Settings"
};

const ENTRIES = {
  path: `${PRIVATE.path}/entries`,
  name: "entries",
  title: "Entries"
};

const NEW_ENTRY = {
  path: `${ENTRIES.path}/new`,
  name: "new_entry",
  title: "Add a new entry"
};

export const ROUTES = {
  HOME,
  PUBLIC,
  PRIVATE,
  BOOKS,
  VIEW_BOOK,
  NEW_BOOK,
  NEW_BOOK_FOR_ENTRY,
  EDIT_BOOK,
  LOGIN,
  SIGNUP,
  SETTINGS,
  ENTRIES,
  NEW_ENTRY
};
