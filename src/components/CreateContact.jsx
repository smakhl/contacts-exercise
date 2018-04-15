import React from 'react'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaComment from 'react-icons/lib/fa/comment';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as types from '../actionTypes'
import axios from "axios";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            newContact: {
                name: '',
                jobTitle: '',
                company: '',
                phoneNumber: '',
            },
            posting: false,
            newContactAdded: false
        }

    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({ posting: true });
        axios.post('/api/contacts', this.state.newContact).then(r => {
            this.props.dispatch({
                type: types.ADD_CONTACT,
                newContact: r.data
            })
            this.setState({ posting: false, newContactAdded: true });
        })
        .catch(err => {console.error(err); this.setState({ posting: false })})
    }

    handleChange(e) {
        this.setState({
            newContact: {
                ...this.state.newContact,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset disabled={this.props.fetching ? "disabled" : ""}>
                    <div className="form-group">
                        <label>ФИО</label>
                        <input type="text" onChange={this.handleChange} name="name" value={this.state.name} className="form-control" placeholder="Иванов Иван" required />
                    </div>
                    <div className="form-group">
                        <label>Компания</label>
                        <input type="text" onChange={this.handleChange} name="company" value={this.state.company} className="form-control" placeholder="ОАО Компания" required />
                    </div>
                    <div className="form-group">
                        <label>Должность</label>
                        <input type="text" onChange={this.handleChange} name="jobTitle" value={this.state.jobTitle} className="form-control" placeholder="Ведущий инженер" required />
                    </div>
                    <div className="form-group">
                        <label>Номер телефона</label>
                        <input type="text" onChange={this.handleChange} name="phoneNumber" value={this.state.phoneNumber} className="form-control" placeholder="+7 000 000 0000" required />
                    </div>
                    <input className="btn btn-primary" type="submit" value="Сохранить" />
                </fieldset>
                {this.state.newContactAdded && <Redirect to="/"/>}
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    fetching: state.fetching,
    error: state.error
})

export default connect(mapStateToProps)(Contact);