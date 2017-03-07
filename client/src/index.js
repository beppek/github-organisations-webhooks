import React from "react";
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, browserHistory } from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import App from "./App";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Orgs from "./Components/Orgs/Orgs";
import Settings from "./Components/Settings/Settings";
import "./index.css";

import IFirebase from "./Interfaces/Firebase";
const firebase = new IFirebase();

firebase.init();
injectTapEventPlugin();

function checkAuth() {
  let loggedIn = false;
  let user = localStorage.getItem("username");

  if (user) {
    loggedIn = true;
  }

  if (!loggedIn) {
    browserHistory.push("/login");
  }
}

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={checkAuth} component={App}>
        <IndexRoute component={Home}/>
        <Route path="/orgs" component={Orgs}/>
        <Route path="/settings" component={Settings}/>
      </Route>
      <Route path="/login" component={Login} />
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
