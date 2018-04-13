import * as types from './actionTypes'

const initialState = {
    contacts: [],
    error: null,
    fetching: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.newContact]
            };
        case types.FETCH_CONTACTS_SUCCEEDED:
            return {
                ...state,
                fetching: false,
                contacts: [...state.contacts, ...action.contacts]
            };
        case types.FETCH_CONTACTS_REQUESTED:
            return {
                ...state,
                fetching: true
            };
        case types.FETCH_CONTACTS_FAILED:
            return {
                ...state,
                fetching: false,
                error: action.error
            };
        case types.DELETE_CONTACT_SUCCEEDED:
            return {
                ...state,
                contacts: state.contacts.filter(co => co._id != action.contactId)
            };
        default:
            return state;
    }
}