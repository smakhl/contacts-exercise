import React from 'react'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import { connect } from 'react-redux';
import * as types from '../actionTypes'
import axios from 'axios'

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch({
            type: types.FETCH_CONTACT_DETAILS_REQUESTED,
            contactId: this.props.match.params.id
        })
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.state = {
            comment: '',
            posting: false
        }
    }

    componentDidUpdate() {
        // component is not remounted when we switch between contact pages, therefore we trigger data fetch here
        // if (this.props.openContact._id != this.props.match.params.id) {
        //     console.log('componentDidUpdate')
        //     this.props.dispatch({
        //         type: types.FETCH_CONTACT_DETAILS_REQUESTED,
        //         contactId: this.props.match.params.id
        //     })
        // }
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.comment != '') {
            this.setState({ posting: true });
            axios.post('/api/comments/' + this.props.openContact._id, {
                text: this.state.comment,
                by: this.props.currentUser._id
            })
                .then(r => {
                    this.props.dispatch({
                        type: types.COMMENT_CONTACT,
                        comment: r.data
                    })
                    this.setState({ posting: false, comment: '' });
                })
                .catch(err => { console.error(err); this.setState({ posting: false }) })
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
                                <dt className="col-sm-3">Телефон</dt>
                                <dd className="col-sm-9">{this.props.openContact.phoneNumber}</dd>
                            </dl>
                            <div>
                                <a href="#" onClick={this.handleLike} className="btn btn-default btn-sm"><FaThumbsUp /> {this.props.openContact.likes && this.props.openContact.likes.length}</a>
                            </div>
                            <div>
                                <hr />
                                <h6>Комментарии</h6>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <form>
                                            <fieldset disabled={this.state.posting ? "disabled" : ""}>
                                                <textarea className="form-control" type="text" value={this.state.comment} onChange={this.handleCommentChange} />
                                                <input type="submit" value="Отправить" onClick={this.handleSubmit} className="btn btn-primary btn-sm float-right mt-2" />
                                            </fieldset>
                                        </form>
                                    </li>
                                        {this.props.openContact.comments && this.props.openContact.comments.map(com =>
                                            <li className="list-group-item" key={com._id}>
                                                {com.text}
                                                <footer className="blockquote-footer text-right">{com.by.name}</footer>
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
                error: state.error,
                currentUser: state.currentUser
            })
            
export default connect(mapStateToProps)(Contact);