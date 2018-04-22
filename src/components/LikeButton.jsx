import React from 'react'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    contacts: state.data.contacts,
    currentUserId: state.data.currentUserId
})

class LikeButton extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        <button onClick={this.handleLikeClick} className={"btn btn-sm mb-1 " + (likedByCurrentUser ? 'btn-success' : 'btn-secondary')}><FaThumbsUp /> {contact.likes.length}</button>
    }
}

export default connect(mapStateToProps)(LikeButton);