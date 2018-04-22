import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { addContact } from '../actions'
import ContactForm from './ContactForm.jsx';
import { reduxForm } from 'redux-form'

const EditContactForm = reduxForm({ form: 'addContact' })(ContactForm)

const mapStateToProps = (state) => ({
    loading: state.data.loading,
    error: state.data.error,
    contacts: state.data.contacts,
    posting: state.data.posting,
    form: state.form.editContact,
})

class AddContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doneSaving: false
        }
    }

    submit = values => {
        return new Promise((resolve, reject) => {
            this.props.dispatch(addContact({ newContact: values, resolve, reject }))
        }).then((data) => { this.setState({ doneSaving: true }); console.log(data) }).catch(err => console.error(err))
    }

    render() {
        if (this.props.loading)
            return <h3>Загрузка...</h3>

        if (this.props.error)
            return <h3>{this.props.error.message}</h3>

        return (
            <div>
                <EditContactForm onSubmit={this.submit} />
                {this.state.doneSaving && <Redirect to={"/"} />}
            </div>
        )
    }
}

export default connect(mapStateToProps)(AddContact);