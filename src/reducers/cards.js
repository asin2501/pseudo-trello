/**
 * Created by user on 12.06.2017.
 */
/**
 * Created by user on 12.06.2017.
 */
let cardsInitialState = {
//     {
//     id:'1',
//     name:'First card',
//     boardID:1,
//     columnId:1,
//     order:1
// }
};

export  default function (cards = cardsInitialState, action) {
    switch (action.type) {
        case 'ADD_CARD':
            return Object.assign({}, cards, {[action.payload.id]:action.payload});
        default:
            return cards;
    }
}