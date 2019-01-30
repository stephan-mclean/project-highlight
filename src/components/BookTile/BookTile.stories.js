import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import BookTile, { BookTileGrid } from "./BookTile";

const mockBookTile = {
  coverSrc: "https://via.placeholder.com/128x198",
  numEntries: 0
};

const mockBookTile2 = {
  coverSrc: "https://via.placeholder.com/128x198",
  numEntries: 1
};

const mockBookTile3 = {
  coverSrc: "https://via.placeholder.com/128x198",
  numEntries: 2
};

const mockBookTile4 = {
  title: "Book Title",
  numEntries: 2
};

const stories = storiesOf("Components", module);
stories.add("Book Tile", () => (
  <ThemeProvider theme={Theme.main}>
    <BookTileGrid>
      <BookTile
        coverSrc={mockBookTile.coverSrc}
        numEntries={mockBookTile.numEntries}
        onClick={() => console.log("Book tile 1 on click")}
      />

      <BookTile
        coverSrc={mockBookTile2.coverSrc}
        numEntries={mockBookTile2.numEntries}
        onClick={() => console.log("Book tile 2 on click")}
      />

      <BookTile
        coverSrc={mockBookTile3.coverSrc}
        numEntries={mockBookTile3.numEntries}
        onClick={() => console.log("Book tile 3 on click")}
      />
      <BookTile
        title={mockBookTile4.title}
        numEntries={mockBookTile4.numEntries}
        onClick={() => console.log("Book tile 4 on click")}
      />
    </BookTileGrid>
  </ThemeProvider>
));
