import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../styles/blocks/full-card.css';
import {hashHistory} from 'react-router';
import {removeCardAction} from '../action-creators/cards';
import {changeCardTitleAction, changeCardDescriptionAction} from '../action-creators/cards';
import dateFormat from 'dateformat';
import insideClassName from '../utils/inside-class-name';

class FullCard extends Component {
    close() {
        let path = hashHistory.getCurrentLocation().pathname.split('/');
        path.pop();
        path = path.join('/');
        hashHistory.push(path);
    }

    closeClockHandler(e){
        if(!insideClassName(e.target, 'full-card__inner-wrap')){
            this.close();
        }
    }

    removeCard(){
        this.close();
        this.props.removeCard(this.props.data.id);
    }

    changeDescriptionHandler(){
        this.props.changeDescription(this.props.data.id, this.descriptionElement.value.trim());
    }

    changeTitleHandler(){
        //maby will be some checks
        this.props.changeTitle(this.props.data.id, this.titleElement.value.trim().replace("\n", ""));
    }

    onKeyDownHandler(elementType, e){
        // console.log(e.keyCode);
        if(e.keyCode === 13){//enter
            e.preventDefault();
            if(elementType === 'title'){
                this.titleElement.blur();
                this.changeTitleHandler();
            }else if(elementType === 'description'){
                this.descriptionElement.blur();
                // this.changeDescriptionHandler()
            }
        }
    }

    render() {
        let date = new Date(+this.props.data.createdDate);
        let dateStr = dateFormat(date, "dd/mm/yyyy, HH:MM:ss");;
        if (this.props.data) {
            return (
                <div
                    className="full-card"
                    onClick = {this.closeClockHandler.bind(this)}
                >
                    <div className="full-card__inner-wrap">
                        <div className="full-card__inner">
                            <div className="full-card__header">
                                <div className="full-card__title-wrapper">
                                    <textarea
                                        className="full-card__title"
                                        ref={element => this.titleElement = element}
                                        onBlur={this.changeTitleHandler.bind(this)}
                                        onKeyDown={this.onKeyDownHandler.bind(this, 'title')}
                                        defaultValue={this.props.data.title}
                                    />
                                </div>
                                <div className="full-card__info">
                                    <p className="full-card__id">id: {this.props.data.id}</p>
                                    <p className="full-card__date">Was created: {dateStr}</p>
                                </div>
                                <button onClick={this.close} className="btn-close full-card__btn-close">x</button>
                            </div>
                            <div className="full-card__body">
                                <div className="full-card__description-column">
                                    <textarea
                                        className="full-card__description"
                                        rows="5"
                                        ref={element => this.descriptionElement = element}
                                        onBlur={this.changeDescriptionHandler.bind(this)}
                                        onKeyDown={this.onKeyDownHandler.bind(this, 'description')}
                                        defaultValue={this.props.data.description}
                                        />
                                </div>
                                <div className="card-side-column">
                                    <h5 className="card-side-column__">Actions:</h5>
                                    <button onClick={this.removeCard.bind(this)}>remove card</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default connect(
    (state, ownProps) => {
        return {
            data: state.cards[ownProps.params.cardId],
        };
    },
    dispatch => ({
        removeCard: (cardId) => dispatch(removeCardAction(cardId)),
        changeTitle: (cardId, newTitle) => dispatch(changeCardTitleAction(cardId, newTitle)),
        changeDescription: (cardId, newDescription) => dispatch(changeCardDescriptionAction(cardId, newDescription))
    })
)(FullCard);
