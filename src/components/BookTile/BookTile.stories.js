import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import BookTile from "./BookTile";

const mockBookTile = {
  coverSrc: "https://via.placeholder.com/128x198",
  numEntries: 0
};

const stories = storiesOf("Components", module);
stories.add("Book Tile", () => (
  <ThemeProvider theme={Theme.main}>
    <div>
      <BookTile
        coverSrc={mockBookTile.coverSrc}
        numEntries={mockBookTile.numEntries}
        onClick={() => console.log("Book tile 1 on click")}
      />
    </div>
  </ThemeProvider>
));
