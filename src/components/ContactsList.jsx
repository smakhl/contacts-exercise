import React from 'react';
import { Link } from 'react-router-dom'
import ContactListItem from './ContactListItem.jsx';
import { connect } from 'react-redux';
import * as types from '../actionTypes'
import { fetchContactsList } from '../actions'


class ContactsList extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        // this.props.dispatch(fetchContactsList())
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
                {
                    contacts.result && contacts.result
                        // .sort((a, b) => {
                        //     var textA = a.name.toUpperCase();
                        //     var textB = b.name.toUpperCase();
                        //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                        // })
                        .map(co => {
                            const contact = contacts.entities.contacts[co];
                            return <ContactListItem contact={contact} key={contact._id} onLike={this.onContactLike} />
                        })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    contacts: state.data.contacts,
    loading: state.data.loading,
    error: state.data.error
})

export default connect(mapStateToProps)(ContactsList);