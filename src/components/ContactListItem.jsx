import React from 'react'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaComment from 'react-icons/lib/fa/comment';
import FaFileText from 'react-icons/lib/fa/file-text';
import { Link, Route } from "react-router-dom";
import { FETCH_CONTACT_DETAILS_FAILED } from '../actionTypes';

export default class ContactListItem extends React.Component {
    constructor(props) {
        super(props)

        this.handleLikeClick = this.handleLikeClick.bind(this)
    }

    handleLikeClick() {
        this.props.onLike()
    }

    render() {
        const contact = this.props.contact
        const likedByCurrentUser = this.props.likedByCurrentUser

        return (
            <div className="card mb-3">
                <div className="card-header">
                    {contact.name}
                </div>
                <div className="card-body">
                    <p className="card-text">{contact.company}, {contact.jobTitle}</p>
                    <div className="row">
                        <div className="col-6">
                            <button onClick={this.handleLikeClick} className={"btn btn-sm mb-1 " + (likedByCurrentUser ? 'btn-success' : 'btn-secondary')}><FaThumbsUp /> {contact.likes.length}</button>
                            {' '}
                            <Link title="Комментарии" className="btn btn-secondary btn-sm mb-1" to={'/contact/' + contact._id}><FaComment /> {contact.comments.length}</Link>
                            {' '}
                            <Link title="Редактировать" className="btn btn-secondary btn-sm mb-1" to={'/contact/' + contact._id}><FaFileText /></Link>
                        </div>
                        <div className="col-6">
                            <font size="2" className="font-weight-light float-right">Создан: {contact.createdAt}</font>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}