import React, { Component } from "react";
import OrgChips from "../layout/OrgChips/OrgChips";
import {browserHistory} from "react-router";

import Github from "../../Interfaces/Github";

class Orgs extends Component {

    constructor() {
        super();
        this.state = {
            orgs: []
        };
    }

    componentWillMount() {
        let token = localStorage.getItem("token");
        let uid = localStorage.getItem("uid");
        Github.getOrgs(token).then((result) => {
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
            </div>
        );
    }
}

export default Orgs;