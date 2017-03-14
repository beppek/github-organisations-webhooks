import React, { Component } from "react";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";

class EventCard extends Component {

  handleDelete() {
    this.props.handleDelete(this.props.event);
  }

  getEventType(eventType) {
    switch (eventType) {
      case "gollum":
        return "wiki pages";
      case "pull_request":
        return "pull request";

      default:
        return eventType;
    }
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
      cardHeader: {
        paddingRight: "0!important",
      },
      button: {
        zIndex: 0
      },
      img: {
        verticalAlign: "middle"
      },
      cardText: {
        height: "100%",
        verticalAlign: "middle"
      }
    };
    let eventType = this.getEventType(this.props.event.eventType);
    return (
      <Card style={styles.card}>
        <CardHeader
          title={`${this.props.event.sender.login} ${this.props.event.action} ${eventType} event`}
          subtitle={`in ${this.props.event.organization.login}/${this.props.event.repository.name}`}
          avatar={this.props.event.sender.avatar_url}
          textStyle={styles.cardHeader}
        />
        <CardText style={styles.cardText}>
          <Avatar style={styles.img} src={this.props.event.organization.avatar_url} />
          <FlatButton
            label={"Go to the repo"}
            href={this.props.event.repository.html_url}
            primary={true}
            icon={<FontIcon className="fa fa-arrow-right" />}
            style={styles.button}
          />
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