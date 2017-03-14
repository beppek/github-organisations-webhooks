import React, { Component } from "react";
import Toggle from "material-ui/Toggle";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";

class HookInfo extends Component {

    componentWillMount() {
        this.setState({subs:this.props.subs});
    }

    handleDelete() {
        let id = this.props.hooks[0].id;
        this.props.handleDelete(id);
    }

    handleSave() {
        this.props.handleSave(this.state.subs);
    }

    handleToggle(eventType) {
        let index = this.state.subs.indexOf(eventType);
        if (index > -1) {
            this.setState({
                subs: [...this.state.subs.slice(0,index), ...this.state.subs.slice(index+1)]
            });
        } else {
            this.setState({
                subs: this.state.subs.concat([eventType])
            });
        }
    }

    render() {
        let styles = {
            paper: {
                width: 300,
                margin: "0 auto",
                textAlign: "left"
            },
            toggle: {
                margin: "0 auto",
                padding: "10px 20px",
                width: 200
            },
            button: {
                margin: "0 auto",
                display: "block",
            },
            delete: {
                position: "relative",
            },
            org: {
                float: "right",
                marginRight: "20px",
                fontSize: "18px"
            }
        };
        let toggles = [];
        this.props.hooks.forEach((hook) => {
            hook.events.forEach((eventType, i) => {
                var eventName;
                switch (eventType) {
                    case "gollum":
                        eventName = "Wiki pages";
                        break;
                    case "pull_request":
                        eventName = "Pull request";
                        break;
                    default:
                        eventName = eventType[0].toUpperCase() + eventType.slice(1);
                        break;
                }
                let toggled = this.state.subs.indexOf(eventType) > -1;
                toggles.push(
                    <Toggle
                        label={eventName}
                        defaultToggled={toggled}
                        key={eventType}
                        style={styles.toggle}
                        onToggle={() => this.handleToggle(eventType)}
                    />
                );
                if (i < hook.events.length -1) {
                    toggles.push(<Divider key={i} />);
                }
            });
        });
        return (
            <Paper style={styles.paper} zDepth={1}>
                {this.props.admin &&
                    <RaisedButton
                        label="Delete"
                        secondary={true}
                        style={styles.delete}
                        icon={<FontIcon className="fa fa-trash-o" />}
                        onTouchTap={() => this.handleDelete()}
                    />
                }
                <h3 style={styles.org}>{this.props.org}</h3>
                {toggles}
                <RaisedButton
                    label="Save"
                    primary={true}
                    style={styles.button}
                    icon={<FontIcon className="fa fa-floppy-o" />}
                    onTouchTap={() => this.handleSave()}
                />
            </Paper>
        );
    }
}

export default HookInfo;