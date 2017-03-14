import React, {Component} from "react";
import Github from "../../Interfaces/Github";
import CircularProgress from "material-ui/CircularProgress";
import HookForm from "../layout/HookForm/HookForm";
import HookInfo from "../layout/HookInfo/HookInfo";
import firebase from "../../Interfaces/Firebase";

import Notification from "../layout/Notification/Notification";

class Org extends Component {

    constructor(props) {
        super();
        this.state = {
            admin: false,
            hooks: false,
            loading: true,
            subs: [],
            listeners: []
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
                let hookRef = `orgs/${this.org}/hook/events`;
                this.setState({
                    listeners: this.state.listeners.concat([hookRef])
                });
                firebase.getData(hookRef, (data) => {
                    if (data.length < 1) {
                        this.setState({
                            admin: false
                        });
                    } else {
                        this.setState({
                            admin: false,
                            hooks: true,
                            hookData: [{events: data}]
                        });
                    }
                    resolve();
                });
            });
        }));
        promises.push(new Promise((resolve, reject) => {
            let subsRef = `users/${this.uid}/subscriptions/${this.org}/events`;
            this.setState({
                listeners: this.state.listeners.concat([subsRef])
            });
            firebase.getData(subsRef, (data) => {
                this.setState({
                    subs: data
                });
                resolve();
            });
        }));

        return Promise.all(promises).then(() => {
            this.setState({loading: false});
        });
    }

    componentWillUnmount() {
        this.state.listeners.forEach((listener) => {
            firebase.detach(listener);
        });
    }

    handleDelete(hookId) {
        Github.deleteHook(this.org, hookId, this.token).then(() => {
            firebase.getToken().then((token) => {
                firebase.deleteHook(this.org, token);
            })
            .catch((error) => {
                console.log(error);
                this.setState({hooks: true});
            });
        })
        .catch((error) => {
            console.log(error);
            this.setState({hooks: true});
        });
        this.setState({hooks: false});

    }

    handleSave(events) {
        firebase.addSubscriber(this.org, this.uid);
        firebase.update(`users/${this.uid}/subscriptions/${this.org}/events`, events).then(() => {
            this.setState({
                subs: events,
                loading: false
            });
        })
        .catch((error) => {
            console.log(error);
            this.setState({loading: false});
        });
        this.setState({loading: true});
    }

    handleTouchTap(events) {
        Github.createHook(this.org, this.token, events).then((data) => {
            firebase.addHook(this.org, {id: data.body.id, events: data.body.events}, this.uid);
            firebase.addSubscriber(this.org, this.uid);
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
                {this.state.loading && <CircularProgress />}
                {!this.state.hooks && !this.state.loading && this.state.admin &&
                    <HookForm onTouchTap={(events) => this.handleTouchTap(events)} />
                }
                {this.state.hooks && !this.state.loading &&
                    <HookInfo
                        org={this.props.params.org}
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
                <Notification />
            </div>
        );
    }
}

export default Org;