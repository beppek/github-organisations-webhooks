import React, { Component } from "react";
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

class OrgChips extends Component {

    handleTouchTap(org) {
        console.log(`clicked ${org}`);
    }

    render() {
        const styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
        let chips = [];
        if (this.props.orgs.length > 0) {
                this.props.orgs.forEach(function(org) {
                    console.log(org);
                    chips.push(
                        <Chip
                            key={org.login}
                            onTouchTap={() => this.handleTouchTap(org.login)}
                            style={styles.chip}
                            >
                            <Avatar src={org.avatar_url} />
                            {org.login}
                        </Chip>
                    );
                }, this);
        } else {
            chips.push(<p key="nothing">nothing to show</p>);
        }

        return (
            <div>
                {chips}
            </div>
        );
    }
}

export default OrgChips;