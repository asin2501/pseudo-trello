/**
 * Created by user on 12.06.2017.
 */
import store from '../store';
import helpers from '../utils/helpers';
let BoardsInitialState = {
    boardIdList: [1],
    boards: {
        1: {
            id: 1,
            name: 'First board',
            columns: [],
            favorite: false,
            color: "#5EA5BC"
        }
    }
};

export  default function (boards = BoardsInitialState, action) {
    switch (action.type) {
        case 'ADD_BOARD':
            return addBoard(boards, action);
        case 'SET_FAVORITE_STATUS':
            return setFavoriteStatus(boards, action);
        case 'ADD_COLUMN':
            return addColumn(boards, action);
        case 'REMOVE_COLUMN':
            return removeColumn(boards, action);
        case 'REMOVE_BOARD':
            return removeBard(boards, action);
        default:
            return boards;
    }
}

function setFavoriteStatus(boards, action) {
    let newBoards = helpers.copyObject(boards);
    newBoards.boards[action.payload.boardId].favorite = !newBoards.boards[action.payload.boardId].favorite;
    return newBoards;
}

function addBoard(boards, action) {
    let newBoards = helpers.copyObject(boards);
    newBoards.boardIdList.push(action.payload.id);
    newBoards.boards[action.payload.id] = action.payload;
    return newBoards;
}

function removeBard(boards, action) {
    let newBoards = helpers.copyObject(boards);
    let index = newBoards.boardIdList.indexOf(action.payload);
    let removingId = newBoards.boardIdList[index];
    delete newBoards.boards[removingId];
    newBoards.boardIdList.splice(index, 1);
    return newBoards;
}

function removeColumn(boards, action) {
    let boardId = store.getState().columns[action.payload].boardId;
    let newBoards = helpers.copyObject(boards);
    let index = newBoards.boards[boardId].columns.indexOf(action.payload);
    newBoards.boards[boardId].columns.splice(index, 1);
    return newBoards;
}

function addColumn(boards, action) {
    let newBoards = helpers.copyObject(boards);
    newBoards.boards[action.payload.boardId].columns.push(action.payload.id);
    // newBoards.boards = {};
    // console.log(newBoards, boards);
    return newBoards;
}
