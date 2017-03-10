import React, { Component } from "react";
import { Link } from "react-router";
import {browserHistory} from "react-router";
import FontIcon from "material-ui/FontIcon";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";
import Paper from "material-ui/Paper";

import "./Menu.css";

const homeIcon = <FontIcon className="fa fa-home"/>;
const orgsIcon = <FontIcon className="fa fa-github"/>;
const backIcon = <FontIcon className="fa fa-arrow-left"/>;

class Menu extends Component {

    constructor(props) {
        super();
        this.state = {
            selectedIndex: 1,
        };
    }

    select(index) {
        this.setState({selectedIndex: index});
    }

    render() {
        return (
            <Paper className="Menu" zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Go Back"
                        icon={backIcon}
                        onTouchTap={browserHistory.goBack}
                    />
                    <BottomNavigationItem
                        label="Home"
                        icon={homeIcon}
                        onTouchTap={() => this.select(1)}
                        containerElement={<Link to="/"/>}
                    />
                    <BottomNavigationItem
                        label="Organisations"
                        icon={orgsIcon}
                        onTouchTap={() => this.select(2)}
                        containerElement={<Link to="/orgs"/>}
                    />
                </BottomNavigation>
            </Paper>
        );
    }

}

export default Menu;