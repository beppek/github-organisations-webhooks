import React, { Component } from "react";
import firebase from "../../../Interfaces/Firebase";
import Snackbar from "material-ui/Snackbar";
import {browserHistory} from "react-router";

class Notification extends Component {

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
        let eventRef = `events/${eventId}`;
        firebase.getDataOnce(eventRef).then((event) => {
          if (!event.action) {
            event.action = "triggered";
          }
            event.seen = false;
            event.id = eventId;
            this.setState({
              event: event,
              open: true
            });
        });
      this.setState({event:event, open:true});
      }
      this.setState({register: false});
    });
  }

  componentWillUnmount() {
    this.state.listeners.forEach((listener) => {
      firebase.detach(listener);
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
      event: null
    });
  }

  handleTouchTap() {
    browserHistory.push("/");
  }

  render() {
    const styles = {
      snackbar: {
        marginBottom: 100,
        float: "left"
      }
    };
    return (
      <div>
        {this.state.event && <Snackbar
          open={this.state.open}
          message={`${this.state.event.sender.login} ${this.state.event.action} ${this.state.event.eventType} event in ${this.state.event.organization.login}`}
          autoHideDuration={3000}
          onRequestClose={() => this.handleRequestClose()}
          action={"View events"}
          onActionTouchTap={() => this.handleTouchTap()}
          style={styles.snackbar}
        />}
      </div>
    );
  }
}

export default Notification;