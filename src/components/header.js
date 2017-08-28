/**
 * Created by user on 13.06.2017.
 */
import React, {Component} from 'react';
import './../styles/blocks/header.css';
import {connect} from 'react-redux';
import {setAddBoardPopupStateAction} from '../action-creators/app-state';
import store from '../store';

import {setSideBarStatusAction, setColorBarStatusAction} from '../action-creators/app-state';


class Header extends Component {
    constructor(props) {
        super(props);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.props.setSidebarStatus(!this.props.sidebarStatus);
    }

    openAddBoardPopup() {
        this.props.openAddBoardPopup();
    }

    render() {
        return (<header className="header">
            <div className="header__inner">
                <div>
                    <button
                        className="picto-button js-open-sidebar"
                        title="Menu"
                        onClick={this.toggleSidebar}
                    >
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </button>
                    <button
                        className="picto-button"
                        onClick={this.openAddBoardPopup.bind(this)}
                        title="Add board"
                    >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                    <a
                        className="picto-button"
                        href="/"
                        title="Board list"
                    >
                        <i className="fa fa-home" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </header>)
    }
}

export default connect(
    state => ({
        sidebarStatus: state.appState.sidebarStatus
    }),
    dispatch => ({
        setSidebarStatus: status => dispatch(setSideBarStatusAction(status)),
        openAddBoardPopup: () => dispatch(setAddBoardPopupStateAction(true))
    })
)(Header);