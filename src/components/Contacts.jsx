import React from 'react';
import Contact from './Contact.jsx'

export default class Contacts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            response: []
        }
    }

    componentDidMount() {
        fetch("/api/contacts")
            .then(r => {
                r.json().then(contacts => {
                    console.log('state',contacts.map(co => co.name))
                    this.setState({ response: contacts.map(co => co.name) })
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div>
                {this.state.response}
                <Contact />
            </div>
        )
    }
}