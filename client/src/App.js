import React, { Component } from "react";
import Menu from "./Components/layout/Menu/Menu";
import RaisedButton from "material-ui/RaisedButton";
import Request from "superagent";

import logo from "./github.svg";
import "./App.css";

class App extends Component {

  // componentWillMount () {
  //   let token = localStorage.getItem("token");
  //   let uid = localStorage.getItem("uid");

  // }

  callAPI() {
    let token = localStorage.getItem("token");
    let uid = localStorage.getItem("uid");
    let url = "http://localhost:4567/github/orgs";
    Request
      .get(url)
      .set({ "x-authorization": token, "x-uid": uid })
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
