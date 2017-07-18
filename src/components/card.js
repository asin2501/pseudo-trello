/**
 * Created by user on 29.06.2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setDraggedCard} from '../action-creators/app-state';
import '../styles/blocks/card.css';
import classNames from 'classnames';

class Card extends Component  {
    render() {
        let cardClasses =  classNames("card", {"card--dragged": this.props.isEmptyWrapForDrag});
        return (
            <div
                onMouseDown={this.mouseDownHandler.bind(this)}
                className={cardClasses}
                ref={(element)=>{this.cardElement = element}}
            >
                <div className="card__inner">
                    <h5 className="card__title">
                        {this.props.data.title}
                    </h5>
                </div>
            </div>
        )
    }

    mouseDownHandler(e) {
        e.preventDefault();
        let elemRect = this.cardElement.getBoundingClientRect();
        this.props.setDraggedCard(this.props.data.id, e.clientX, e.clientY, elemRect.left - e.clientX, elemRect.top - e.clientY);
    }
}

export default connect(
    (state, ownProps) => {
        let isEmptyWrapForDrag;

        if (typeof ownProps.isEmptyWrapForDrag === 'undefined') {
            isEmptyWrapForDrag = state.appState.draggedCard ? ownProps.id === state.appState.draggedCard.cardId : false
        } else {
            isEmptyWrapForDrag = ownProps.isEmptyWrapForDrag
        }

        return {
            data: state.cards[ownProps.id],
            isEmptyWrapForDrag:isEmptyWrapForDrag
        }
    },
    dispatch => ({
        setDraggedCard: (cardId, x, y, offsetX, offsetY) => dispatch(setDraggedCard(cardId, x, y, offsetX, offsetY)),
    })
)(Card);