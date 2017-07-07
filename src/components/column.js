/**
 * Created by user on 22.06.2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../styles/blocks/column.css';
import '../styles/blocks/add-card-form.css';
import {removeColumnAction} from '../action-creators/columns';
import {addCardAction} from '../action-creators/cards';
import Card from './card';
import classNames from 'classnames';

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
        }
    }

    renderCards() {
        return this.props.cards.map((card) => <Card key={card.id} data={card}/>)
    }

    toggleCardForm(){
        this.setState({addCardFromShowed: !this.state.addCardFromShowed});
    }

    render() {
        let formClasses = classNames("add-card-form", {"add-card-form--showed":this.state.addCardFromShowed});
        return (
            <div className="column">
                <div className="column__container">
                    <h4 className="column__title">
                        { this.props.data.name }
                    </h4>
                    <div className="column__wrapper">
                        {this.renderCards()}
                    </div>
                    <div className={formClasses}>
                        <textarea
                            className="add-card-form__input"
                            ref={(input) => {
                                this.addCardInput = input
                            }} type="text"/>
                        <button className="btn" onClick={this.addCard.bind(this)}>addCard</button>
                    </div>
                    <button onClick={this.remove.bind(this)}>x</button>
                </div>
                <button onClick={this.toggleCardForm.bind(this)} className="column__add-card-bottom">Add card</button>
            </div>
        )
    }
}

//export default Column;

export default connect(
    // (state, ownProps) => {
    //     // console.log(state, ownProps);
    // }
    (state, ownProps) => {
        return {
            cards: state.columns[ownProps.data.id].cards.map(cardId => state.cards[cardId])
        }
    },
    dispatch => ({
        //addBoard: boardName => dispatch({type: 'ADD_BOARD', payload: boardName})
        removeColumn: columnID => dispatch(removeColumnAction(columnID)),
        addCard: (columnId, tile) => dispatch(addCardAction(columnId, tile))
    })
)
(Column);