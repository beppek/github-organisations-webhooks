import React, { Component } from "react";
import Toggle from "material-ui/Toggle";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";

class HookInfo extends Component {
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
                display: "block"
            }
        };
        let toggles = [];
        this.props.hooks.forEach(function(hook) {
            hook.events.forEach(function(event, i) {
                toggles.push(
                    <Toggle
                        label={event}
                        defaultToggled={true}
                        key={event}
                        style={styles.toggle}
                    />
                );
                if (i < hook.events.length -1) {
                    toggles.push(<Divider key={i} />);
                }
            });
        });
        return (
            <Paper style={styles.paper} zDepth={1}>
                {toggles}
                <RaisedButton
                    label="Subscribe"
                    primary={true}
                    style={styles.button}
                    icon={<FontIcon className="fa fa-arrow-right" />}
                />
            </Paper>
        );
    }
}

export default HookInfo;