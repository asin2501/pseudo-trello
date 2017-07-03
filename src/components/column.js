/**
 * Created by user on 22.06.2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../styles/blocks/column.css'
import {removeColumnAction} from '../action-creators/columns'
import {addCardAction} from '../action-creators/cards'


class Column extends Component {
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
        return this.props.cards.map((card) => <div key={card.id}>{card.cardTitle}</div>)

    }

    render() {
        return (
            <div className="column">
                { this.props.data.name }
                <div>
                    {this.renderCards()}
                </div>
                <button onClick={this.remove.bind(this)}>x</button>
                <div>
                    <input ref={(input) => {
                        this.addCardInput = input
                    }} type="text"/>
                    <button onClick={this.addCard.bind(this)}>addCard</button>
                </div>
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