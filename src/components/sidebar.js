/**
 * Created by User on 31.07.2017.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import insideClassName from '../utils/inside-class-name';
import {setFavoriteStatusAction} from '../action-creators/boards';
import {closeSideBarAction, changeSearchTextAction} from '../action-creators/app-state';
import '../styles/blocks/sidebar.css';
import '../styles/blocks/board-item.css';
import {hashHistory} from 'react-router';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }

    componentDidMount() {
        this.setHandler();
    }

    componentDidUpdate() {
        this.setHandler();
    }

    setHandler() {
        //todo: add or remove listener
        // console.log('listeners', this.props.status);
        if (this.props.status) {
            document.body.addEventListener('mouseup', this.mouseUpHandler);
        } else {
            document.body.removeEventListener('mouseup', this.mouseUpHandler);
        }
    }

    mouseUpHandler(e) {
        let target = e.target;
        let isInsideClass = insideClassName(target, 'sidebar');

        if (!isInsideClass && target.className.indexOf('sidebar') === -1) {
            this.props.close();
            e.preventDefault();
            e.stopPropagation();
        }
    }

    inputHandler() {
        this.props.setSearchText(this.searchInput.value);
    }

    renderSearchResult() {
        let serchResult = this.props.boards.filter(board => board.name.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1);

        if (serchResult.length) {
            return this.renderBoardsSet(serchResult);
        } else {
            return (
                <div className="empty-results">
                    any boards was not found
                </div>
            );

        }
    }

    renderContent() {
        if (this.props.searchText) {
            return this.renderSearchResult();
        } else {
            return (
                <div>
                    {this.renderFavorites()}
                    {this.renderAllBoards()}
                </div>
            )
        }
    }

    renderFavorites() {
        if (this.props.favoriteBoardList.length) {
            return (
                <div className="sidebar__item">
                    <h4 className="sidebar__title">Favorites <i className="fa fa-star-o"></i></h4>
                    {this.renderBoardsSet(this.props.favoriteBoardList)}
                </div>
            )
        } else {
            return null;
        }
    }

    renderAllBoards() {
        return (
            <div className="sidebar__item">
                <h4 className="sidebar__title">All boards</h4>
                {this.renderBoardsSet(this.props.allBoardList)}
            </div>
        )
    }

    renderBoardsSet(boards) {
        return boards.map(item => {
            return <BoardItem
                key={item.id}
                data={item}
                setFavorite={this.props.setFavorite.bind(this, item.id, item.favorite)}
                movTo={()=>{
                    hashHistory.push(`/board/${item.id}`);
                    this.props.close();
                }}
            />
        })
    }

    render() {
        let sideBarClasses = classNames("sidebar", {"sidebar--opened": this.props.status});
        let inputClasses = classNames("sidebar__input", {"sidebar__input--active": !!this.props.searchText});
        return (
            <div className={sideBarClasses}>
                <div className="sidebar__inner">
                    <div className="sidebar__scroll-container">
                        <input
                            type="text"
                            className={inputClasses}
                            ref={(input) => {
                                this.searchInput = input
                            }}
                            onInput={this.inputHandler.bind(this)}
                        />
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

function BoardItem(props) {
    let style = {
        backgroundColor: props.data.color
    };

    let starClasses = classNames("fa", {"fa-star-o": !props.data.favorite, "fa-star": props.data.favorite});

    return (
        <div
            className="board-item"
             key={props.data.id}
             style={style}
             onClick={props.movTo}
        >
            <div className="board-item__inner">
                {props.data.name}
                <div className="board-item__controls">
                    <i
                        onClick={props.setFavorite}
                        className={starClasses}
                    >
                    </i>
                </div>
            </div>
        </div>
    );
}

export default connect(
    (state, ownProps) => {
        let boards = state.boards.boardIdList.map((id) => state.boards.boards[id])
        return {
            boards,
            searchText: state.appState.searchText,
            favoriteBoardList: boards.filter(board => board.favorite),
            allBoardList: boards.slice(0, 10),
            status: state.appState.sidebarStatus
        }
    },
    dispatch => ({
        close: () => dispatch(closeSideBarAction()),
        setFavorite: (boardId, status) => dispatch(setFavoriteStatusAction(boardId, status)),
        setSearchText: (text) => dispatch(changeSearchTextAction(text))
        //     //addBoard: boardName => dispatch({type: 'ADD_BOARD', payload: boardName})
        //     removeColumn: columnID => dispatch(removeColumnAction(columnID)),
        //     addCard: (columnId, tile) => dispatch(addCardAction(columnId, tile)),
        //     setDraggedColumn: (columnId, x, y, offsetX, offsetY) => dispatch(setDraggedColumn(columnId, x, y, offsetX, offsetY))
    })
)(Sidebar);