/**
 * Created by user on 22.06.2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addColumn} from '../action-creators/columns';
import Column from '../components/column';

import '../styles/blocks/board.css'


class Board extends Component {
    addBoardClickHandler() {
        let columnName = this.addColumnInput.value.trim();
        if (columnName) {
            this.props.addColumn(columnName, this.props.board.id);
            this.addColumnInput.value = '';
        }
    }

    renderColumns() {
        return this.props.columns.map((item) => {
            return (
                <div key={item.id} className="board__columns-wrap">
                    <Column data={item}/>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="board">
                <div className="board-name">{this.props.board.name}</div>
                This is board
                <div className="board__inner-wrapper">
                    <div className="board__columns">
                        {this.renderColumns()}
                    </div>
                </div>
                <div>
                    <input type="text" ref={(input) => {
                        this.addColumnInput = input
                    }}/>
                    <button onClick={this.addBoardClickHandler.bind(this)}>add column</button>
                </div>
                {this.props.children}
            </div>
        );
    }
}

let mapStateToProps = (state, ownProps) => {
    let currentBoard = state.boards.boards[ownProps.params.boardId];
    return {
        board: currentBoard,
        columns: currentBoard.columns.map(columnId => state.columns[columnId])
    };
};

export default connect(
    mapStateToProps,
    dispatch => ({
        //addBoard: boardName => dispatch({type: 'ADD_BOARD', payload: boardName})
        addColumn: (boardName, boardID) => {
            dispatch(addColumn(boardName, boardID))
        }
    })
)(Board);

