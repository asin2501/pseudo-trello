/**
 * Created by 2501 on 26.06.2017.
 */
import React, {Component} from 'react';
import {addBoardAction} from '../action-creators/boards';
import {connect} from 'react-redux';


class AddBoardForm extends Component {
    clickHandler() {
        let boardName = this.addBoardInput.value.trim();
        if (boardName) {
            this.props.addBoard(boardName);
            this.addBoardInput.value = '';
        }
    }

    render() {
        return (
            <div className="add-board-form">
                <div className="add-board-form--inner">
                    <input type="text" ref={(input) => {
                        this.addBoardInput = input
                    }}/>
                    <button onClick={this.clickHandler.bind(this)}>Create board</button>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => ({
        addBoard: boardName => dispatch(addBoardAction(boardName))
    })
)(AddBoardForm);