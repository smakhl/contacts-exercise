import React from 'react'
import ContactsList from './ContactsList.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contact from './Contact.jsx';
import { connect } from 'react-redux';
import NavBar from './NavBar.jsx'
import AddContact from './AddContact.jsx';
import { fetchContactsList } from '../actions';
import EditContact from './EditContact.jsx'

const mapStateToProps = (state) => ({
    currentUserId: state.data.currentUserId,
    contacts: state.data.contacts
})

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchContactsList())
    }

    render() {
        const currentUserName = this.props.currentUserId ? this.props.contacts.entities.contacts[this.props.currentUserId].name : null
        return (
            <Router>
                <div className="container">
                    <NavBar currentUser={currentUserName} />
                    <Switch>
                        <Route exact path="/" component={ContactsList} />
                        <Route exact path="/contact/add" component={AddContact} />
                        <Route path="/contact/edit/:id" component={EditContact} />
                        <Route path="/contact/:id" component={Contact} />
                    </Switch>
                </div>
            </Router>
        )
    }


}

export default connect(mapStateToProps)(App);