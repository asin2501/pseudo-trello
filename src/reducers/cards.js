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
        case 'CHANGE_CARD_POS':
            return changeCardPos(cards, action);
        default:
            return cards;
    }
}

function changeCardPos(cards, action){
    //cardId, newColumnId, newColumnOrder
    let newCards = helpers.copyObject(cards);
    let oldColumnId = newCards[action.payload.cardId].oldColumnId;

    if(action.payload.newColumnId === oldColumnId){
        //todo:change only order
        // very dificult
    }else{
        newCards[action.payload.cardId].columnId = action.payload.newColumnId;
        //todo:change order
        // very dificult
    }

    return newCards;
}

function addCard(cards, action) {
    let newCards = helpers.copyObject(cards);

    newCards[action.payload.id] = action.payload;

    newCards[action.payload.id].order =  store.getState().columns[action.payload.columnId].cards.length;
    return newCards;
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