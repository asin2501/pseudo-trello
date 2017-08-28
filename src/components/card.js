/**
 * Created by user on 29.06.2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setDraggedCard} from '../action-creators/app-state';
import '../styles/blocks/card.css';
import classNames from 'classnames';
import cardCords from '../utils/card-cords';
import {hashHistory} from 'react-router';

class Card extends Component {
    constructor(props) {
        super(props);
        this.awaitForMouseUp = false;
    }

    render() {
        let cardClasses = classNames("card", {"card--dragged": (!this.props.isDragged && this.props.draggedCard && this.props.data.id === this.props.draggedCard.cardId)});
        return (
            <div
                onMouseDown={this.mouseDownHandler.bind(this)}
                onMouseUp={this.mouseUpHandler.bind(this)}
                className={cardClasses}
                ref={(element) => {
                    this.cardElement = element
                }}
            >
                <div className="card__inner">
                    <h5 className="card__title">
                        {this.props.data.title}
                    </h5>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.sendCardCord();
    }

    componentDidUpdate() {
        this.sendCardCord();
    }

    componentWillUnmount() {
        if (!this.props.isDragged) {
            cardCords.remove(this.props.data.columnId, this.props.data.id);
        }
    }

    sendCardCord() {
        if (!this.props.isDragged) {
            let elemRect = this.cardElement.getBoundingClientRect();
            cardCords.set(this.props.data.id, this.props.data.order, elemRect.top, this.props.data.columnId);
        }
    }

    mouseUpHandler(e) {
        e.preventDefault();
        if (this.awaitForMouseUp) {
            // console.log(this.props.data.id, pathParts, hashHistory.getCurrentLocation().pathname);
            // console.log(newPath);
            // let pathParts = hashHistory.getCurrentLocation().pathname.split('/');
            let cardPath = hashHistory.getCurrentLocation().pathname+ '/' + this.props.data.id;
            hashHistory.push(cardPath);
        }
        this.awaitForMouseUp = false;

    }

    mouseDownHandler(e) {
        e.preventDefault();
        let client = {x: e.clientX, y: e.clientY,}
        this.awaitForMouseUp = true;
        setTimeout(() => {
                if (this.awaitForMouseUp) {
                    let elemRect = this.cardElement.getBoundingClientRect();
                    this.props.setDraggedCard(this.props.data.id, client.x, client.y, elemRect.left - client.x, elemRect.top - client.y);
                    this.awaitForMouseUp = false;
                }
            }, 150
        )
    }
}

export default connect(
    (state, ownProps) => {
        return {
            data: state.cards[ownProps.id],
            draggedCard: state.appState.draggedCard
        }
    },
    dispatch => ({
        setDraggedCard: (cardId, x, y, offsetX, offsetY) => dispatch(setDraggedCard(cardId, x, y, offsetX, offsetY)),
    })
)(Card);