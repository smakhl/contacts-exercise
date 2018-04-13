import React from 'react';
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import * as types from './actionTypes'
import contactsReducer from './contactsReducer'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

import ContactsList from './components/ContactsList.jsx'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(contactsReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)


store.subscribe(() => {
    console.log("Store updated!", store.getState());
});

class App extends React.Component {
    constructor() {
        super();
        this.addContact = this.addContact.bind(this);
    }



    addContact(e) {
        e.preventDefault();
        store.dispatch({
            type: types.ADD_CONTACT,
            newContact: {
                name: 'name',
                _id: new Date(),
                company: 'someComp'
            }
        })
    }

    render() {
        return (
            <div className="container">
                <button onClick={this.addContact}>Добавить контакт</button>
                <hr />
                <ContactsList />
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);