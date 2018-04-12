import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import * as types from './actions'

import ContactsList from './components/ContactsList.jsx'

const initialState = {
    contacts: []
}

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, { name: action.name }]
            };
        case 'LOAD_CONTACTS':
            return {
                ...state,
                contacts: [...state.contacts, ...action.contacts]
            };
        default:
            return state;
    }
}

const store = createStore(contactsReducer)

store.subscribe(() => {
    console.log("Store updated!", store.getState());
});

class App extends React.Component {
    componentDidMount() {
        fetch("/api/contacts")
            .then(r => {
                r.json().then(loadedData => {
                    store.dispatch({
                        type: 'LOAD_CONTACTS',
                        contacts: loadedData
                    })
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="container">
                Add contact
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