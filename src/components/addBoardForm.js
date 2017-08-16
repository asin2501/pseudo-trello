/**
 * Created by 2501 on 26.06.2017.
 */
import React, {Component} from 'react';
import {addBoardAction} from '../action-creators/boards';
import {connect} from 'react-redux';
import emitter from './emitter';

import '../styles/blocks/add-board-form__btnrow.css';

class AddBoardForm extends Component {
    clickHandler() {
        let boardName = this.addBoardInput.value.trim();
        if (boardName) {
            this.props.addBoard(boardName);
            this.addBoardInput.value = '';
        }
    }

    keyUpHandler(e) {
        // if (e.keyCode === 27) {
        //     emitter.emit('closePopups');
        //     // this.setState({addColumnForm: false});
        // }
        if (e.keyCode === 13) {
            this.clickHandler();
        }
    }

    render() {
        return (
            <div className="add-board-form">
                <div className="add-board-form--inner">
                    <input
                        className="input input--bordered "
                        type="text"
                        onKeyUp={this.keyUpHandler.bind(this)}
                        ref={(input) => {
                            this.addBoardInput = input
                        }}/>
                    <div className="add-board-form__btnrow">
                        <button className="btn" onClick={this.clickHandler.bind(this)}>Create board</button>
                    </div>
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