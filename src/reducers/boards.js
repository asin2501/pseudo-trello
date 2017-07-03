/**
 * Created by user on 12.06.2017.
 */
let BoardsInitialState = {
    boardIdList: [1],
    boards: {
        1: {
            id: 1,
            name: 'First board',
            columns: [],
        }
    }
};

export  default function (boards = BoardsInitialState, action) {
    let newBoards = {};
    switch (action.type) {
        case 'ADD_BOARD':
            return {
                boardIdList: [...boards.boardIdList, action.payload.id],
                boards: Object.assign({}, boards.boards, {[action.payload.id]: action.payload})
            };
            break;
        case 'ADD_COLUMN':
            newBoards = {boardIdList: [...boards.boardIdList], boards: Object.assign({}, boards.boards)};
            newBoards.boards[action.payload.boardId].columns.push(action.payload.id);
            return newBoards;
            break;
        case 'REMOVE_BOARD':
            newBoards = {boardIdList: [...boards.boardIdList], boards: Object.assign({}, boards.boards)};
            let index = newBoards.boardIdList.indexOf(action.payload);
            let removingId = newBoards.boardIdList[index];
            delete newBoards.boards[removingId];

            //TODO: remove all cards and columns
            newBoards.boardIdList.splice(index, 1);
            return newBoards;

            break;
        default:
            return boards;
    }
}