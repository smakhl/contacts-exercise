import React from 'react'
import FaComment from 'react-icons/lib/fa/comment';
import FaFileText from 'react-icons/lib/fa/file-text';
import { Link, Route } from "react-router-dom";
import LikeButton from './LikeButton.jsx';

export default ({ contact }) => {
    return (
        <div className="card mb-3">
            <div className="card-header">
                {contact.name}
            </div>
            <div className="card-body">
                <p className="card-text">{contact.company}, {contact.jobTitle}</p>
                <div className="row">
                    <div className="col-6">
                        <LikeButton contactId={contact._id} />
                        {' '}
                        <Link title="Комментарии" className="btn btn-secondary btn-sm mb-1" to={'/contact/' + contact._id}><FaComment /> {contact.comments.length}</Link>
                        {' '}
                        <Link title="Карточка контакта" className="btn btn-secondary btn-sm mb-1" to={'/contact/' + contact._id}><FaFileText /></Link>
                    </div>
                    <div className="col-6">
                        <font size="2" className="font-weight-light float-right">Создан: {contact.createdAt}</font>
                    </div>
                </div>
            </div>
        </div>
    )
}