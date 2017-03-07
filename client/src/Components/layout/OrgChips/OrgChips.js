import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import {Card, CardActions, CardHeader} from "material-ui/Card";

class OrgChips extends Component {

    handleTouchTap(org) {
        this.props.onTouchTap(org);
    }

    render() {
        const styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: "flex",
                flexWrap: "wrap",
            },
        };
        let chips = [];
        if (this.props.orgs.length > 0) {
                this.props.orgs.forEach(function(org) {
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
            <Card>
                <CardHeader
                    title="Organisations"
                    subtitle="These are your organisations on Github"
                />
                <CardActions>
                    {chips}
                </CardActions>
            </Card>
        );
    }
}

export default OrgChips;