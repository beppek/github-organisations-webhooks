import React, { Component } from "react";
import firebase from "../../Interfaces/Firebase";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            loading: true
        };
        this.uid = localStorage.getItem("uid");
    }

    componentWillMount() {
        let subsRef = `users/${this.uid}/subscriptions`;
        firebase.getData(subsRef, (subs) => {
            console.log(subs);
        });
    }

    render() {
        return (
            <div>
                This is where your event flow will show up!
            </div>
        );
    }
}

export default Home;
