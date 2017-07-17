/**
 * Created by user on 22.06.2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addColumn} from '../action-creators/columns';
import Column from './column';
import classNames from 'classnames';
import DraggedColumn from './dragged-column';

import '../styles/blocks/board.css'
import '../styles/blocks/add-column-form.css'


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {addColumnForm: false};
    }

    addBoardClickHandler() {
        let columnName = this.addColumnInput.value.trim();
        if (columnName) {
            this.props.addColumn(columnName, this.props.board.id);
            this.addColumnInput.value = '';
        }
    }


    renderColumns() {
        return this.props.sortedColumnsIdMap.map((columnId) => {
            return (
                <div key={columnId} className="board__column-wrap">
                    <Column id={columnId}/>
                </div>
            )
        });
    }

    toggleAddCartForm() {
        this.setState({addColumnForm: !this.state.addColumnForm});
    }

    componentDidUpdate() {
        if (this.state.addColumnForm) {
            this.addColumnInput.focus();
        }
    }

    render() {
        let addColumnFormClasses = classNames('board__add-column-form add-column-form', {'add-column-form--showed': this.state.addColumnForm});
        // let addColumnFormClasses = classNames('board__add-column-form add-column-form', 'add-column-form--showed');
        return (
            <div className="board">
                <h2 className="board__name">{this.props.board.name}</h2>
                <div className="board__inner-wrapper">
                    <div className="board__columns">
                        {this.renderColumns()}
                        <div className={addColumnFormClasses}>
                            <span
                                onClick={this.toggleAddCartForm.bind(this)}
                                className="add-column-form__placeholder"
                            >Add column...</span>
                            <div className="add-column-form__inner">
                                <input
                                    className="add-column-form__input"
                                    type="text"
                                    ref={(input) => {
                                        this.addColumnInput = input
                                    }}
                                />
                                <button
                                    className="btn add-column-form_btn"
                                    onClick={this.addBoardClickHandler.bind(this)}
                                >Add column
                                </button>
                                <button onClick={this.toggleAddCartForm.bind(this)}
                                        className="btn-close add-column-form_btn">x
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <DraggedColumn/>
                {this.props.children}
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => {
        let currentBoard = state.boards.boards[ownProps.params.boardId];
        let sortedColumnsIdMap = currentBoard.columns.map(
            columnId => state.columns[columnId]
        ).sort(
            (a, b) => + a.order - b.order
        ).map(
            column=>column.id
        );

        // console.log(sortedColumnsIdMap);

        return {
            board: currentBoard,
            sortedColumnsIdMap: sortedColumnsIdMap
        };
    },
    dispatch => ({
        addColumn: (boardName, boardID) => {
            dispatch(addColumn(boardName, boardID))
        }
    })
)(Board);

