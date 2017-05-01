import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import {
  BrowserRouter as Router,
  browserHistory,
  Route,
  Link,
  Switch,
  HashRouter
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import reducers from './reducers';
import Root from './root';

const store = createStore(
  combineReducers({
    reducers,
    routing: routerReducer
  })
)

function renderDom(){
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter history={createBrowserHistory}>
                <Root />
            </HashRouter>
        </Provider>
        ,
        document.getElementById('app')
    );
}

renderDom();
