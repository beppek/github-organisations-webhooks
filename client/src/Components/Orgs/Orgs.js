import React, { Component } from "react";
import OrgChips from "../layout/OrgChips/OrgChips";
import {browserHistory} from "react-router";
import firebase from "../../Interfaces/Firebase";

import Notification from "../layout/Notification/Notification";

import Github from "../../Interfaces/Github";

class Orgs extends Component {

    constructor() {
        super();
        this.state = {
            orgs: [],
            listeners: []
        };
    }

    componentWillMount() {
        let token = localStorage.getItem("token");
        Github.getOrgs(token).then((result) => {
            result.body.forEach((org) => {
                let orgData = {name: org.login, url: org.url};
                firebase.saveIfNotExists(`orgs/${org.login}`, orgData).then(() => {
                })
                .catch((err) => {
                    console.log(err);
                });
            });
            this.setState({
                orgs: result.body
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleTouchTap(org) {
        browserHistory.push(`/org/${org}`);
    }

    render() {
        return (
            <div>
                <OrgChips onTouchTap={(org) => this.handleTouchTap(org)} orgs={this.state.orgs} />
                <Notification />
            </div>
        );
    }
}

export default Orgs;