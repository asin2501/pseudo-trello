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
        return this.props.cards.map((card) => <Card key={card.id} data={card}/>)
    }

    toggleCardForm() {

        this.setState({addCardFromShowed: !this.state.addCardFromShowed});
    }

    componentDidUpdate() {
        if (this.state.addCardFromShowed) {
            this.addCardInput.focus();
        }
        this.sendCardCord();
    }

    componentDidMount() {
        if (!this.props.draggedColumn) {
            this.sendCardCord();
        }
    }

    componentWillUnmount() {
        columnCords.remove(this.props.data.id);
    }

    sendCardCord() {
        let elemRect = this.cardElement.getBoundingClientRect();
        columnCords.set(this.props.data.id, this.props.data.order, elemRect.left);
    }

    onMouseDownHandler(e) {
        e.preventDefault();
        // console.log(bodyRect);
        // console.log(elemRect);
        // console.log('Element is ' + offsetY + ' vertical pixels from <body>');
        // console.log('x:', elemRect.left - e.clientX );
        // console.log('x:', elemRect.top - e.clientY );

        // let  bodyRect = document.body.getBoundingClientRect(),
        //     elemRect = this.cardElement.getBoundingClientRect(),
        //     offsetY   = elemRect.top - bodyRect.top,
        //     offsetX   = elemRect.left - bodyRect.left;
        // console.log('x:'+ e.clientX);
        // console.log('y:'+ e.clientY);
        let elemRect = this.cardElement.getBoundingClientRect();
        this.props.setDraggedColumn(this.props.data.id, e.clientX, e.clientY, elemRect.left - e.clientX, elemRect.top - e.clientY);
    }

    render() {
        let formClasses = classNames("add-card-form", {"add-card-form--showed": this.state.addCardFromShowed});
        let addCadrdBottomClasses = classNames("column__add-card-bottom", {"column__add-card-bottom--hidden": this.state.addCardFromShowed});
        let columnClasses = classNames("column", {"column--dragged": this.props.isEmptyWrapForDrag});

        return (
            <div
                className={columnClasses}
                ref={element => this.cardElement = element}>
                <h4 className="column__title" onMouseDown={this.onMouseDownHandler.bind(this)}>
                    { this.props.data.name }
                </h4>
                <div className="column__container">
                    <div className="column__wrapper">
                        {this.renderCards()}
                    </div>
                    <div className={formClasses}>
                        <textarea
                            // onBlur={this.toggleCardForm.bind(this)}
                            className="add-card-form__input"
                            ref={(input) => {
                                this.addCardInput = input
                            }}/>
                        <button className="btn" onClick={this.addCard.bind(this)}>addCard</button>
                        <button onClick={this.toggleCardForm.bind(this)} className="btn-close add-column-form_btn">x
                        </button>
                    </div>
                    <button onClick={this.remove.bind(this)}>x</button>
                </div>
                <button onClick={this.toggleCardForm.bind(this)} className={addCadrdBottomClasses}>Add card</button>
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
        let isEmptyWrapForDrag;

        if (typeof ownProps.isEmptyWrapForDrag === 'undefined') {
            isEmptyWrapForDrag = state.appState.draggedColumn ? ownProps.id === state.appState.draggedColumn.columnId : false
        } else {
            isEmptyWrapForDrag = ownProps.isEmptyWrapForDrag
        }

        return {
            data: state.columns[ownProps.id],
            cards: state.columns[ownProps.id].cards.map(cardId => state.cards[cardId]),
            isEmptyWrapForDrag: isEmptyWrapForDrag,
            draggedColumn: state.appState.draggedColumn
        }
    },
    dispatch => ({
        //addBoard: boardName => dispatch({type: 'ADD_BOARD', payload: boardName})
        removeColumn: columnID => dispatch(removeColumnAction(columnID)),
        addCard: (columnId, tile) => dispatch(addCardAction(columnId, tile)),
        setDraggedColumn: (columnId, x, y, offsetX, offsetY) => dispatch(setDraggedColumn(columnId, x, y, offsetX, offsetY))
    })
)
(Column);