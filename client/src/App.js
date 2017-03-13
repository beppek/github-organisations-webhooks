import React, { Component } from "react";
import Menu from "./Components/layout/Menu/Menu";
import firebase from "./Interfaces/Firebase";
import {browserHistory} from "react-router";
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {red400} from "material-ui/styles/colors";

import sw from "./controller/swController";

import logo from "./github.svg";
import "./App.css";

class App extends Component {

  componentWillMount() {
    sw();
  }

  signout() {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      firebase.signout().then(() => {
          browserHistory.push("/login");
      })
      .catch((error) => {
          console.log(error);
      });
  }

  render() {
    const styles = {
      button: {
        position: "absolute",
        right: "5%",
        top: 0,
        height: 45,
        color: red400
      },
      snackbar: {
        marginBottom: 60
      }
    };
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

        <FlatButton
            label="Signout"
            onTouchTap={() => this.signout()}
            style={styles.button}
            icon={<FontIcon className="fa fa-power-off"/>}
        />
        </div>
        {this.props.children}
        <Menu />
      </div>
    );
  }
}

export default App;
