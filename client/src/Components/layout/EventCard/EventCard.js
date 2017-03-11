import React, { Component } from "react";
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

class EventCard extends Component {

  render() {
    let border = "solid 1px";
    if (this.props.event.seen) {
      border = "none";
    }
    let styles = {
      card: {
        maxWidth: 400,
        textAlign: "left",
        margin: "0px auto 5px",
        border: border
      }
    };
    return (
      <Card style={styles.card}>
        <CardHeader
          title={this.props.event.eventType}
          subtitle={this.props.event.action}
          avatar={this.props.event.organization.avatar_url}
        />
        <CardText>
          <Avatar src={this.props.event.sender.avatar_url} /> <br />{this.props.event.sender.login}
        </CardText>
      </Card>
    );
  }
}

export default EventCard;