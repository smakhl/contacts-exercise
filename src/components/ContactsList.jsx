import React from 'react';
import Contact from './Contact.jsx';
import { connect } from 'react-redux';

class ContactsList extends React.Component {
    render() {
        return (
            <div>
                {this.props.contacts.map(co => <Contact contact={co} key={co._id} />)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    contacts: state.contacts
})

export default connect(mapStateToProps)(ContactsList);