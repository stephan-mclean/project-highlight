import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import BookSummary from "./BookSummary";

const mockBookSummary = {
  coverSrc: "https://via.placeholder.com/128x198",
  title: "Book Title",
  subtitle: "Book Subtitle",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet nibh laoreet, placerat turpis eu, sagittis lacus. Vestibulum dictum sodales dui. Duis efficitur mi ut lectus iaculis sodales. Vestibulum quis nisi elit. Nulla eu ipsum consectetur, porta erat aliquam, facilisis eros. Interdum et malesuada fames ac ante ipsum primis in faucibus."
};

const stories = storiesOf("Components", module);
stories.add("Book Summary", () => (
  <ThemeProvider theme={Theme.main}>
    <div>
      <BookSummary
        coverSrc={mockBookSummary.coverSrc}
        title={mockBookSummary.title}
        subtitle={mockBookSummary.subtitle}
        description={mockBookSummary.description}
      />
    </div>
  </ThemeProvider>
));
