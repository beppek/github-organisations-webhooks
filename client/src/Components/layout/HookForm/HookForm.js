import React, { Component } from "react";
import Checkbox from "material-ui/Checkbox";
import Paper from "material-ui/Paper";
import RaisedButton from 'material-ui/RaisedButton';

class HookForm extends Component {

    constructor() {
        super();
        this.state = {
            events: []
        };
    }

    handleSubmit() {
        if (this.state.events.length === 0) {
            this.setState({
                events: ["push"]
            });
        }
        this.props.onTouchTap(this.state.events);
    }

    handleCheck(e) {
        let selected = e.target.value;
        let found = false;
        this.state.events.forEach((event, i) => {
            if (event === selected) {
                this.setState({
                    events: [...this.state.events.slice(0,i), ...this.state.events.slice(i+1)]
                });
                found = true;
            }
        });
        if (!found) {
            this.setState({
                events: this.state.events.concat([selected])
            });
        }
    }

    render() {
        const style = {
            width: 200,
            textAlign: "left",
            padding: 20,
            margin: "0 auto"
        };
        const buttonStyle = {
            marginTop: 20,
            display: "block"
        };
        return (
            <Paper zDepth={1} style={style}>
                <Checkbox
                    label="Push"
                    onCheck={(e) => this.handleCheck(e)}
                    value="push"
                />
                <Checkbox
                    label="Pull Request"
                    onCheck={(e) => this.handleCheck(e)}
                    value="pull_request"
                />
                <Checkbox
                    label="Release"
                    onCheck={(e) => this.handleCheck(e)}
                    value="release"
                />
                <Checkbox
                    label="Watch"
                    onCheck={(e) => this.handleCheck(e)}
                    value="watch"
                />
                <Checkbox
                    label="Wiki Event"
                    onCheck={(e) => this.handleCheck(e)}
                    value="gollum"
                />
                <Checkbox
                    label="Issues"
                    onCheck={(e) => this.handleCheck(e)}
                    value="issues"
                />
                <Checkbox
                    label="Fork"
                    onCheck={(e) => this.handleCheck(e)}
                    value="fork"
                />
                <RaisedButton style={buttonStyle} label="Create hook" primary={true} onTouchTap={() => this.handleSubmit()} />
            </Paper>
        );
    }
}

export default HookForm;