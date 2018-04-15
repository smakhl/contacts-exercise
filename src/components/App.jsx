import React from 'react'
import ContactsList from './ContactsList.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Contact from './Contact.jsx';
import * as types from '../actionTypes'
import { connect } from 'react-redux';
import NavBar from './NavBar.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.addContact = this.addContact.bind(this);
        this.props.dispatch({
            type: types.FETCH_CONTACTS_REQUESTED
        })
    }
    
    addContact(e) {
        e.preventDefault();
        store.dispatch({
            type: types.ADD_CONTACT,
            newContact: {
                name: 'name',
                _id: new Date(),
                company: 'someComp'
            }
        })
    }

    render() {
        return (
            <Router>
                <div className="container">
                <NavBar currentUser={this.props.currentUser}/>
                    <Route exact path="/" component={ContactsList} />
                    <Route exact path="/contact" component={Contact} />
                    <Route path="/contact/:id" component={Contact} />
                </div>
            </Router>
        )
    }


}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

export default connect(mapStateToProps)(App);