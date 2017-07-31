/**
 * Created by user on 08.07.2017.
 */
const SET_DRAGGED_COLUMN = 'SET_DRAGGED_COLUMN';
const SET_DRAGGED_CARD = 'SET_DRAGGED_CARD';
const UNSET_DRAGGED_COLUMN = 'UNSET_DRAGGED_COLUMN';
const UNSET_DRAGGED_CARD = 'UNSET_DRAGGED_CARD';
const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';

export function setDraggedColumn(columnId, x, y, offsetX,offsetY) {
    return {
        type: SET_DRAGGED_COLUMN,
        payload: {
            columnId:columnId,
            offsetX:offsetX,
            offsetY:offsetY,
            x:x,
            y:y
        }
    };
}

export function setDraggedCard(cardId, x, y, offsetX,offsetY) {
    return {
        type: SET_DRAGGED_CARD,
        payload: {
            cardId:cardId,
            offsetX:offsetX,
            offsetY:offsetY,
            x:x,
            y:y
        }
    };
}

export function openSideBarAction() {
    console.log('open');
    return {
        type: OPEN_SIDEBAR,
    };
}

export function closeSideBarAction() {
    return {
        type: CLOSE_SIDEBAR,
    };
}

export function unsetDraggedColumn() {
    return {
        type: UNSET_DRAGGED_COLUMN
    };
}

export function unsetDraggedCard() {
    return {
        type: UNSET_DRAGGED_CARD
    };
}