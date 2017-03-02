import React, { Component } from "react";
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const homeIcon = <FontIcon className="fa fa-home"/>;
const orgsIcon = <FontIcon className="fa fa-github"/>;

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

    render() {
        return (
            <Paper zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Home"
                        icon={homeIcon}
                        onTouchTap={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="Organisations"
                        icon={orgsIcon}
                        onTouchTap={() => this.select(1)}
                    />
                </BottomNavigation>
            </Paper>
        );
    }

}

export default Menu;