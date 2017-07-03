import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Route, Router, hashHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import './styles/index.css';

import {Provider} from 'react-redux';
import store from './store';
import BoardsList from './components/boards-list';
import Board from './components/board';
import Card from './components/card';




const history = syncHistoryWithStore(hashHistory, store);


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={BoardsList}/>
                <Route path="board/:boardId" component={Board}>
                    <Route path=":cardId" component={Card}/>
                </Route>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();


