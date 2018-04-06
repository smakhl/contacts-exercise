import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import * as types from './actions'

import Contacts from './components/Contacts'

const initialState = {
    contacts: [
        {
            name: 'user'
        },
        {
            name: 'user2'
        }
    ]
}

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_CONTACT:
            return {...state, contacts: [...state.contacts, {name: action.name}] };
        default:
            return state;
    }
}

const store = createStore(contactsReducer)

store.subscribe(() => {
    console.log("Store updated!", store.getState());
});

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <div>Добавить контакт</div>
                        <Contacts />
                    </div>
                </div>
                <hr />
            </div>
        )
    }
}

store.dispatch({
    type: types.ADD_CONTACT,
    name: 'jack'
});

store.dispatch({
    type: types.ADD_CONTACT,
    name: 'jill'
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);