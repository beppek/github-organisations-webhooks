import React, {Component} from "react";
import {browserHistory} from "react-router";
import Github from "../../Interfaces/Github";
import CircularProgress from "material-ui/CircularProgress";
import HookForm from "../layout/HookForm/HookForm";
import HookInfo from "../layout/HookInfo/HookInfo";
import FirebaseInterface from "../../Interfaces/Firebase";
const firebase = new FirebaseInterface();

class Org extends Component {

    constructor() {
        super();
        this.state = {
            admin: false,
            hooks: false,
            loading: true
        };
    }

    componentWillMount() {
        let token = localStorage.getItem("token");
        let org = this.props.params.org;
        Github.getHooks(org, token).then((data) => {
            this.setState({
                admin: true,
                loading: false
            });
            if (data.body.length > 0) {
                this.setState({
                    hooks: true,
                    hookData: data.body
                });
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({
                admin: false,
                loading: false
            });
        });
    }

    handleTouchTap(events) {
        let token = localStorage.getItem("token");
        let org = this.props.params.org;
        Github.createHook(org, token, events).then((data) => {
            firebase.addHook(org, data.body);
            this.setState({
                hooks: true,
                hookData: [data.body]
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                {this.props.params.org}
                {this.state.loading && <CircularProgress />}
                {!this.state.hooks && !this.state.loading && this.state.admin && <HookForm onTouchTap={(events) => this.handleTouchTap(events)} />}
                {this.state.hooks && !this.state.loading && <HookInfo hooks={this.state.hookData} />}
                {!this.state.admin && !this.state.loading && !this.state.hooks && <p>There are no hooks available for this repo. Ask the admin to register a hook through this app</p>}
            </div>
        );
    }
}

export default Org;