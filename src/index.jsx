import React from 'react';
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import * as types from './actionTypes'
import contactsReducer from './contactsReducer'
import { reducer as formReducer } from 'redux-form'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

import ContactsList from './components/ContactsList.jsx'
import App from './components/App.jsx'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    data: contactsReducer,
    form: formReducer
})

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga)

// store.subscribe(() => {
//     console.log("Store updated!", store.getState());
// });


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);