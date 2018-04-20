import React from 'react';
import { Link } from 'react-router-dom'
import ContactListItem from './ContactListItem.jsx';
import { connect } from 'react-redux';
import * as types from '../actionTypes'
import { fetchContactsList } from '../actions'


class ContactsList extends React.Component {
    constructor(props) {
        super(props)
        this.onContactDelete = this.onContactDelete.bind(this)
        this.onContactEdit = this.onContactEdit.bind(this)

    }

    componentDidMount() {
        this.props.dispatch(fetchContactsList())
    }

    onContactDelete(contact) {
        console.log('onContactDelete', contact)
        if (confirm(`Вы уверены, что хотите удалить ${contact.name}?`)) {
            this.props.dispatch({
                type: types.DELETE_CONTACT_REQUESTED,
                contactId: contact._id
            })
        }
    }

    onContactEdit(contact) {
        console.log('onContactEdit', contact)
        // this.props.dispatch({
        //     type: types.REMOVE_CONTACT
        // })
    }

    render() {
        const { loading, error, contacts } = this.props;

        if (loading)
            return <h4>Загрузка...</h4>;

        if (error)
            return (
                <div>
                    <h4>Ошибка подключения</h4>
                    <p>{error.message}</p>
                </div>
            )

        return (
            <div>
                <Link className="btn btn-primary" to={'/contact/add'}>Добавить контакт</Link>
                <hr />
                {
                    contacts.result && contacts.result
                        // .sort((a, b) => {
                        //     var textA = a.name.toUpperCase();
                        //     var textB = b.name.toUpperCase();
                        //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                        // })
                        .map(co => {
                            const contact = contacts.entities.contacts[co];
                            return <ContactListItem contact={contact} key={contact._id} onDelete={this.onContactDelete} onEdit={this.onContactEdit} />
                        })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    contacts: state.contacts,
    loading: state.loading,
    error: state.error
})

export default connect(mapStateToProps)(ContactsList);