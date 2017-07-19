/**
 * Created by user on 08.07.2017.
 */

import React, {Component} from 'react';
import Column from './column';
import {connect} from 'react-redux';
import '../styles/blocks/dragged-column-wrap.css'
// import classNames from 'classnames';
import {unsetDraggedColumn} from "../action-creators/app-state";
import {updateColumnOrder} from "../action-creators/columns";
import columnCords from "../utils/column-cords";

class DraggedColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {x: 0, y: 0};
        this.mouseMoveHandler = this.mouseMove.bind(this);
        this.mouseUpHandler = this.mouseUp.bind(this);
        this.mouseMoveCounter = 0;
    }

    render() {
        if (this.props.columnId) {
            // let wrapperClasses = classNames("dragged-column-wrap",{"dragged-column-wrap--active":this.props.columnId});
            let styles = {
                left: this.state.x + this.props.offsetX + 'px',
                top: this.state.y + this.props.offsetY + 'px'
            };
            return (
                <div
                    style={styles}
                    className="dragged-column-wrap"
                    ref={element => this.element = element}
                >
                    <Column id={this.props.columnId} isEmptyWrapForDrag={false}/>
                </div>
            )
        } else {
            return null;
        }
    }

    componentDidUpdate(nextProps) {
        if (nextProps.columnId === this.props.columnId) {
        } else if (this.props.columnId) {
            this.setState({x: this.props.x, y: this.props.y});
            document.body.addEventListener('mousemove', this.mouseMoveHandler);
            document.body.addEventListener('mouseup', this.mouseUpHandler);
            setTimeout(()=>{
                // console.log(this.element.className);
                if(this.element){
                this.element.className += " dragged-column-wrap--activate-transition";
                }
            }, 100);
        } else {
            document.body.removeEventListener('mousemove', this.mouseMoveHandler);
            document.body.removeEventListener('mouseup', this.mouseUpHandler);
        }
    }

    mouseUp(event) {
        this.props.unsetDraggedColumn();
    }

    mouseMove(event) {
        if (this.mouseMoveCounter === 3) {
            event = fixEvent(event);
            let newOrder = columnCords.getOrder(event.pageX);
            console.log(this.props.column.order, newOrder);
            if (this.props.column.order !== newOrder) {

                this.props.updateColumnOrder(this.props.columnId, newOrder);
            }

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
        if (state.appState.draggedColumn) {
            return {
                columnId: state.appState.draggedColumn.columnId,
                column: state.columns[state.appState.draggedColumn.columnId],
                offsetX: state.appState.draggedColumn.offsetX,
                offsetY: state.appState.draggedColumn.offsetY,
                x: state.appState.draggedColumn.x,
                y: state.appState.draggedColumn.y
            }
        } else {
            return {
                columnId: false
            }
        }
    },
    dispatch => ({
        unsetDraggedColumn: () => dispatch(unsetDraggedColumn()),
        updateColumnOrder: (id, order) => dispatch(updateColumnOrder(id, order))
    })
)(DraggedColumn);
