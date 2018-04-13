import React from 'react';
import Contact from './Contact.jsx';
import { connect } from 'react-redux';
import * as types from '../actionTypes'

class ContactsList extends React.Component {
    constructor(){
        super()
        this.onContactDelete = this.onContactDelete.bind(this)
    }

    componentDidMount() {
        this.props.dispatch({
            type: types.FETCH_CONTACTS_REQUESTED
        })
    }

    onContactDelete(contact) {
        console.log('onContactDelete',contact)
        if (confirm(`Вы уверены, что хотите удалить ${contact.name}?`)){
            this.props.dispatch({
                type: types.DELETE_CONTACT_REQUESTED,
                contactId: contact._id
            })
        }
    }

    onContactEdit(contact) {
        console.log('onContactEdit',contact)
        // this.props.dispatch({
        //     type: types.REMOVE_CONTACT
        // })
    }

    render() {
        return (
            <div>
                {this.props.fetching ?
                    <h4>Загрузка...</h4> :
                    this.props.error ?
                        <div>
                            <h4>Ошибка подключения</h4>
                            <p>{this.props.error.message}</p>
                        </div>
                        :
                        this.props.contacts.map(co => <Contact contact={co} key={co._id} onDelete={this.onContactDelete} onEdit={this.onContactEdit} />)
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