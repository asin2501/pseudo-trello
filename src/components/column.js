/**
 * Created by user on 22.06.2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class Column extends Component {
    render() {
        return (
            <div>111</div>
        )
    }
}

export default connect(
    (state, ownProps) => {
        // console.log(state, ownProps);
    }
)
(Column);