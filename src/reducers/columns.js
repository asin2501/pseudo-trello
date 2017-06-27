/**
 * Created by user on 12.06.2017.
 */

let columnsInitialState = [
//     {
//     id:'1',
//     name:'First column'
// }
];

export  default function (columns = columnsInitialState, action) {
    switch (action.type) {
        case 'ADD_COLUMN':
            // console.log(action.payload, store.columns);
            // console.log([...store.columns, action.payload]);
            return [...columns, action.payload];
            // return [...store.columns, action.payload];
        // case 'REMOVE_BOARD':
        default:
            return columns;
    }
}