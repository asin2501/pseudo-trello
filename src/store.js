/**
 * Created by 2501 on 03.07.2017.
 */

import {createStore} from 'redux';

import reducer from './reducers';
import LocalStore from './components/local-store';

const localStore = new LocalStore('trello-local-store');

const store = createStore(reducer, localStore.get(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

localStore.subscribe(store);

export default store;