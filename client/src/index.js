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
import Org from "./Components/Org/Org";
import "./index.css";

import firebase from "./Interfaces/Firebase";

firebase.init();
injectTapEventPlugin();
swController();

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

function swController() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register("sw.js").then(function(reg) {
        if (reg.installing) {
          // Call something
          console.log("installing");
          return;
        }
        if (reg.waiting) {
          console.log("waiting");
          return;
        }
        // if (!navigator.serviceWorker.controller) {
        //   console.log("no controller");
        //   return;
        // }

        reg.addEventListener("updatefound", function() {
          console.log("installing update");
        });
        console.log("ServiceWorker registration successful with scope: ", reg.scope);
      }).catch(function(err) {
        console.log("ServiceWorker registration failed: ", err);
      });
    });
  }
}

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={checkAuth} component={App}>
        <IndexRoute component={Home}/>
        <Route path="/orgs" component={Orgs}/>
        <Route path="/org/:org" component={Org}/>
      </Route>
      <Route path="/login" component={Login} />
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
