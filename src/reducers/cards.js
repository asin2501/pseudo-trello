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
        case 'REMOVE_COLUMN':
            return removeColumn(cards, action);
        case 'CHANGE_CARD_POS':
            return changeCardPos(cards, action);
        default:
            return cards;
    }
}

function changeCardPos(cards, action) {
    //cardId, newColumnId, newOrder
    let cardId = action.payload.cardId;
    let newCards = helpers.copyObject(cards);
    let oldOrder = newCards[cardId].order;
    let newOrder = action.payload.newOrder;
    let oldColumnId = newCards[action.payload.cardId].columnId;
    let newColumnId = action.payload.newColumnId;
    let oldColumnCardIdMap = store.getState().columns[oldColumnId].cards;
    let newColumnCardIdMap = store.getState().columns[newColumnId].cards;

    if (newColumnId === oldColumnId) {
        oldColumnCardIdMap.forEach((cardId) => {
            let card = newCards[cardId];
            if (oldOrder > action.payload.newOrder) {
                if (card.order >= action.payload.newOrder && card.order <= oldOrder) {
                    card.order++;
                }
            } else {
                if (card.order <= action.payload.newOrder && card.order >= oldOrder) {
                    card.order--;
                }
            }
        });
        newCards[cardId].order = newOrder;
    } else {
        newColumnCardIdMap.forEach((cardId) => {
            let card = newCards[cardId];
            if (card.order >= newOrder) {
                card.order++;
            }
        });

        oldColumnCardIdMap.forEach((cardId) => {
            let card = newCards[cardId];
            if (card.order >= oldOrder) {
                card.order--;
            }
        });

        newCards[cardId].order = newOrder;
        newCards[action.payload.cardId].columnId = action.payload.newColumnId;
    }

    return newCards;
}

function addCard(cards, action) {
    let newCards = helpers.copyObject(cards);

    newCards[action.payload.id] = action.payload;

    newCards[action.payload.id].order = store.getState().columns[action.payload.columnId].cards.length;
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

function removeColumn(cards, action) {
    let newCards = helpers.copyObject(cards);

    store.getState().columns[action.payload].cards.forEach(cardId => {
        delete newCards[cardId];
    });

    return newCards;
}