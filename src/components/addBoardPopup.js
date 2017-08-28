/**
 * Created by 2501 on 22.06.2017.
 */
import React, {Component} from 'react';
import '../styles/blocks/popup.css';
import classNames from 'classnames';
import {setAddBoardPopupStateAction} from '../action-creators/app-state';
import {connect} from 'react-redux';

class addBoardPopup extends Component {
    close(){
        this.props.setPopupState(false);
    }

    render() {

        let popupClasses = classNames("popup", {"popup--showed":this.props.state});

        return (
            <div className={popupClasses}>
                <div className="popup__conteiner popup__conteiner--small">
                    <div className="popup__header">
                        <h3 className="popup__title">Add board</h3>
                        <button  className="btn-close popup__btn-close" onClick={this.close.bind(this)}>x</button>
                    </div>
                    <div className="popup__content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

// export default addBoardPopup;


export default connect(
    state => ({state:state.appState.addBoardPopupOpened}),
    dispatch => ({
        setPopupState: state => dispatch(setAddBoardPopupStateAction(state))
    })
)(addBoardPopup);