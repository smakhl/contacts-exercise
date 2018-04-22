import React from 'react';
import { Field } from 'redux-form'

const ContactForm = props => {
    const { handleSubmit, pristine, submitting } = props

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={submitting}>
                <div className="form-group">
                    <label htmlFor='name'>ФИО</label>
                    <Field name="name" component='input' type='text' required className="form-control" />
                </div>
                <div className="form-group">
                    <label>Компания</label>
                    <Field name="company" component='input' type='text' required className="form-control" />
                </div>
                <div className="form-group">
                    <label>Должность</label>
                    <Field name="jobTitle" component='input' type='text' required className="form-control" />
                </div>
                <div className="form-group">
                    <label>Номер телефона</label>
                    <Field name="phoneNumber" component='input' type='text' required className="form-control" />
                </div>
                <input className="btn btn-primary" disabled={pristine || submitting} type="submit" value="Сохранить" />
            </fieldset>
        </form>
    )
}


export default ContactForm