import React, { Component } from "react";
import {browserHistory} from "react-router";
import FontIcon from 'material-ui/FontIcon';
import {blueGrey500} from 'material-ui/styles/colors';

import "./Login.css";

class Login extends Component {

    login() {
        console.log("logging in");
    }

    render() {
        const styles = {
            fontSize:250,
            color: blueGrey500,
            cursor: "pointer"
        };

        return (
            <div className="Login">
                <h1>Begin Here</h1>
                <FontIcon
                    className="fa fa-github-square"
                    style={styles}
                    onClick={() => this.login()}
                />
            </div>
        );
    }

}

export default Login;