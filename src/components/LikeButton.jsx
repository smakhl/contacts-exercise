import React from 'react'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaSpinner from 'react-icons/lib/fa/spinner';
import { connect } from 'react-redux';
import { likeContact } from '../actions';

const mapStateToProps = (state) => ({
    contacts: state.data.contacts,
    currentUserId: state.data.currentUserId
})

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleLikeClick = this.handleLikeClick.bind(this)
        this.state = {
            loading: false
        }
    }

    handleLikeClick(likedByCurrentUser) {
        // console.log(likedByCurrentUser)
        this.setState({ loading: true })
        new Promise((resolve, reject) => {
            this.props.dispatch(likeContact({ likedByCurrentUser, contactId: this.props.contactId, like: { _id: this.props.currentUserId }, resolve, reject }))
        })
            .then(resp => console.log('promise', resp))
            .catch(err => console.error(err))
            .finally(_ => this.setState({ loading: false }))
    }

    render() {
        const contact = this.props.contacts.entities.contacts[this.props.contactId];
        const likedByCurrentUser = contact.likes.indexOf(this.props.currentUserId) >= 0;

        return <button disabled={this.state.loading} onClick={() => this.handleLikeClick(likedByCurrentUser)} className={"btn btn-sm mb-1 " + (likedByCurrentUser ? 'btn-success' : 'btn-secondary')}>{this.state.loading ? <FaSpinner /> : <FaThumbsUp />} {contact.likes.length}</button>
    }
}

export default connect(mapStateToProps)(LikeButton);