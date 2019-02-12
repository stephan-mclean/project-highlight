import { configure, addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { ThemeProvider } from "styled-components";
import StoryBookContainer from "../src/components/StorybookContainer/StorybookContainer";
import "../src/initFaIcons";

addDecorator(
  withInfo({
    inline: true,
    source: false,
    propTablesExclude: [ThemeProvider, StoryBookContainer]
  })
);
configure(() => {
  const req = require.context("../src/components", true, /.stories.js$/);
  req.keys().forEach(filename => req(filename));
}, module);
