import React, { Component } from "react";
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from "material-ui/FontIcon";

class EventCard extends Component {

  handleDelete() {
    this.props.handleDelete(this.props.event);
  }

  render() {
    let border = "solid 1px";
    if (this.props.event.seen) {
      border = "none";
    }
    let styles = {
      card: {
        maxWidth: "90%",
        textAlign: "left",
        margin: "0px auto 5px",
        border: border
      },
      button: {
        zIndex: 0
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
        <CardActions>
          <FlatButton
            label="Delete"
            secondary={true}
            onTouchTap={() => this.handleDelete()}
            icon={<FontIcon className="fa fa-trash-o" />}
            style={styles.button}
          />
        </CardActions>
      </Card>
    );
  }
}

export default EventCard;