import * as types from './actionTypes'

export function fetchContactsList() {
    return {
        type: types.FETCH_CONTACTS_REQUESTED
    }
}

export function fetchContactDetails(contactId) {
    return {
        type: types.FETCH_CONTACT_DETAILS_REQUESTED,
        contactId
    }
}

export function addContact(newContact) {
    return {
        type: types.ADD_CONTACT,
        newContact
    }
}