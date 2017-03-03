import React, { Component } from "react";
import {browserHistory} from "react-router";
import FontIcon from "material-ui/FontIcon";
import {blueGrey500} from "material-ui/styles/colors";

import IFirebase from "../../Firebase/FirebaseInterface";
const firebase = new IFirebase();

import "./Login.css";

class Login extends Component {

    login() {
        this.setState({
            loading: true
        });
        firebase.authenticate().then((result) => {
            firebase.handleLoggedIn(result);
            localStorage.setItem("token", result.credential.accessToken);
            localStorage.setItem("username", result.user.displayName);
            localStorage.setItem("uid", result.user.uid);
            browserHistory.push("/");
        })
        .catch((error) => {
            console.log(error);
        });
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
                <div className="startDiv" style={divStyles} onClick={() => this.login()}>
                    <h1>Start here</h1>
                    <FontIcon
                        className="startBtn fa fa-github-square"
                        style={buttonStyles}
                    />
                </div>
            </div>
        );
    }

}

export default Login;