import React from 'react'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import { connect } from 'react-redux';
import { fetchContactDetails, addComment, deleteContact } from '../actions'
import { Link, Redirect } from 'react-router-dom'
import LikeButton from './LikeButton.jsx'

const mapStateToProps = (state) => ({
    contacts: state.data.contacts,
    loadingDetails: state.data.loadingDetails,
    error: state.data.error,
    currentUserId: state.data.currentUserId,
    loading: state.data.loading
})

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.urlId = this.props.match.params.id
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.state = {
            comment: '',
            posting: false,
            deleted: false
        }
    }


    componentDidMount() {
        // this.props.dispatch(fetchContactDetails(this.urlId))
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.comment != '') {
            this.props.dispatch(addComment(this.urlId, { by: this.props.currentUserId, text: this.state.comment }))
        }
    }

    handleLike(e) {
        e.preventDefault()
        console.log('handleLike')
    }

    handleCommentChange(e) {
        e.preventDefault()
        this.setState({
            comment: e.target.value
        })
    }

    handleDelete(e) {
        e.preventDefault()
        if (confirm(`Вы уверены, что хотите удалить ${this.props.contacts.entities.contacts[this.urlId].name}?`)) {
            new Promise((resolve, reject) => {
                this.props.dispatch(deleteContact({ contactId: this.urlId, resolve, reject }))
            }).then(_ => this.setState({ deleted: true })).catch(err => console.error(err))
        }
    }



    render() {
        const { loadingDetails, error, contacts } = this.props;

        if (error)
            return (
                <div>
                    <h4>Ошибка подключения</h4>
                    <p>{this.props.error.message}</p>
                </div>
            )

        if (loadingDetails)
            return <h4>Загрузка...</h4>

        if (this.state.deleted)
            return <Redirect to="/" />

        if (contacts.entities && contacts.entities.contacts[this.urlId]) {
            const thisContact = contacts.entities.contacts[this.urlId];
            return (
                <div>
                    <h3>{thisContact.name}</h3>
                    <hr />
                    <dl className="row">
                        <dt className="col-sm-3">Компания</dt>
                        <dd className="col-sm-9">{thisContact.company}</dd>
                        <dt className="col-sm-3">Должность</dt>
                        <dd className="col-sm-9">{thisContact.jobTitle}</dd>
                        <dt className="col-sm-3">Телефон</dt>
                        <dd className="col-sm-9">{thisContact.phoneNumber}</dd>
                        <dt className="col-sm-3">Создан</dt>
                        <dd className="col-sm-9">{thisContact.createdAt}</dd>
                        <dt className="col-sm-3">Изменён</dt>
                        <dd className="col-sm-9">{thisContact.updatedAt}</dd>
                    </dl>
                    <div className="row">
                        <div className="col-6">
                            <LikeButton contactId={thisContact._id} />
                        </div>
                        <div className="col-6">
                            <div className="float-right">
                                <button onClick={(e) => this.handleDelete(e)} className="btn btn-danger btn-sm mb-1" >Удалить</button>
                                {" "}
                                <Link className="btn btn-secondary btn-sm mb-1" to={'/contact/edit/' + this.urlId}>Редактировать</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr />
                        <h6>Комментарии</h6>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <form>
                                    <fieldset disabled={this.props.loading ? "disabled" : ""}>
                                        <textarea className="form-control" type="text" value={this.state.comment} onChange={this.handleCommentChange} />
                                        <input type="submit" value="Отправить" onClick={this.handleSubmit} className="btn btn-primary btn-sm float-right mt-2" />
                                    </fieldset>
                                </form>
                            </li>
                            {contacts.entities.comments && thisContact.comments && thisContact.comments.map(com => {
                                if (contacts.entities.comments[com]) {
                                    const comment = contacts.entities.comments[com];
                                    const commentAuthor = contacts.entities.contacts[comment.by].name;
                                    return (
                                        <li className="list-group-item" key={comment._id}>
                                            {comment.text}
                                            <footer className="blockquote-footer text-right">{commentAuthor}<br />{comment.createdAt}</footer>
                                        </li>
                                    )
                                }
                            }).reverse()}
                        </ul>
                    </div>
                </div >
            )
        }

        return ''
    }
}

export default connect(mapStateToProps)(Contact);