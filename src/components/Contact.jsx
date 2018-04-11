import React from 'react'

const Contact = ({ name = 'Имя', jobTitle = "Профессия", phoneNumber = "Номер телефона", company = "Компания", photoUrl = '', likes }) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-sm"><img src={photoUrl} alt={photoUrl} /></div>
                    <div>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{jobTitle}, {company}</p>
                        <div>
                            <a href="#" className="btn btn-primary btn-sm" style={{marginRight: 5+'px'}}>Edit</a>
                            <a href="#" className="btn btn-danger btn-sm">Remove</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Contact;