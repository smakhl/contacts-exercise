import { put, takeLatest, all, call } from 'redux-saga/effects'
import axios from "axios";
import { contactNormalizr, contactsListNormalizr } from './contactsNormalizr'

import * as types from './actionTypes'


function* fetchContacts() {
    try {
        const data = yield call(axios, "/api/contacts")
        const normalizedData = contactsListNormalizr(data.data)
        yield put({ type: types.FETCH_CONTACTS_SUCCEEDED, contacts: normalizedData })
    } catch (error) {
        yield put({ type: types.FETCH_CONTACTS_FAILED, error })
    }
}

function* deleteContact(action) {
    const {contactId, resolve, reject} = action.payload
    try {
        console.log('delete triggered', contactId)
        yield call([axios, axios.delete], "/api/contacts/" + contactId)
        yield put({ type: types.DELETE_CONTACT_SUCCEEDED, contactId })
        resolve()
    } catch (error) {
        yield put({ type: types.DELETE_CONTACT_FAILED, error })
        reject(error)
    }
}

function* fetchContactDetails(action) {
    try {
        // console.log('fetchContactDetails',action.contactId)
        const data = yield call(axios, "/api/contacts/" + action.contactId)
        const normalizedData = contactNormalizr(data.data)
        yield put({ type: types.FETCH_CONTACT_DETAILS_SUCCEEDED, contactDetails: normalizedData })
    } catch (error) {
        yield put({ type: types.FETCH_CONTACT_DETAILS_FAILED, error })
    }
}

function* addContact(action) {
    try {
        console.log(action)
        const response = yield call([axios, axios.post], "/api/contacts/", action.payload.newContact)
        yield put({ type: types.ADD_CONTACT_SUCCEEDED, contact: contactNormalizr(response.data) })
        action.payload.resolve(contactNormalizr(response.data))
    } catch (error) {
        yield put({ type: types.ADD_CONTACT_FAILED, error })
        action.payload.reject(error)
    }
}

function* editContact(action) {
    try {
        // console.log('editContact',action.payload)
        const response = yield call([axios, axios.put], "/api/contacts/" + action.payload.contactId, action.payload.editedContact)
        yield put({ type: types.EDIT_CONTACT_SUCCEEDED, contact: contactNormalizr(response.data) })
        action.payload.resolve(response.data)
    } catch (error) {
        yield put({ type: types.EDIT_CONTACT_FAILED, error })
        action.payload.reject(error)
    }
}

function* addComment(action) {
    try {
        // console.log('newComment',action.payload.newComment)
        const response = yield call([axios, axios.post], "/api/postComment/" + action.payload.contactId, action.payload.newComment);
        yield put({ type: types.ADD_COMMENT_SUCCEDED, payload: {
            contact: contactNormalizr(response.data),
            newComment: action.payload.newComment
        } })
    } catch (error) {
        yield put({ type: types.ADD_COMMENT_FAILED, error })
    }
}


function* watchFetchContacts() {
    yield takeLatest(types.FETCH_CONTACTS_REQUESTED, fetchContacts)
}

function* watchDeleteContact() {
    yield takeLatest(types.DELETE_CONTACT_REQUESTED, deleteContact)
}

function* watchFetchContactDetails() {
    yield takeLatest(types.FETCH_CONTACT_DETAILS_REQUESTED, fetchContactDetails)
}

function* watchAddContact() {
    yield takeLatest(types.ADD_CONTACT_REQUESTED, addContact)
}

function* watchAddComment() {
    yield takeLatest(types.ADD_COMMENT_REQUESTED, addComment)
}

function* watchEditContact() {
    yield takeLatest(types.EDIT_CONTACT_REQUESTED, editContact)
}

export default function* rootSaga() {
    yield all([
        watchFetchContacts(),
        watchDeleteContact(),
        watchFetchContactDetails(),
        watchAddContact(),
        watchAddComment(),
        watchEditContact() 
    ])
}