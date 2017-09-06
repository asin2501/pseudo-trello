import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import '../styles/blocks/board-list.css';
import {hashHistory} from 'react-router';
import {setAddBoardPopupStateAction} from '../action-creators/app-state';
import {removeBoardAction} from '../action-creators/boards';


class BoardList extends Component {
    addBoardClick() {
        this.props.openAddBoardPopup();
    }

    move(id, e) {
        hashHistory.push(`/board/${id}`);
    }

    removeBoard(id, e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.removeBoard(id);
    }

    renderBoards(boardsList) {
        return boardsList.map((item) => {
            return (
                <div key={item.id} className="board-list__item-wrap">
                    <div onClick={this.move.bind(this, item.id)} className="board-list__item">
                        <div className="board-list__card">{item.name}</div>
                        <button className="btn-remove board-list__close" onClick={this.removeBoard.bind(this, item.id)}>x</button>
                    </div>
                </div>
            )
        })
    }

    renderFavorites() {
        // let favoriteBoardList = this.props.boards.filter(board => board.favorite);
        if (this.props.favoriteBoardList.length) {
            return (
                <div>
                    <h2 className="board-list-container__title">Favorite boards</h2>
                    <div className="board-list">
                        {this.renderBoards(this.props.favoriteBoardList)}
                    </div>
                </div>
            )
        } else {
            return null;
        }

    }

    render() {

        // let notfavoriteBoardList = this.props.boards.filter(board => !board.favorite);
        return (
            <div className="board-list-container">
                {this.renderFavorites() }

                <h2 className="board-list-container__title">All boards</h2>
                <div className="board-list">
                    {
                        this.renderBoards(this.props.notfavoriteBoardList)
                    }
                    <div className="board-list__item-wrap">
                        <button className="board-list__add-button" onClick={this.addBoardClick.bind(this)}>Add board</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        let boards = state.boards.boardIdList.map((id) => state.boards.boards[id]);
        return {
            boards,
            favoriteBoardList: boards.filter(board => board.favorite),
            notfavoriteBoardList: boards.filter(board => !board.favorite),

        }
    },
    dispatch => ({
        //addBoard: boardName => dispatch({type: 'ADD_BOARD', payload: boardName})
        removeBoard: boardID => dispatch(removeBoardAction(boardID)),
        openAddBoardPopup: () => dispatch(setAddBoardPopupStateAction(true))
    })
)(BoardList);