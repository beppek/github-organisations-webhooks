import React, { Component } from "react";
import { Link } from "react-router";
import {browserHistory} from "react-router";
import FontIcon from "material-ui/FontIcon";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";
import Paper from "material-ui/Paper";
import IFirebase from "../../../Interfaces/Firebase";
import "./Menu.css";

const firebase = new IFirebase();

const homeIcon = <FontIcon className="fa fa-home"/>;
const orgsIcon = <FontIcon className="fa fa-github"/>;
const logoutIcon = <FontIcon className="fa fa-power-off"/>;
const settingsIcon = <FontIcon className="fa fa-sliders"/>;

class Menu extends Component {

    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
        };
    }

    select(index) {
        this.setState({selectedIndex: index});
    }

    signout() {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
        firebase.signout().then(() => {
            browserHistory.push("/login");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <Paper className="Menu" zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Home"
                        icon={homeIcon}
                        onTouchTap={() => this.select(0)}
                        containerElement={<Link to="/"/>}
                    />
                    <BottomNavigationItem
                        label="Organisations"
                        icon={orgsIcon}
                        onTouchTap={() => this.select(1)}
                        containerElement={<Link to="/orgs"/>}
                    />
                    <BottomNavigationItem
                        label="Settings"
                        icon={settingsIcon}
                        onTouchTap={() => this.select(2)}
                        containerElement={<Link to="/settings"/>}
                    />
                    <BottomNavigationItem
                        label="Sign Out"
                        icon={logoutIcon}
                        onTouchTap={() => this.signout()}
                        containerElement={<Link to="/"/>}
                    />
                </BottomNavigation>
            </Paper>
        );
    }

}

export default Menu;