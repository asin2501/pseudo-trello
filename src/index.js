import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Route, Router, hashHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import './styles/index.css';


import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import LocalStore from './components/local-store';

import BoardsList from './components/boards-list';
import Board from './components/board';


const localStore = new LocalStore('trello-local-store');

let store = createStore(reducer, localStore.get(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const history = syncHistoryWithStore(hashHistory, store);

localStore.subscribe(store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={BoardsList}/>
                <Route path="board/:id" component={Board}/>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();


