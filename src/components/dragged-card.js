/**
 * Created by User on 17.07.2017.
 */

import React, {Component} from 'react';
import Card from './card';
import {connect} from 'react-redux';
import '../styles/blocks/dragged-card-wrap.css'
// import classNames from 'classnames';
import {unsetDraggedCard} from "../action-creators/app-state";
// import {updateColumnOrder} from "../action-creators/columns";
// import columnCords from "../utils/column-cords";

class DraggedCard extends Component {
    constructor(props) {
        super(props);
        this.state = {x: 0, y: 0};
        this.mouseMoveHandler = this.mouseMove.bind(this);
        this.mouseUpHandler = this.mouseUp.bind(this);
        this.mouseMoveCounter = 0;
    }

    render() {
        if (this.props.cardId) {
            // let wrapperClasses = classNames("dragged-column-wrap",{"dragged-column-wrap--active":this.props.columnId});
            let styles = {
                left: this.state.x + this.props.offsetX + 'px',
                top: this.state.y + this.props.offsetY + 'px'
            };
            return (
                <div
                    style={styles}
                    className="dragged-card-wrap"
                    ref={element => this.element = element}
                >
                    <Card id={this.props.cardId} isEmptyWrapForDrag={false}/>
                </div>
            )
        } else {
            return null;
        }
    }

    componentDidUpdate(nextProps) {
        if (nextProps.cardId === this.props.cardId) {
        } else if (this.props.cardId) {
            this.setState({x: this.props.x, y: this.props.y});
            document.body.addEventListener('mousemove', this.mouseMoveHandler);
            document.body.addEventListener('mouseup', this.mouseUpHandler);
            setTimeout(()=>{
                // console.log(this.element.className);
                if(this.element){
                    this.element.className += " dragged-card-wrap--activate-transition";
                }
            }, 100);
        } else {
            document.body.removeEventListener('mousemove', this.mouseMoveHandler);
            document.body.removeEventListener('mouseup', this.mouseUpHandler);
        }
    }

    mouseUp(event) {
        this.props.unsetDraggedCard();
    }

    mouseMove(event) {
        if (this.mouseMoveCounter === 3) {
            event = fixEvent(event);
            // let newOrder = columnCords.getOrder(event.pageX);
            //
            // if (this.props.column.order !== newOrder) {
            //     // console.log('old order:', this.props.column.order, 'new order:', newOrder);
            //     this.props.updateColumnOrder(this.props.columnId,this.props.column.order);
            // }

            this.setState({x: event.pageX, y: event.pageY});
            this.mouseMoveCounter = 0;
        }else{
            this.mouseMoveCounter += 1;
        }
    }
}

function fixEvent(e) {
    // получить объект событие для IE
    e = e || window.event;

    // добавить pageX/pageY для IE
    if (e.pageX == null && e.clientX != null) {
        let html = document.documentElement;
        let body = document.body;
        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
    }

    // добавить which для IE
    if (!e.which && e.button) {
        e.which = e.button && 1 ? 1 : ( e.button && 2 ? 3 : ( e.button && 4 ? 2 : 0 ) )
    }

    return e;
}

export default connect(state => {
        if (state.appState.draggedCard) {
            return {
                cardId: state.appState.draggedCard.cardId,
                card: state.columns[state.appState.draggedCard.cardId],
                offsetX: state.appState.draggedCard.offsetX,
                offsetY: state.appState.draggedCard.offsetY,
                x: state.appState.draggedCard.x,
                y: state.appState.draggedCard.y
            }
        } else {
            return {
                columnId: false
            }
        }
    },
    dispatch => ({
        unsetDraggedCard: () => dispatch(unsetDraggedCard()),
        // updateColumnOrder: (id, order) => dispatch(updateColumnOrder(id, order))
    })
)(DraggedCard);