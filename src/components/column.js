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
// import ScrollArea from 'react-scrollbar';
// import ReactScrollbar from 'react-scrollbar-js';
import {Scrollbars} from 'react-custom-scrollbars';

class Column extends Component {
    constructor(props) {
        super(props);
        this.state = {addCardFromShowed: false};

        this.handleUpdate = this.handleUpdate.bind(this);
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

    componentDidUpdate() {
        if (this.state.addCardFromShowed) {
            this.addCardInput.focus();
        }
        // console.log('cdu');
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
        //TODO: check how it works
        if ((this.id ===this.props.draggedColumn.columnId && this.props.isEmptyWrapForDrag) || this.id !== this.props.draggedColumn.columnId) {
            let elemRect = this.cardElement.getBoundingClientRect();
            columnCords.set(this.props.data.id, this.props.data.order, elemRect.left);
        }
    }

    handleUpdate(values) {
        // const { clientHeight, scrollHeight } = values;
        // const scrollExist = scrollHeight>scrollHeight;
        // console.log(111);
    }

    onMouseDownHandler(e) {
        e.preventDefault();
        let elemRect = this.cardElement.getBoundingClientRect();
        this.props.setDraggedColumn(this.props.data.id, e.clientX, e.clientY, elemRect.left - e.clientX, elemRect.top - e.clientY);
    }

    // renderThumb({ style, ...props }) {
    //     return (
    //         <div
    //             className="scrollBar"
    //             style={{ ...style}}
    //             {...props}/>
    //     );
    // }

    render() {
        let formClasses = classNames("add-card-form", {"add-card-form--showed": this.state.addCardFromShowed});
        let addCadrdBottomClasses = classNames("column__add-card-bottom", {"column__add-card-bottom--hidden": this.state.addCardFromShowed});
        let columnClasses = classNames("column", {"column--dragged": this.props.isEmptyWrapForDrag});

        return (
            <div
                className={columnClasses}
                ref={element => this.cardElement = element}>
                <div className="column__inner">
                    <h4 className="column__title" onMouseDown={this.onMouseDownHandler.bind(this)}>
                        { this.props.data.name }
                    </h4>
                    {/*<ReactScrollbar className="scroll-component scroll-component--column-scrollbar">*/}
                    {/*<ScrollArea className="column-scroll-bar" style={{maxHeight:'calc(100vh - 300px)'}}>*/}
                    <Scrollbars
                        style={{width: '100%', maxHeight: 'calc(100vh - 200px)',}}
                        autoHeight
                        autoHeightMax={'calc(100vh - 250px)'}
                        onUpdate={this.handleUpdate}>
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
                    {/*</ReactScrollbar>*/}
                    {/*</ScrollArea>*/}
                    <button onClick={this.toggleCardForm.bind(this)} className={addCadrdBottomClasses}>Add card</button>
                </div>
            </div>
        )
    }
}

Column.contextTypes = {
    scrollArea: React.PropTypes.object
};

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
            // cards: state.columns[ownProps.id].cards.map(cardId => state.cards[cardId]),
            cards: state.columns[ownProps.id].cards,
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
)(Column);