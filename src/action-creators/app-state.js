/**
 * Created by user on 08.07.2017.
 */
const SET_DRAGGED_COLUMN = 'SET_DRAGGED_COLUMN';
const SET_DRAGGED_CARD = 'SET_DRAGGED_CARD';
const UNSET_DRAGGED_COLUMN = 'UNSET_DRAGGED_COLUMN';
const UNSET_DRAGGED_CARD = 'UNSET_DRAGGED_CARD';
const SET_SIDEBAR_STATUS = 'SET_SIDEBAR_STATUS';
const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';
const SET_COLOLORBAR_STATUS = 'SET_COLOLORBAR_STATUS';

export function setColorBarStatusAction(status){
    return {
        type: SET_COLOLORBAR_STATUS,
        payload: status
    }
}

export function setSideBarStatusAction(status){
    return {
        type: SET_SIDEBAR_STATUS,
        payload: status
    }
}

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

export function changeSearchTextAction(searchText = "") {
    return {
        type: CHANGE_SEARCH_TEXT,
        payload:{
            searchText
        }
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