/**
 * Created by user on 12.06.2017.
 */
/**
 * Created by user on 12.06.2017.
 */
import store from '../store';
import helpers from '../utils/helpers';

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
            return addCard(cards, action);
        case 'REMOVE_BOARD':
            return removeBoard(cards, action);
        default:
            return cards;
    }
}

function addCard(cards, action) {
    let newCards = helpers.copyObject(cards);
    newCards[action.payload.id] = action.payload;
    return newCards[action.payload.id];
}

function removeBoard(cards, action) {
    let deletingBoard = store.getState().boards.boards[action.payload];
    let deletingColumnsIDList = deletingBoard.columns;
    let deletingCards = deletingColumnsIDList.reduce((deletingCardsIdList, columnId) => {
        return [...deletingCardsIdList, ...store.getState().columns[columnId].cards];
    }, []);
    let newCards = helpers.copyObject(cards);
    deletingCards.forEach(cardId => {
        delete newCards[cardId]
    });
    return newCards;
}