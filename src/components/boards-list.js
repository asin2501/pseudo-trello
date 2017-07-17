import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import emitter from './emitter';
import '../styles/blocks/board-list.css';
import {hashHistory} from 'react-router';
import {removeBoardAction} from '../action-creators/boards';

// const BoardList = () => {
//     <div>{this.props.boards.map((item) => {
//         return(<div className="{item.id}">{item.name}</div>)
//     })}</div>
// }

class BoardList extends Component {
    addBoardClick() {
        // console.log('try emit addToCartPopupOpen');
        emitter.emit('addToCartPopupOpen');
    }

    move(id, e) {
        hashHistory.push(`/board/${id}`);
    }

    removeBoard(id, e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.removeBoard(id);
    }

    render() {
        return (
            <div className="board-list-container">
                <h1>boards</h1>
                <div className="board-list">
                    {
                        this.props.boards.map((item) => {
                            return (
                                <div key={item.id} className="board-list__item-wrap">
                                    <div onClick={this.move.bind(this, item.id)} className="board-list__item">
                                        <div className="board-list__card">{item.name}</div>
                                        <button onClick={this.removeBoard.bind(this, item.id)}>x</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="board-list__item-wrap">
                        <button className="board-list__add-button" onClick={this.addBoardClick.bind(this)}>Add board
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        boards: state.boards.boardIdList.map((id) => {
            return state.boards.boards[id];
        })
    }),
    dispatch => ({
        //addBoard: boardName => dispatch({type: 'ADD_BOARD', payload: boardName})
        removeBoard: boardID => dispatch(removeBoardAction(boardID))
    })
)(BoardList);