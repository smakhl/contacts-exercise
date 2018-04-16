import * as types from './actionTypes'

const initialState = {
    contacts: [],
    error: null,
    fetching: false,
    openContact: {},
    currentUser: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.newContact]
            };
        case types.ADD_CONTACT_REQUESTED:
            return {
                ...state,
                fetching: true
            };
        case types.ADD_CONTACT_SUCCEEDED:
            return {
                ...state,
                fetching: false,
                contacts: [...state.contacts, action.newContact]
            };
        case types.ADD_CONTACT_FAILED:
            return {
                ...state,
                fetching: false,
                error: action.error
            };
        case types.FETCH_CONTACTS_SUCCEEDED:
            return {
                ...state,
                fetching: false,
                contacts: action.contacts,
                currentUser: action.contacts[action.contacts.length - 1]
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
        case types.FETCH_CONTACT_DETAILS_REQUESTED:
            console.log('FETCH_CONTACT_DETAILS_REQUESTED')
            return {
                ...state,
                fetching: true
            };
        case types.FETCH_CONTACT_DETAILS_SUCCEEDED:
            return {
                ...state,
                fetching: false,
                openContact: action.contact
            };
        case types.FETCH_CONTACT_DETAILS_FAILED:
            return {
                ...state,
                fetching: false,
                error: action.error
            };
        case types.COMMENT_CONTACT:
            const openContact = {
                ...state.openContact,
                comments: [...state.openContact.comments, { ...action.comment, by: { name: state.currentUser.name } }]
            }
            const contacts = [...state.contacts.filter(co => co._id != openContact._id), openContact]
            return {
                ...state,
                openContact,
                contacts
            };
        case types.LIKE_CONTACT:
            return {
                ...state
            };
        default:
            return state;
    }
}