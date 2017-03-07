import React, {Component} from "react";

class Org extends Component {
    render() {
        return (
            <div>
                {this.props.params.org}
            </div>
        );
    }
}

export default Org;