import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import Entry from "./Entry";

const mockEntry = {
  book: {
    title: "Book Title",
    page: 323
  },
  createdDate: "01/01/2019",
  passage: {
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a fermentum tellus. Sed tincidunt pretium eros in tempor. In commodo tellus sed augue laoreet, ut vestibulum nibh rutrum. Vivamus risus nisi, pharetra et tristique in, porta sit amet lorem. Mauris nunc sapien, finibus eu euismod et, tincidunt in leo. Ut accumsan felis eget dolor mattis placerat."
  },
  notes:
    "Aliquam erat volutpat. Donec dui tellus, congue at placerat at, sollicitudin eget lorem. Proin sit amet nibh ultricies, suscipit nibh nec, fermentum odio. Suspendisse quam nibh, ullamcorper sit amet ullamcorper a, dictum ut nibh. Phasellus sed purus nec urna mollis maximus."
};

const stories = storiesOf("Components", module);
stories.add("Entry", () => (
  <ThemeProvider theme={Theme.main}>
    <div>
      <Entry
        bookTitle={mockEntry.bookTitle}
        page={mockEntry.page}
        createdDate={mockEntry.createdDate}
        passage={mockEntry.passage}
        notes={mockEntry.notes}
        onEdit={() => console.log("edit entry")}
        onDelete={() => console.log("delete entry")}
      />
    </div>
  </ThemeProvider>
));
