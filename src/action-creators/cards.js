/**
 * Created by user on 12.06.2017.
 */

const ADD_CARD = 'ADD_CARD';
const REMOVE_CARD = 'REMOVE_CARD';
const RENAME_CARD = 'RENAME_CARD';
const CHANGE_CARD_POS = 'CHANGE_CARD_POS';
const CHANGE_CARD_DESCRIPTION = 'CHANGE_CARD_DESCRIPTION';
const CHANGE_CARD_TITLE = 'CHANGE_CARD_TITLE';

export function changeCardTitleAction(id, newTitle) {
    // console.log(newTitle);
    return {
        type: CHANGE_CARD_TITLE,
        payload: {
            id,
            newTitle
        }
    }
}

export function changeCardDescriptionAction(id, newDescription) {
    return {
        type: CHANGE_CARD_DESCRIPTION,
        payload: {
            id,
            newDescription
        }
    }
}

export function addCardAction(columnId = 0, cardTitle = 'New Card') {
    return {
        type: ADD_CARD,
        payload: {
            id: +(new Date()),
            createdDate: +(new Date()),
            title: cardTitle,
            description: '',
            columnId: columnId,
            order: 0
        }
    }
}

export function removeCardAction(cardId) {
    return {
        type: REMOVE_CARD,
        payload: cardId
    }
}

export function changeCardPosAction(cardId, newColumnId, newOrder) {
    return {
        type: CHANGE_CARD_POS,
        payload: {
            cardId,
            newColumnId,
            newOrder
        }
    }
}

