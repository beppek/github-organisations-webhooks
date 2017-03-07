import React, { Component } from "react";
import OrgChips from "../layout/OrgChips/OrgChips";

import Github from "../../Interfaces/Github";

class Home extends Component {

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

    render() {
        return (
            <div>
                <OrgChips orgs={this.state.orgs} />
            </div>
        );
    }
}

export default Home;