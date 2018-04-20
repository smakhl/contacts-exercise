import * as types from './actionTypes'
import merge from 'lodash/merge';


const initialState = {
    contacts: {},
    error: null,
    loading: false,
    loadingDetails: false,
    openContact: {},
    currentUserId: ''
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
                loading: true
            };
        case types.ADD_CONTACT_SUCCEEDED:
            return {
                ...state,
                loading: false,
                contacts: [...state.contacts, action.newContact]
            };
        case types.ADD_CONTACT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case types.FETCH_CONTACTS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                contacts: action.contacts,
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
        case types.DELETE_CONTACT_SUCCEEDED:
            return {
                ...state,
                contacts: state.contacts.filter(co => co._id != action.contactId)
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
                // contactDetails

                // contacts: state.contacts.map((co) => {
                //     if (co._id === action.contact._id) {
                //         return action.contact
                //     } else {
                //         return co
                //     }
                // })
            };
        case types.FETCH_CONTACT_DETAILS_FAILED:
            return {
                ...state,
                loadingDetails: false,
                error: action.error
            };
        case types.COMMENT_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(co => {
                    if (co._id === action.thisContactId) {
                        return {
                            ...co,
                            comments: [
                                ...co.comments,
                                ...action.comment
                            ]
                        }
                    } else
                        return co
                })
            };
        case types.LIKE_CONTACT:
            return {
                ...state
            };
        default:
            return state;
    }
}