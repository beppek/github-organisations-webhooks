import React, { Component } from "react";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import FlatButton from "material-ui/FlatButton";
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
      },
      img: {
        height: "100%",
        verticalAlign: "middle"
      }
    };
    return (
      <Card style={styles.card}>
        <CardHeader
          title={`${this.props.event.sender.login} ${this.props.event.action} ${this.props.event.eventType} event`}
          subtitle={`in ${this.props.event.organization.login}/${this.props.event.repository.name}`}
          avatar={this.props.event.sender.avatar_url}
        />
        <CardText style={styles.img}>
          <Avatar style={styles.img} src={this.props.event.organization.avatar_url} />
          <FlatButton
            label={`Go to the repo`}
            href={this.props.event.repository.html_url}
            primary={true}
            icon={<FontIcon className="fa fa-arrow-right" />}
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