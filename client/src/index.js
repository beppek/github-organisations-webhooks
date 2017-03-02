import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRedirect, browserHistory } from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import App from "./App";
import Login from "./Components/Login/Login";
import "./index.css";

import IFirebase from "./Firebase/FirebaseInterface";
const firebase = new IFirebase();

firebase.init();

function checkAuth() {
  let loggedIn = true;
  if (!loggedIn) {
    browserHistory.push("/login");
  }
}

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={checkAuth} component={App}>
      </Route>
      <Route path="/login" component={Login} />
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
