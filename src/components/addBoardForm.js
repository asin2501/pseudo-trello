/**
 * Created by 2501 on 26.06.2017.
 */
import React, {Component} from 'react';
import {addBoardAction} from '../action-creators/boards';
import {connect} from 'react-redux';
import store from '../store';
import {hashHistory} from 'react-router';
import {setAddBoardPopupStateAction} from '../action-creators/app-state';

import '../styles/blocks/add-board-form__btnrow.css';

class AddBoardForm extends Component {
    clickHandler() {
        let boardName = this.addBoardInput.value.trim();
        if (boardName) {
            let oldBoardsIdList = store.getState().boards.boardIdList;
            this.props.addBoard(boardName);
            let newBoardsIdList = store.getState().boards.boardIdList;
            let newBoardId = newBoardsIdList.filter(item => !oldBoardsIdList.includes(item))[0];
            this.addBoardInput.value = '';
            hashHistory.push(`/board/${newBoardId}`);
            this.props.closePopup();
        }
    }

    keyUpHandler(e) {
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
        addBoard: boardName => dispatch(addBoardAction(boardName)),
        closePopup: state => dispatch(setAddBoardPopupStateAction(false))
    })
)(AddBoardForm);