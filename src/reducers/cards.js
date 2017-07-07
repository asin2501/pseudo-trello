/**
 * Created by user on 12.06.2017.
 */
/**
 * Created by user on 12.06.2017.
 */
import store from '../store';


let cardsInitialState = {
//     {
//     id:'1',
//     title:'First card',
//     boardID:1,
//     columnId:1,
//     order:1
// }
};


export  default function (cards = cardsInitialState, action) {
    switch (action.type) {
        case 'ADD_CARD':
            return Object.assign({}, cards, {[action.payload.id]: action.payload});
        case 'REMOVE_BOARD':
            return removeBoard(cards, action);
            return cards;

            break;
        default:
            return cards;
    }
}

function removeBoard(cards, action) {
    let deletingBoard = store.getState().boards.boards[action.payload];
    let deletingColumnsIDList = deletingBoard.columns;
    let deletingCards = deletingColumnsIDList.reduce((deletingCardsIdList, columnId) => {
        return [...deletingCardsIdList, ...store.getState().columns[columnId].cards];
    }, []);
    debugger;
    let newCards = Object.assign({}, cards);
    deletingCards.forEach(cardId => {
        delete newCards[cardId]
    });
    return newCards;
}