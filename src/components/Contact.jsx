import React from 'react'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaComment from 'react-icons/lib/fa/comment';

class Contact extends React.Component {
    constructor(props) {
        super(props)

        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }

    handleDeleteClick() {
        this.props.onDelete(this.props.contact)
    }

    handleEditClick() {
        this.props.onEdit(this.props.contact)
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-header">
                    {this.props.contact.name}
                </div>
                <div className="card-body">
                    <p className="card-text">{this.props.contact.company}, {this.props.contact.jobTitle}</p>
                    <div>
                        <a href="#" onClick={this.handleEditClick} className="btn btn-primary btn-sm">Редактировать</a>
                        {' '}
                        <a href="#" onClick={this.handleDeleteClick} className="btn btn-danger btn-sm">Удалить</a>
                        {' '}
                        <a href="#" onClick={this.handleDeleteClick} className="btn btn-default btn-sm"><FaThumbsUp /> {this.props.contact.likes.length}</a>
                        {' '}
                        <a href="#" onClick={this.handleDeleteClick} className="btn btn-default btn-sm"><FaComment /> {this.props.contact.comments.length}</a>
                    </div>
                </div>
            </div>
        )
    }
}


export default Contact;