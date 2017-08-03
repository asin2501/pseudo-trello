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
import Colorbar from "./colorbar";
// import ReactScrollbar from 'react-scrollbar-js';
// import ScrollArea from 'react-scrollbar';
import {Scrollbars} from 'react-custom-scrollbars';
import {setFavoriteStatusAction} from '../action-creators/boards';

import columnCords from '../utils/column-cords';

import '../styles/blocks/scroll-component.css';
import '../styles/blocks/board.css'
import '../styles/blocks/favorite-toggler.css'
import '../styles/blocks/add-column-form.css'


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {addColumnForm: false};
    }

    componentWillUnmount() {
        columnCords.reset();
        console.log(columnCords);
    }

    addBoardClickHandler() {
        let columnName = this.addColumnInput.value.trim();
        if (columnName) {
            this.props.addColumn(columnName, this.props.data.id);
            this.addColumnInput.value = '';
        }
    }

    xomponentWillUnmount() {

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
        let favoriteIconClasses = classNames('fa', {'fa-star-o': !this.props.data.favorite, 'fa-star': this.props.data.favorite});
        // let addColumnFormClasses = classNames('board__add-column-form add-column-form', 'add-column-form--showed');

        const boardColumnsStyle = {
            width: 310 * (this.props.data.columns.length + 1) + 10,
        };

        let style = {backgroundColor: this.props.data.color};

        return (
            <div className="board" style={style}>
                <div className="board__head">
                    <h2 className="board__name">{this.props.data.name}</h2>
                    <button
                        onClick={this.props.setFavoriteStatus.bind(this, this.props.data.id, !this.props.data.favorite)}
                        className="board__favorite favorite-toggler">
                        <i className={favoriteIconClasses}></i>
                    </button>
                </div>
                <Scrollbars style={{width: '100%', height: 'calc(100vh - 150px)'}}>
                    <div className="board__columns" style={boardColumnsStyle}>
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
                <DraggedColumn/>
                <DraggedCard/>
                <Colorbar boardId={this.props.data.id}/>
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
            data: currentBoard,
            sortedColumnsIdMap: sortedColumnsIdMap
        };
    },
    dispatch => ({
        addColumn: (boardName, boardID) => {
            dispatch(addColumn(boardName, boardID))
        },
        setFavoriteStatus: (boardId) => {
            dispatch(setFavoriteStatusAction(boardId));
        }
    })
)(Board);

