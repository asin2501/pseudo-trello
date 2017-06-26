/**
 * Created by user on 22.06.2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addColumn} from '../action-creators/columns';


class Board extends Component {
    addBoardClickHandler(){

    }
    render() {
        return (
            <div className="board">
                <div className="board-name">{this.props.board.name}</div>
                This is board
                <div className="board__inner-wrapper">
                    <div className="board__column">
                        222
                    </div>
                </div>
                <button onClick={this.addBoardClickHandler.bind(this)}>add board</button>
            </div>
        );
    }
}

let mapStateToProps = (state, ownProps) => {
    // console.log(state.boards, ownProps.params.id);
    return {board: state.boards.find(board => board.id === +ownProps.params.id)};
};

export default connect(
    mapStateToProps,
    dispatch => ({
        //addBoard: boardName => dispatch({type: 'ADD_BOARD', payload: boardName})
        addColumn: boardName => dispatch(addColumn('someColumn'))
    })
)(Board);

