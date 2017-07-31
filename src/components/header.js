/**
 * Created by user on 13.06.2017.
 */
import React, {Component} from 'react';
import './../styles/blocks/header.css';
import emitter from './emitter';
import {connect} from 'react-redux';


class Header extends Component {
    openAddBoardPopup(){
        emitter.emit('addToCartPopupOpen');
    }
    render() {
        return (<header className="header">
            <div className="header__inner">
                <button className="picto-button">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button>
                <button className="picto-button" onClick={this.openAddBoardPopup.bind(this)}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
                <a className="picto-button" href="/">
                    <i className="fa fa-home" aria-hidden="true"></i>
                </a>
            </div>
        </header>)
    }
}

//export default App;
export default Header;