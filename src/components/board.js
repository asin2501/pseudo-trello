/**
 * Created by user on 22.06.2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addColumn} from '../action-creators/columns';
import Column from './column';
import classNames from 'classnames';
import DraggedColumn from './dragged-column';
import DraggedCard from './dragged-card';
// import ReactScrollbar from 'react-scrollbar-js';
// import ScrollArea from 'react-scrollbar';
import { Scrollbars } from 'react-custom-scrollbars';


import '../styles/blocks/scroll-component.css';
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

    componentDidUpdate(prevProps, prevState) {
        if (this.state.addColumnForm) {
            this.addColumnInput.focus();
        }
        // if(prevProps.sortedColumnsIdMap.length !== this.props.sortedColumnsIdMap.length){
        //     this.scrollBar.scrollArea.refresh();
        //     console.log('-------------------');
        //     // console.log(            this.scrollBar.scrollArea.refresh()
        //     // );
        // }
    }

    render() {
        // console.log(222);
        let addColumnFormClasses = classNames('board__add-column-form add-column-form', {'add-column-form--showed': this.state.addColumnForm});
        // let addColumnFormClasses = classNames('board__add-column-form add-column-form', 'add-column-form--showed');
        const scrollbarStyle = {
            width: '100%',
        };

        const boardColumnsStyle = {
            width: 310 * (this.props.board.columns.length + 1),
        };

        return (
            <div className="board">
                <h2 className="board__name">{this.props.board.name}</h2>
                {/*<ReactScrollbar className="scroll-component" style={scrollbarStyle}>*/}
                {/*<ScrollArea ref={(item) => { this.scrollBar = item }} contentStyle={boardColumnsStyle}>*/}
                <Scrollbars style={{width:'100%', height:'calc(100vh - 150px)'}}>
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
                                <div>
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
                </Scrollbars>
                {/*</ScrollArea>*/}
                {/*</ReactScrollbar>*/}
                <DraggedColumn/>
                <DraggedCard/>
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
            (a, b) => +a.order - b.order
        ).map(
            column => column.id
        );

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

