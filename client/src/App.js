import React, { Component } from "react";
import Menu from "./Components/layout/Menu/Menu";
import firebase from "./Interfaces/Firebase";
import {browserHistory} from "react-router";
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {red400} from "material-ui/styles/colors";
import Snackbar from 'material-ui/Snackbar';

import logo from "./github.svg";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      listeners: [],
      event: null,
      register: true
    };
    this.uid = localStorage.getItem("uid");
  }

  componentWillMount() {
    let eventsRef = `users/${this.uid}/events`;
    this.setState({
        listeners: this.state.listeners.concat([eventsRef])
    });
    firebase.listen(eventsRef, (eventId) => {
      if (!this.state.register) {
        console.log(eventId);
        let eventRef = `events/${eventId}`;
        firebase.getData(eventRef, (event) => {
            event.seen = false;
            event.id = eventId;
            this.setState({
                listeners: this.state.listeners.concat([eventRef])
            });
            this.setState({
              event: event,
              open: true
            });
        });
      }
      this.setState({register: false});
    });
  }

  componentWillUnMount() {
    this.state.listeners.forEach((listener) => {
      firebase.detach(listener);
    });
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

  handleRequestClose() {
    this.setState({
      open: false,
      event: null
    });
  }

  render() {
    const styles = {
      position: "absolute",
      right: "5%",
      top: 0,
      height: 45,
      color: red400
    };
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

        <FlatButton
            label="Signout"
            onTouchTap={() => this.signout()}
            style={styles}
            icon={<FontIcon className="fa fa-power-off"/>}
        />
        </div>
        {this.props.children}
        <Menu />
        {this.state.event && <Snackbar
          open={this.state.open}
          message={this.state.event.eventType}
          autoHideDuration={4000}
          onRequestClose={() => this.handleRequestClose()}
        />}
      </div>
    );
  }
}

export default App;
