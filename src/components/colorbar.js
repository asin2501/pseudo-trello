/**
 * Created by User on 03.08.2017.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import '../styles/blocks/colorbar.css';
import settings from '../settings.json';
import insideClassName from '../utils/inside-class-name';
import {setColorAction} from '../action-creators/boards';
import {setSideBarStatusAction, setColorBarStatusAction} from '../action-creators/app-state';

class Colorbar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setHandler();
    }

    componentDidUpdate() {
        this.setHandler();
    }

    setHandler() {
        // console.log('listeners', this.props.status);
        if (this.props.status) {
            document.body.addEventListener('mouseup', this.mouseUpHandler.bind(this));
        } else {
            document.body.removeEventListener('mouseup', this.mouseUpHandler.bind(this));
        }
    }

    mouseUpHandler(e) {
        let target = e.target;
        let isInsideClass = insideClassName(target, 'colorbar');

        if (!isInsideClass && target.className.indexOf('colorbar') === -1) {
            this.props.close();
            e.preventDefault();
            e.stopPropagation();
        }
    }

    render() {
        let colorBarClasses = classNames("colorbar", {"colorbar--opened": this.props.status});
        return (
            <div className={colorBarClasses}>colorbar
                <ul className="color-list">
                    {settings.avaliableBoardColors.map((item, i) => {
                        let style = {
                            backgroundColor: item.rgb
                        };
                        return (
                            <li className="color-list__item" key={i}>
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
        close: () => dispatch(setColorBarStatusAction(false))
    })
)(Colorbar);