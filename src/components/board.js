/**
 * Created by user on 22.06.2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addColumn} from '../action-creators/columns';
import Column from '../components/column';


class Board extends Component {
    addBoardClickHandler() {
        let columnName = this.addColumnInput.value.trim();
        if (columnName) {
            this.props.addColumn(columnName, this.props.board.id);
            this.addColumnInput.value = '';
        }
    }

    renderColumns() {
        console.log(this.props);
        return this.props.columns.map((item) => {
            <Column/>
        });
    }

    render() {
        return (
            <div className="board">
                <div className="board-name">{this.props.board.name}</div>
                This is board
                <div className="board__inner-wrapper">
                    {this.renderColumns()}
                    <div className="board__column">
                        222
                    </div>
                </div>
                <div>
                    <input type="text" ref={(input) => {
                        this.addColumnInput = input
                    }}/>
                    <button onClick={this.addBoardClickHandler.bind(this)}>add column</button>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state, ownProps) => {
    // console.log(state.boards, ownProps.params.id);
    return {
        board: state.boards.find(board => board.id === +ownProps.params.id),
        // columns: state.boards.filter(item => item.boardId === +ownProps.params.id)
        columns: state.boards
    };
};

export default connect(
    mapStateToProps,
    dispatch => ({
        //addBoard: boardName => dispatch({type: 'ADD_BOARD', payload: boardName})
        addColumn: (boardName, boardID) => {dispatch(addColumn(boardName, boardID))}
    })
)(Board);

