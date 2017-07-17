/**
 * Created by user on 08.07.2017.
 */
const SET_DRAGGED_COLUMN = 'SET_DRAGGED_COLUMN';
const UNSET_DRAGGED_COLUMN = 'UNSET_DRAGGED_COLUMN';

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

export function unsetDraggedColumn() {
    return {
        type: UNSET_DRAGGED_COLUMN
    };
}