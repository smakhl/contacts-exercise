import React from 'react'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaComment from 'react-icons/lib/fa/comment';
import { connect } from 'react-redux';
import * as types from '../actionTypes'

class Contact extends React.Component {
    constructor(props) {
        super(props);
        // this.handleEditClick = this.handleEditClick.bind(this);
        // this.handleDeleteClick = this.handleDeleteClick.bind(this);
        console.log('contact page', this.props.match.params.id)
        this.props.dispatch({
            type: types.FETCH_CONTACT_DETAILS_REQUESTED,
            contactId: this.props.match.params.id
        })
    }

    // handleDeleteClick() {
    //     this.props.onDelete(this.props.contact)
    // }

    // handleEditClick() {
    //     this.props.onEdit(this.props.contact)
    // }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.openContact._id != this.props.match.params.id) {
            this.props.dispatch({
                type: types.FETCH_CONTACT_DETAILS_REQUESTED,
                contactId: this.props.match.params.id
            })
        }
    }


    render() {


        return (
            <div>
                {this.props.fetching ?
                    <h4>Загрузка...</h4> :
                    this.props.error ?
                        <div>
                            <h4>Ошибка подключения</h4>
                            <p>{this.props.error.message}</p>
                        </div>
                        :
                        <div>
                            <h3>{this.props.openContact.name}</h3>
                            <hr />
                            <dl className="row">
                                <dt className="col-sm-3">Компания</dt>
                                <dd className="col-sm-9">{this.props.openContact.company}</dd>
                                <dt className="col-sm-3">Должность</dt>
                                <dd className="col-sm-9">{this.props.openContact.jobTitle}</dd>
                                <dt className="col-sm-3">ID</dt>
                                <dd className="col-sm-9">{this.props.match.params.id}</dd>
                                <dt className="col-sm-3">Лайки</dt>
                                <dd className="col-sm-9">{this.props.openContact.likes && this.props.openContact.likes.length}</dd>
                            </dl>
                            <div>
                                <hr />
                                <h6>Комментарии</h6>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <textarea className="form-control" type="text" />
                                        <button className="btn btn-primary btn-sm float-right mt-2">Отправить</button>
                                    </li>
                                    {this.props.openContact.comments && this.props.openContact.comments.map(com =>
                                        <li className="list-group-item" key={com._id}>
                                            {com.text}
                                            <footer className="blockquote-footer text-right">{com.by}</footer>
                                        </li>)}
                                </ul>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    openContact: state.openContact,
    fetching: state.fetching,
    error: state.error
})

export default connect(mapStateToProps)(Contact);