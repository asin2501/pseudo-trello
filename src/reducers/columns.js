/**
 * Created by user on 12.06.2017.
 */

import store from '../store';

let store1 = store;

let columnsInitialState = {
    1:{
//     id:'1',
//     name:'First column'
//     cards:,
//     order:,
//     boardId:
}
};

export  default function (columns = columnsInitialState, action) {
    let newColumns;
    switch (action.type) {
        case 'ADD_COLUMN':
            return Object.assign({}, columns, {[action.payload.id]: action.payload});
        case 'REMOVE_COLUMN':
            newColumns = Object.assign({}, columns);
            delete newColumns[action.payload];
            return newColumns;
            break;
        case 'REMOVE_BOARD':
            return removeBoard(columns, action);
            break;
        case 'ADD_CARD':
            newColumns = Object.assign({}, columns);
            newColumns[action.payload.columnId].cards.push(action.payload.id);
            return newColumns;
            break;
        default:
            return columns;
    }
}

function removeBoard(columns, action) {
    let deletingBoard = store.getState().boards.boards[action.payload];
    let deletingColumns = deletingBoard.columns;
    let newColumns = Object.assign({}, columns);

    deletingColumns.forEach(columnId => {
        delete newColumns[columnId]
    });

    return newColumns;
}

