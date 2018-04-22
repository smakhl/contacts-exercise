import * as types from './actionTypes'
import merge from 'lodash/merge';


const initialState = {
    contacts: {},
    error: null,
    loading: false,
    loadingDetails: false,
    posting: false,
    currentUserId: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_CONTACT_REQUESTED:
            return {
                ...state,
                posting: false,
            };
        case types.ADD_CONTACT_SUCCEEDED:
            // console.log('ADD_CONTACT_SUCCEEDED', action)
            return {
                ...state,
                posting: false,
                contacts: {
                    ...state.contacts,
                    entities: merge({}, state.contacts.entities, action.contact.entities),
                    result: [...state.contacts.result, action.contact.result]
                }
            };
        case types.ADD_CONTACT_FAILED:
            return {
                ...state,
                posting: false,
                error: action.error
            };
        case types.FETCH_CONTACTS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                contacts: merge({}, state.contacts, action.contacts),
                currentUserId: action.contacts.result[Math.floor(Math.random() * action.contacts.result.length)]
            };
        case types.FETCH_CONTACTS_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_CONTACTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case types.DELETE_CONTACT_REQUESTED:
            return {
                ...state,
                loadingDetails: true
            };
        case types.DELETE_CONTACT_FAILED:
            return {
                ...state,
                loadingDetails: false,
                error: action.error
            };
        case types.DELETE_CONTACT_SUCCEEDED:
            return {
                ...state,
                loadingDetails: false,
                contacts: {
                    ...state.contacts,
                    result: state.contacts.result.filter(co => co != action.contactId)
                }
            };
        case types.FETCH_CONTACT_DETAILS_REQUESTED:
            return {
                ...state,
                loadingDetails: true
            };
        case types.FETCH_CONTACT_DETAILS_SUCCEEDED:
            return {
                ...state,
                loadingDetails: false,
                contacts: {
                    ...state.contacts,
                    entities: merge({}, state.contacts.entities, action.contactDetails.entities)
                }
            };
        case types.FETCH_CONTACT_DETAILS_FAILED:
            return {
                ...state,
                loadingDetails: false,
                error: action.error
            };
        case types.LIKE_CONTACT:
            return {
                ...state
            };
        case types.ADD_COMMENT_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case types.ADD_COMMENT_SUCCEDED:
            console.log('newComment', action.payload.newComment)
            console.log('contact', action.payload.contact)
            return {
                ...state,
                loading: false,
                contacts: {
                    ...state.contacts,
                    entities: merge({}, state.contacts.entities, action.payload.contact.entities)
                }
            };
        case types.ADD_COMMENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case types.EDIT_CONTACT_REQUESTED:
            return {
                ...state,
                posting: true
            };
        case types.EDIT_CONTACT_FAILED:
            return {
                ...state,
                posting: false,
                error: action.error
            };
        case types.EDIT_CONTACT_SUCCEEDED:
            // console.log('EDIT_CONTACT_SUCCEEDED', action)
            return {
                ...state,
                posting: false,
                contacts: {
                    ...state.contacts,
                    entities: merge({}, state.contacts.entities, action.contact.entities)
                }
            };
        default:
            return state;
    }
}