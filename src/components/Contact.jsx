import React from 'react'

const Contact = (props) => {
    return (
        <div className="card mb-3">
            <div className="card-header">
                {props.contact.name}
            </div>
            <div className="card-body">
                <p className="card-text">{props.contact.company}, {props.contact.jobTitle}</p>
                <div>
                    <a href="#" className="btn btn-primary btn-sm" style={{ marginRight: 5 + 'px' }}>Edit</a>
                    <a href="#" className="btn btn-danger btn-sm">Remove</a>
                </div>
            </div>
        </div>
    )
}


export default Contact;