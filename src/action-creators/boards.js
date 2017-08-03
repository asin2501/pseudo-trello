/**
 * Created by user on 12.06.2017.
 */
import settings from "../settings.json";

const ADD_BOARD = 'ADD_BOARD';
const REMOVE_BOARD = 'REMOVE_BOARD';
const RENAME_BOARD = 'RENAME_BOARD';
const SET_FAVORITE_STATUS = 'SET_FAVORITE_STATUS';
const SET_COLOR = 'SET_COLOR';

const ADD_COLUMN = 'ADD_COLUMN';

export function addBoardAction(boardName = 'New Board') {
    return {
        type: ADD_BOARD,
        payload: {
            id: +(new Date()),
            name: boardName,
            columns: [],
            favorite: false,
            color: settings.boardColor
        }
    }
}

export function setFavoriteStatusAction(boardId, status) {
    return {
        type: SET_FAVORITE_STATUS,
        payload: {boardId, status}
    }
}

export function removeBoardAction(id) {
    return {
        type: REMOVE_BOARD,
        payload: id
    }
}

export function setColorAction(color, boardId) {
    return {
        type: SET_COLOR,
        payload: {
            color,
            boardId
        }
    }
}

