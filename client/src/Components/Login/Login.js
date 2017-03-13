import React, { Component } from "react";
import {browserHistory} from "react-router";
import FontIcon from "material-ui/FontIcon";
import {blueGrey500} from "material-ui/styles/colors";
import CircularProgress from "material-ui/CircularProgress";

import firebase from "../../Interfaces/Firebase";

import "./Login.css";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        let loggingIn = localStorage.getItem("loggingIn");
        if (loggingIn) {
            firebase.getRedirectResult().then((result) => {
                this.setState({loading: false});
                localStorage.removeItem("loggingIn");
                firebase.handleLoggedIn(result.user);
                localStorage.setItem("token", result.credential.accessToken);
                localStorage.setItem("username", result.user.displayName);
                localStorage.setItem("uid", result.user.uid);
                browserHistory.push("/");
            })
            .catch((error) => {
                this.setState({loading: false});
                console.log(error);
            });
        } else {
            this.setState({loading: false});
        }
    }

    login() {
        this.setState({
            loading: true
        });
        localStorage.setItem("loggingIn", true);
        firebase.authenticate();
    }

    render() {
        const buttonStyles = {
            fontSize:250,
            color: blueGrey500,
        };
        const divStyles = {
            cursor: "pointer",
            display: "inline-block",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%) translateX(-50%)",
            textAlign: "center"
        };

        return (
            <div className="Login">
                {this.state.loading && <CircularProgress className="startDiv" />}
                {!this.state.loading && <div className="startDiv" style={divStyles} onClick={() => this.login()}>
                    <h1>Start here</h1>
                    <FontIcon
                        className="startBtn fa fa-github-square"
                        style={buttonStyles}
                    />
                </div>}
            </div>
        );
    }

}

export default Login;