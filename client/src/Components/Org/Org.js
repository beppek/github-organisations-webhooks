import React, {Component} from "react";
import Github from "../../Interfaces/Github";
import CircularProgress from "material-ui/CircularProgress";
import HookForm from "../layout/HookForm/HookForm";
import HookInfo from "../layout/HookInfo/HookInfo";
import firebase from "../../Interfaces/Firebase";

class Org extends Component {

    constructor(props) {
        super();
        this.state = {
            admin: false,
            hooks: false,
            loading: true,
            subs: []
        };
        this.uid = localStorage.getItem("uid");
        this.org = props.params.org;
        this.token = localStorage.getItem("token");
    }

    componentWillMount() {
        let promises = [];
        promises.push(new Promise((resolve, reject) => {
            Github.getHooks(this.org, this.token).then((data) => {
                this.setState({
                    admin: true
                });
                if (data.body.length > 0) {
                    this.setState({
                        hooks: true,
                        hookData: data.body
                    });
                }
                resolve();
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    admin: false,
                    loading: false
                });
            });
        }));
        promises.push(new Promise((resolve, reject) => {
            firebase.getData(`users/${this.uid}/subscriptions/${this.org}/events`, (data) => {
                this.setState({
                    subs: data
                });
                resolve();
            });
        }));
        return Promise.all(promises).then(() => {
            this.setState({
                loading: false
            });
        });
    }

    componentWillUnmount() {
        firebase.detach(`users/${this.uid}/subscriptions/${this.org}/events`);
    }

    handleDelete(hookId) {
        Github.deleteHook(this.org, hookId, this.token).then(() => {
            firebase.getToken().then((token) => {
                firebase.deleteHook(this.org, token).then(() => {
                    this.setState({hooks: false});
                })
                .catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });

    }

    handleSave(events) {
        firebase.update(`users/${this.uid}/subscriptions/${this.org}/events`, events).then(() => {
            this.setState({
                subs: events
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleTouchTap(events) {
        Github.createHook(this.org, this.token, events).then((data) => {
            firebase.addHook(this.org, {id: data.body.id, events: data.body.events, subscribers:[this.uid]}, this.uid);
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
                {!this.state.hooks && !this.state.loading && this.state.admin &&
                    <HookForm onTouchTap={(events) => this.handleTouchTap(events)} />
                }
                {this.state.hooks && !this.state.loading &&
                    <HookInfo
                        subs={this.state.subs}
                        admin={this.state.admin}
                        hooks={this.state.hookData}
                        handleDelete={(hookId) => this.handleDelete(hookId)}
                        handleSave={(events) => this.handleSave(events)}
                    />
                }
                {!this.state.admin && !this.state.loading && !this.state.hooks &&
                    <p>There are no hooks available for this repo. Ask the admin to register a hook through this app</p>
                }
            </div>
        );
    }
}

export default Org;