/**
 * Created by user on 12.06.2017.
 */
/**
 * Created by user on 12.06.2017.
 */
import store from './store';

let cardsInitialState = {
//     {
//     id:'1',
//     name:'First card',
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
            let deletingBoard = store.getStore().boards.boards[action.payload];
            let deletingCards = deletingCards.cards;
            let newCards = Object.assign({}, cards);
            deletingCards.forEach(cardId => {
                delete newCards[cardId]
            });
            return newCards;
            break;
        default:
            return cards;
    }
}