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
        <Tab render={() => <div>TAB ONE</div>} header="tab one" />
        <Tab render={() => <div>TAB TWO</div>} header="tab two" />
        <Tab render={() => <div>TAB THREE</div>} header="tab three" />
      </TabSet>
    </div>
  </ThemeProvider>
));
