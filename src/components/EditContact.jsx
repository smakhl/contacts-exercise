import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { editContact } from '../actions'
import ContactForm from './ContactForm.jsx';
import { reduxForm } from 'redux-form'

const EditContactForm = reduxForm({ form: 'editContact' })(ContactForm)

const mapStateToProps = (state) => ({
    loading: state.data.loading,
    error: state.data.error,
    contacts: state.data.contacts,
    posting: state.data.posting,
    form: state.form.editContact,
})

class EditContact extends React.Component {
    constructor(props) {
        super(props);
        this.urlId = this.props.match.params.id
        this.state = {
            doneSaving: false
        }
    }

    submit = values => {
        const fields = this.props.form.fields
        const editedContact = {}
        Object.keys(fields).map(f => editedContact[f] = values[f]);
        return new Promise((resolve, reject) => {
            this.props.dispatch(editContact(this.urlId, editedContact, resolve, reject))
        }).then(() => this.setState({doneSaving: true})).catch(err => console.log(err))
    }

    render() {
        if (this.props.loading)
            return <h3>Загрузка...</h3>

        if (this.props.error)
            return <h3>{this.props.error.message}</h3>

        return (
            <div>
                <EditContactForm onSubmit={this.submit} initialValues={this.props.contacts.entities && this.props.contacts.entities.contacts[this.urlId]} />
                {this.state.doneSaving && <Redirect to={"/contact/" + this.urlId} />}
            </div>
        )
    }
}

export default connect(mapStateToProps)(EditContact);