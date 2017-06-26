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
        return (<header className="header">header
            <button onClick={this.openAddBoardPopup.bind(this)}>add board</button>
        </header>)
    }
}

//export default App;
export default Header;