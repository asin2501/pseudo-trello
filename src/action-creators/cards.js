/**
 * Created by user on 12.06.2017.
 */

const ADD_CARD = 'ADD_CARD';
const REMOVE_CARD = 'REMOVE_CARD';
const RENAME_CARD = 'RENAME_CARD';
const MOOVE_CARD = 'MOOVE_CARD';

export function addCardAction( columnId = 0, cardTitle = 'New Card') {
    return {
        type: ADD_CARD,
        payload: {
            id: +(new Date()),
            cardTitle: cardTitle,
            columnId: columnId
        }
    }
}