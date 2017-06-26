import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import emitter from './emitter';

// const BoardList = () => {
//     <div>{this.props.boards.map((item) => {
//         return(<div className="{item.id}">{item.name}</div>)
//     })}</div>
// }

class BoardList extends Component {
    addBoardClick(){
        // console.log('try emit addToCartPopupOpen');
        emitter.emit('addToCartPopupOpen');
    }
    render() {
        console.log(this.props.boards);
        return (
            <div className="board-list-container">
                <h1>boards</h1>
                <div className="board-list">
                    {
                        this.props.boards.map((item) => {
                            return (
                                <div key={item.id} className="board-list__item">
                                    <Link to={"/board/" + item.id}>
                                        <div className="board-list__card">{item.name}</div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                    <div className="board-list__add-button">
                        <button onClick={this.addBoardClick.bind(this)}>Add board</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({boards: state.boards}),
    dispatch => ({
        //addBoard: boardName => dispatch({type: 'ADD_BOARD', payload: boardName})
    })
)(BoardList);