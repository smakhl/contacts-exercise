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

export function addContact(payload) {
    return {
        type: types.ADD_CONTACT_REQUESTED,
        payload
    }
}

export function editContact(contactId, editedContact, resolve, reject) {
    return {
        type: types.EDIT_CONTACT_REQUESTED,
        payload: {
            editedContact,
            contactId,
            resolve,
            reject
        }
    }
}

export function addComment(contactId, newComment) {
    return {
        type: types.ADD_COMMENT_REQUESTED,
        payload: {
            newComment,
            contactId
        }
    }
}

export function deleteContact(payload) {
    return {
        type: types.DELETE_CONTACT_REQUESTED,
        payload
    }
}

