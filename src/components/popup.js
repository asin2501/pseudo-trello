/**
 * Created by 2501 on 22.06.2017.
 */
import React, {Component} from 'react';
import '../styles/blocks/popup.css'
import classNames from 'classnames';

import emitter from './emitter';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // showedShadow: false,
            // showedContainer: false
            showed: false
        };

        // console.log(this.state);
    }


    componentDidMount() {
        emitter.addListener(this.props.settings.openEvent, this.open.bind(this));
        emitter.addListener(this.props.settings.closeEvent, this.close.bind(this));
    }

    open() {
        this.setState({showed: true});
        // setTimeout(() => {
        //     this.setState({showedContainer: true});
        // }, 200);
    }

    close() {
        this.setState({showed: false});
        // setTimeout(() => {
        //     this.setState({showedShadow: false});
        // }, 100);
    }

    render() {

        // console.log(this.state);
        let popupClasses = classNames("popup", {"popup--showed":this.state.showed});

        return (
            <div className={popupClasses}>
                <div className="popup__conteiner popup__conteiner--small">
                    <div className="popup__header">
                        <h3 className="popup__title">{this.props.settings.header}</h3>
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

export default Popup;