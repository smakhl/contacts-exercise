import React from 'react'
import ContactsList from './ContactsList.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contact from './Contact.jsx';
import { connect } from 'react-redux';
import NavBar from './NavBar.jsx'
import CreateContact from './CreateContact.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <NavBar currentUser={this.props.currentUserId && this.props.contacts.entities.contacts[this.props.currentUserId].name} />
                    <Switch>
                        <Route exact path="/" component={ContactsList} />
                        <Route exact path="/contact/add" component={CreateContact} />
                        <Route path="/contact/:id" component={Contact} />
                    </Switch>
                </div>
            </Router>
        )
    }


}

const mapStateToProps = (state) => ({
    currentUserId: state.currentUserId,
    contacts: state.contacts
})

export default connect(mapStateToProps)(App);