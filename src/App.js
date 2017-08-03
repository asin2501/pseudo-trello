import React, {Component} from 'react';
import logo from './logo.svg';
// import './App.css';
import {connect} from 'react-redux';

import Header from "./components/header";
import Footer from "./components/footer";
import { Link } from 'react-router'
import Popup from "./components/popup";
import AddBoardForm from "./components/addBoardForm";
import Sidebar from "./components/sidebar";

import './styles/blocks/picto-button.css';

const addBoardPopupProps = {
    header: 'Add board',
    openEvent: 'addToCartPopupOpen'
};

class App extends Component {
    render() {
        // console.log(this.props);
        return (
            <div className="app__inner">
                <Header/>
                {/*<input ref="input" type="text"/>*/}
                {/*<button onClick={this.clickHandler.bind(this)}>Add</button>*/}
                {/*<div>{*/}
                    {/*this.props.state.boards.map((board, index) => <span key={index}>{board.name}</span>)*/}
                {/*}</div>*/}
                <div className="content">
                    <div className="content__inner">
                        {this.props.children}
                    </div>
                </div>
                <Footer/>
                <Popup settings={addBoardPopupProps}>
                    <AddBoardForm/>
                </Popup>
                <Sidebar/>

            </div>
        );
    }

    clickHandler() {
        this.props.addBoard(this.refs.input.value);
        this.refs.input.value = '';
    }
}

//export default App;
export default connect(
    state => ({state: state}),
    dispatch => ({
        addBoard: boardName => dispatch({type:'ADD_BOARD', payload: boardName}),
    })
)(App);
