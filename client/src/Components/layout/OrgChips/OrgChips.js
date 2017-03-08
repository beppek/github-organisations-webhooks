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
            card: {
                width: 400,
                margin: "0 auto",
                textAlign: "center"
            },
            cardHeader: {
                textAlign: "center"
            }
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
            <Card style={styles.card}>
                <CardHeader
                    title="Organisations"
                    subtitle="These are your organisations on Github"
                    style={styles.cardHeader}
                />
                <CardActions style={styles.wrapper}>
                    {chips}
                </CardActions>
            </Card>
        );
    }
}

export default OrgChips;