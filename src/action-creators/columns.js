/**
 * Created by user on 12.06.2017.
 */
const ADD_COLUMN = 'ADD_COLUMN';
const REMOVE_COLUMN = 'REMOVE_COLUMN';
const RENAME_COLUMN = 'RENAME_COLUMN';
const UPDATE_COLUMN_ORDER = 'UPDATE_COLUMN_ORDER';

export function addColumn(columnName = 'New Column', boardID = 1) {
    return {
        type: ADD_COLUMN,
        payload: {
            id: +(new Date()),
            name: columnName,
            boardId: boardID,
            order:0,
            cards:[]
        }
    };
}

export function removeColumnAction(columnID) {
    return {
        type: REMOVE_COLUMN,
        payload: columnID
    };
}

export function updateColumnOrder(columnId, boardId) {
    return {
        type: UPDATE_COLUMN_ORDER,
        payload: {
            columnId:columnId,
            order:boardId
        }
    };
}