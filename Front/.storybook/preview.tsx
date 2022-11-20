import "!style-loader!css-loader!sass-loader!../src/styles/styles.scss";
import React from "react";
import { addDecorator } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../src/store";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};

addDecorator((story) => (
  <Provider store={store}>
    <BrowserRouter>{story()}</BrowserRouter>
  </Provider>
));
