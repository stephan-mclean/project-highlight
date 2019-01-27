import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import TabSet, { Tab } from "./TabSet";

const stories = storiesOf("Components", module);
stories.add("TabSet", () => (
  <ThemeProvider theme={Theme.main}>
    <div>
      <TabSet>
        <Tab
          render={() => <div>TAB ONE</div>}
          renderHeader={() => <div>TAB ONE HEADER</div>}
        />
        <Tab
          render={() => <div>TAB TWO</div>}
          renderHeader={() => <div>TAB TWO HEADER</div>}
        />
        <Tab
          render={() => <div>TAB THREE</div>}
          renderHeader={() => <div>TAB THREE HEADER</div>}
        />
      </TabSet>
    </div>
  </ThemeProvider>
));
