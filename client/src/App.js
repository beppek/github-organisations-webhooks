import React, { Component } from "react";
import { Link } from "react-router";
import Menu from "./Components/Menu/Menu";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        {this.props.children}
        <Menu />
      </div>
    );
  }
}

export default App;
