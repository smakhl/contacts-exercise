import React from 'react';
import ContactListItem from './ContactListItem.jsx';
import { connect } from 'react-redux';
import * as types from '../actionTypes'

class ContactsList extends React.Component {
    constructor() {
        super()
        this.onContactDelete = this.onContactDelete.bind(this)
        this.onContactEdit = this.onContactEdit.bind(this)
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
        return (
            <div>
                <button onClick={this.addContact}>Добавить контакт</button>
                <hr />
                {this.props.fetching ?
                    <h4>Загрузка...</h4> :
                    this.props.error ?
                        <div>
                            <h4>Ошибка подключения</h4>
                            <p>{this.props.error.message}</p>
                        </div>
                        :
                        this.props.contacts.map(co => <ContactListItem contact={co} key={co._id} onDelete={this.onContactDelete} onEdit={this.onContactEdit} />)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    contacts: state.contacts,
    fetching: state.fetching,
    error: state.error
})

export default connect(mapStateToProps)(ContactsList);