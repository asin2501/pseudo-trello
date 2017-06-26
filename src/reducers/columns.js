/**
 * Created by user on 12.06.2017.
 */

let columnsInitialState = [
//     {
//     id:'1',
//     name:'First column'
// }
];

export  default function (store = columnsInitialState, action) {
    switch (action.type) {
        // case 'ADD_BOARD':
        //     return [...store.boards, {name: action.payload, columns: [],}]
        // case 'REMOVE_BOARD':
        default:
            return store;
    }
}