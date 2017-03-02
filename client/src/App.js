import React, { Component } from "react";
import { Link } from "react-router";
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
        <div className="menu-container">
          <ul className="main-menu">
            <li className="menu-item"><Link to="/collections" activeClassName="active"><i className="fa fa-picture-o" aria-hidden="true"></i>Collections</Link></li>
            <li className="menu-item"><Link to="/portfolio" activeClassName="active"><i className="fa fa-briefcase" aria-hidden="true"></i>Portfolio</Link></li>
            <li className="menu-item"><Link to="/browse" activeClassName="active"><i className="fa fa-wpexplorer" aria-hidden="true"></i>Browse</Link></li>
            <li className="menu-item"><Link to="/admin" activeClassName="active"><i className="fa fa-id-badge" aria-hidden="true"></i>Admin</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
