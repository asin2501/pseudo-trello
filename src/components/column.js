/**
 * Created by user on 22.06.2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../styles/blocks/column.css';
import '../styles/blocks/add-card-form.css';
import {removeColumnAction, setColumnCord} from '../action-creators/columns';
import {addCardAction} from '../action-creators/cards';
import {setDraggedColumn} from '../action-creators/app-state';
import Card from './card';
import classNames from 'classnames';
import columnCords from '../utils/column-cords';
// import cardCords from '../utils/card-cords';
// import ScrollArea from 'react-scrollbar';
// import ReactScrollbar from 'react-scrollbar-js';
import {Scrollbars} from 'react-custom-scrollbars';

class Column extends Component {
    constructor(props) {
        super(props);
        this.state = {addCardFromShowed: false};
    }

    remove() {
        this.props.removeColumn(this.props.data.id);
    }

    addCard() {
        let cardTitle = this.addCardInput.value.trim();
        if (cardTitle) {
            this.props.addCard(this.props.data.id, cardTitle);
            this.addCardInput.value = '';

        } else {
            this.addCardInput.focus();
        }
    }

    renderCards() {
        return this.props.cards.map((cardId) => <Card key={cardId} id={cardId}/>)
    }

    toggleCardForm() {

        this.setState({addCardFromShowed: !this.state.addCardFromShowed});
    }

    componentDidUpdate () {
        if (this.state.addCardFromShowed) {
            this.addCardInput.focus();
        }
        this.sendColumnCord();
    }

    componentDidMount() {
       this.sendColumnCord();
    }

    componentWillUnmount() {
        if (!this.props.isDragged) {
            columnCords.remove(this.props.data.id);
        }
    }

    sendColumnCord() {
        if (!this.props.isDragged) {
            let elemRect = this.columnElement.getBoundingClientRect();
            columnCords.set(this.props.data.id, this.props.data.order, elemRect.left);
        }
    }

    onMouseDownHandler(e) {
        e.preventDefault();
        let elemRect = this.columnElement.getBoundingClientRect();
        this.props.setDraggedColumn(this.props.data.id, e.clientX, e.clientY, elemRect.left - e.clientX, elemRect.top - e.clientY);
    }


    render() {
        let formClasses = classNames("add-card-form", {"add-card-form--showed": this.state.addCardFromShowed});
        let addCadrdBottomClasses = classNames("column__add-card-bottom", {"column__add-card-bottom--hidden": this.state.addCardFromShowed});
        let columnClasses = classNames("column", {"column--dragged-wrap": (!this.props.isDragged && this.props.data.id === this.props.draggedColumn.columnId)});


        return (
            <div
                className={columnClasses}
                ref={element => this.columnElement = element}>
                <div className="column__inner">
                    <h4 className="column__title" onMouseDown={this.onMouseDownHandler.bind(this)}>
                        { this.props.data.name }
                    </h4>
                    <Scrollbars
                        style={{width: '100%', maxHeight: 'calc(100vh - 200px)',}}
                        autoHeight
                        autoHeightMax={'calc(100vh - 250px)'}>
                        <div
                            className="column__container"
                            ref={element => this.columnInnerContainer = element}>
                            {this.renderCards()}
                            <div className={formClasses}>
                        <textarea
                            // onBlur={this.toggleCardForm.bind(this)}
                            className="add-card-form__input"
                            ref={(input) => {
                                this.addCardInput = input
                            }}/>
                                <div>
                                    <button className="btn" onClick={this.addCard.bind(this)}>addCard</button>
                                    <button onClick={this.toggleCardForm.bind(this)} className="btn-close add-column-form_btn">x
                                    </button>
                                </div>
                            </div>
                            <button onClick={this.remove.bind(this)}>x</button>
                        </div>
                    </Scrollbars>
                    <button onClick={this.toggleCardForm.bind(this)} className={addCadrdBottomClasses}>Add card</button>
                </div>
            </div>
        )
    }
}


export default connect(
    (state, ownProps) => {
        let cards = [...state.columns[ownProps.id].cards];
        let sortedCards = cards.sort((id1, id2) => state.cards[id1].order - state.cards[id2].order);

        return {
            data: state.columns[ownProps.id],
            cards: sortedCards,
            draggedColumn: state.appState.draggedColumn
        }
    },
    dispatch => ({
        //addBoard: boardName => dispatch({type: 'ADD_BOARD', payload: boardName})
        removeColumn: columnID => dispatch(removeColumnAction(columnID)),
        addCard: (columnId, tile) => dispatch(addCardAction(columnId, tile)),
        setDraggedColumn: (columnId, x, y, offsetX, offsetY) => dispatch(setDraggedColumn(columnId, x, y, offsetX, offsetY))
    })
)(Column);