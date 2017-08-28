import React, {Component} from 'react';
import logo from './logo.svg';
// import './App.css';
import {connect} from 'react-redux';

import Header from "./components/header";
import Footer from "./components/footer";
import {Link} from 'react-router'
import AddBoardPopup from "./components/addBoardPopup";
import AddBoardForm from "./components/addBoardForm";
import Sidebar from "./components/sidebar";
import './styles/blocks/picto-button.css';
import {setAddBoardPopupStateAction} from './action-creators/app-state';




class App extends Component {
    componentDidMount() {
        document.onkeyup = this.keyUpHandler.bind(this);
    }

    keyUpHandler(e) {
        if (e.keyCode === 27) {
            this.props.closeAddBoardPopup();
        }
    }

    render() {
        return (
            <div className="app__inner">
                <Header/>
                <div className="content">
                    <div className="content__inner">
                        {this.props.children}
                    </div>
                </div>
                <Footer/>
                <AddBoardPopup>
                    <AddBoardForm/>
                </AddBoardPopup>
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
        addBoard: boardName => dispatch({type: 'ADD_BOARD', payload: boardName}),
        closeAddBoardPopup: () => dispatch(setAddBoardPopupStateAction(false))
    })
)(App);
