/**
 * Created by user on 12.06.2017.
 */
let BoardsInitialState = [{
    id:1,
    name:'First board',
}];

export  default function (boards = BoardsInitialState, action) {
    switch (action.type) {
        case 'ADD_BOARD':
            return [...boards, action.payload]
        case 'REMOVE_BOARD':
        default:
            return boards;
    }
}