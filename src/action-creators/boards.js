/**
 * Created by user on 12.06.2017.
 */

const ADD_BOARD = 'ADD_BOARD';
const REMOVE_BOARD = 'REMOVE_BOARD';
const RENAME_BOARD = 'RENAME_BOARD';

const ADD_COLUMN = 'ADD_COLUMN';

export function addBoard(boardName = 'New Board') {
    return {
        type: ADD_BOARD,
        payload: {
            id: +(new Date()),
            name: boardName
        }
    }
}

