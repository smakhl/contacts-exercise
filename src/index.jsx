import React from 'react';
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as types from './actionTypes'
import contactsReducer from './contactsReducer'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

import ContactsList from './components/ContactsList.jsx'
import App from './components/App.jsx'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(contactsReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

store.subscribe(() => {
    console.log("Store updated!", store.getState());
});


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);