/**
 * Created by user on 12.06.2017.
 */

const ADD_CARD = 'ADD_CARD';
const REMOVE_CARD = 'REMOVE_CARD';
const RENAME_CARD = 'RENAME_CARD';
const CHANGE_CARD_POS = 'CHANGE_CARD_POS';

export function addCardAction( columnId = 0, cardTitle = 'New Card') {
    return {
        type: ADD_CARD,
        payload: {
            id: +(new Date()),
            title: cardTitle,
            columnId: columnId,
            order:0
        }
    }
}

export function changeCardPosAction(cardId, newColumnId, newColumnOrder) {
    return {
        type: CHANGE_CARD_POS,
        payload: {
            cardId,
            newColumnId,
            newColumnOrder
        }
    }
}
