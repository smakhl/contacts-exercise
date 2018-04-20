import React from 'react'
import ContactsList from './ContactsList.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contact from './Contact.jsx';
import { fetchContactsList } from '../actions'
import { connect } from 'react-redux';
import NavBar from './NavBar.jsx'
import CreateContact from './CreateContact.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(fetchContactsList())
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <NavBar currentUser={this.props.currentUser} />
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
    currentUser: state.currentUser
})

export default connect(mapStateToProps)(App);