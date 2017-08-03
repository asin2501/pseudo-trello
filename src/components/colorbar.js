/**
 * Created by User on 03.08.2017.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import '../styles/blocks/colorbar.css';
import settings from '../settings.json';
import {setColorAction} from '../action-creators/boards'

class Colorbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let colorBarClasses = classNames("colorbar", {"colorbar--opened": this.props.status});
        return (
            <div className={colorBarClasses}>colorbar
                <ul className="color-list">
                    {settings.avaliableBoardColors.map((item) => {
                        let style = {
                            backgroundColor: item.rgb
                        };
                        return (
                            <li className="color-list__item">
                                <div
                                    onClick={()=>{
                                        {/*console.log(this);*/}
                                        this.props.setColor(item.rgb, this.props.boardId)
                                    }}
                                    className="color-list__color"
                                    style={style}></div>
                            </li>
                        )
                    }, this)}
                </ul>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => {
        return {
            status: state.appState.colorbarStatus
        }
    },
    dispatch => ({
        setColor: (color, boardId) => dispatch(setColorAction(color, boardId)),
    })
)(Colorbar);