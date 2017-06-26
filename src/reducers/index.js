/**
 * Created by user on 12.06.2017.
 */
import {combineReducers} from 'redux';
import cardsReducer from './cards';
import boardsReducer from './boards';
import columnsReducer from './columns';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    boards:boardsReducer,
    cards:cardsReducer,
    columns:columnsReducer
});


// const initialState = {
//     boards: [
//         {
//             name: 'first',
//             columns: [],
//         }
//     ]
// }
