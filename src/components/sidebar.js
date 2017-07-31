/**
 * Created by User on 31.07.2017.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../styles/blocks/sidebar.css';
import classNames from 'classnames';
import {closeSideBarAction} from '../action-creators/app-state';

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
        console.log('listeners', this.props.status);
        if (this.props.status) {
            document.body.addEventListener('mouseup', this.mouseUpHandler);
        } else {
            document.body.removeEventListener('mouseup', this.mouseUpHandler);
        }
    }

    mouseUpHandler(e) {
        console.log(111);
        this.props.close();
        e.preventDefault();
        e.stopPropagation();
    }

    renderContent() {
        return this.renderFavorites();
    }

    renderFavorites() {
        // console.log(this.props.favoriteBoardList.length);
        if (this.props.favoriteBoardList.length) {
            return (
                <div>
                    <h3>Favorites</h3>
                    {
                        this.props.favoriteBoardList.map(item=><BoardItem title={item.name}/>)
                    }
                </div>
            )
        }else{
            return null;
        }
    }

    render() {

        let sideBarClasses = classNames("sidebar", {"sidebar--opened": this.props.status});
        return (
            <div className={sideBarClasses}>
                <div className="sidebar__inner">
                    <div className="sidebar__scroll-container">
                        <div>
                            <input type="text"/>
                            {this.renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function BoardItem(props) {
    return(
        <div>
            {props.title}
        </div>
    );
}

export default connect(
    (state, ownProps) => {
        let boards = state.boards.boardIdList.map((id) => state.boards.boards[id])
        return {
            boards,
            favoriteBoardList: boards.filter(board => board.favorite),
            status: state.appState.sidebarStatus
        }
    },
    dispatch => ({
        close: () => dispatch(closeSideBarAction())
        //     //addBoard: boardName => dispatch({type: 'ADD_BOARD', payload: boardName})
        //     removeColumn: columnID => dispatch(removeColumnAction(columnID)),
        //     addCard: (columnId, tile) => dispatch(addCardAction(columnId, tile)),
        //     setDraggedColumn: (columnId, x, y, offsetX, offsetY) => dispatch(setDraggedColumn(columnId, x, y, offsetX, offsetY))
    })
)(Sidebar);