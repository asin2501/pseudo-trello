/**
 * Created by user on 12.06.2017.
 */

import store from '../store';
import helpers from '../utils/helpers';

let columnsInitialState = {
    // 1:{
//     id:'1',
//     name:'First column'
//     cards:,
//     order:0,
//     boardId:
// }
};

export  default function (columns = columnsInitialState, action) {
    switch (action.type) {
        case 'ADD_COLUMN':
            return addColumn(columns, action);
        case 'REMOVE_COLUMN':
            return removeColumn(columns, action);
        case 'REMOVE_BOARD':
            return removeBoard(columns, action);
        case 'ADD_CARD':
            return addCard(columns, action);
        case 'UPDATE_COLUMN_ORDER':
            return updateColumnOrder(columns, action);
        default:
            return columns;
    }
}

function addCard(columns, action) {
    let newColumns = helpers.copyObject(columns);
    newColumns[action.payload.columnId].cards.push(action.payload.id);
    return newColumns;
}

function removeBoard(columns, action) {
    let deletingBoard = store.getState().boards.boards[action.payload];
    let deletingColumns = deletingBoard.columns;
    let newColumns = helpers.copyObject(columns);

    deletingColumns.forEach(columnId => {
        delete newColumns[columnId]
    });

    return newColumns;
}

function addColumn(columns, action) {
    let newColumns = helpers.copyObject(columns);
    // let movedColumn = columns[action.payload.columnId];
    let boardColumns = store.getState().boards.boards[action.payload.boardId].columns; //get arr columns id
    let maxOrder = boardColumns.reduce((maxOrder, columnId) => {
        let column = columns[columnId];

        if (column && column.order > maxOrder) {
            maxOrder = column.order;
        }
        return maxOrder;
    }, -1);
    maxOrder++;
    action.payload.order = maxOrder;
    newColumns[action.payload.id] = action.payload;
    return newColumns;
}

function removeColumn(columns, action) {
    let deletedColumn = columns[action.payload];
    let deletedColumnOrder = deletedColumn.order;
    let anotherBoardColumnsIdList = store.getState().boards.boards[deletedColumn.boardId].columns;
    let newColumns = helpers.copyObject(columns);
    delete newColumns[action.payload];
    anotherBoardColumnsIdList.forEach((columnId)=>{
        if(newColumns[columnId]){
            if(newColumns[columnId].order>deletedColumnOrder){
                newColumns[columnId].order-=1;
            }
        }
    });
    return newColumns;
}

function updateColumnOrder(columns, action) {
    let newColumns = helpers.copyObject(columns);
    let newNewColumns = helpers.copyObject(columns);
    let movedColumn = columns[action.payload.columnId];
    let columnsBoardIdMap = store.getState().boards.boards[movedColumn.boardId].columns;

    columnsBoardIdMap.forEach((columnId)=>{
       let column = newColumns[columnId];

       // console.log();

       if(column.order >= action.payload.order){
           column.order+=1;
       }
    });

    newColumns[action.payload.columnId].order = action.payload.order;

    for (let key in columns) {
        /* ... делать что-то с obj[key] ... */
        console.log('old order:', columns[key].order, 'new order:', newColumns[key].order);
    }

    return newColumns;
    // return newNewColumns;
}

