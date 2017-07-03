/**
 * Created by user on 12.06.2017.
 */

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
            delete newColumns.columns[action.payload];
            return newColumns;
            break;
        case 'REMOVE_BOARD':
            let deletingBoard = store.getStore().boards.boards[action.payload];
            let deletingColumns = deletingColumns.cards;
            let newCards = Object.assign({}, cards);
            deletingCards.forEach(cardId => {
                delete newCards[cardId]
            });
            return newCards;
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