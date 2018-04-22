import { createSelector } from 'reselect';

const getComments = (state, props) => {
    const contactId = props.match.params.id;
    const contact = state.contacts.entities.contacts[contactId]
}