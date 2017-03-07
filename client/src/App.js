import React, { Component } from "react";
import Menu from "./Components/Menu/Menu";
import RaisedButton from "material-ui/RaisedButton";
import Request from "superagent";

import logo from "./github.svg";
import "./App.css";

class App extends Component {

  callAPI() {
    let token = localStorage.getItem("token");
    let uid = localStorage.getItem("uid");
    console.log("calling API");
    let url = "http://localhost:4567/ping";
    Request
      .get(url)
      .set({"x-authorization": token, "x-uid": uid})
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <RaisedButton label="Default" onTouchTap={() => this.callAPI()} />
        {this.props.children}
        <Menu />
      </div>
    );
  }
}

export default App;
