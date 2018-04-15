import { put, takeLatest, all, call } from 'redux-saga/effects'
import axios from "axios";

import * as types from './actionTypes'


function* fetchContacts() {
    try {
        const data = yield call(axios, "/api/contacts")
        yield put({ type: types.FETCH_CONTACTS_SUCCEEDED, contacts: data.data })
    } catch (error) {
        yield put({ type: types.FETCH_CONTACTS_FAILED, error })
    }
}

function* deleteContact(action) {
    try {
        console.log('delete triggered', action.contactId)
        yield call([axios, axios.delete], "/api/contacts/" + action.contactId)
        yield put({ type: types.DELETE_CONTACT_SUCCEEDED, contactId: action.contactId })
    } catch (error) {
        yield put({ type: types.DELETE_CONTACT_FAILED, error })
    }
}

function* fetchContactDetails(action) {
    try {
        // console.log('fetchContactDetails',action.contactId)
        const data = yield call(axios, "/api/contacts/" + action.contactId)
        yield put({ type: types.FETCH_CONTACT_DETAILS_SUCCEEDED, contact: data.data })
    } catch (error) {
        yield put({ type: types.FETCH_CONTACT_DETAILS_FAILED, error })
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

export default function* rootSaga() {
    yield all([
        watchFetchContacts(),
        watchDeleteContact(),
        watchFetchContactDetails()
    ])
}