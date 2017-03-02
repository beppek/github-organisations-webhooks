import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <App />
      </MuiThemeProvider>, div
  );
});
