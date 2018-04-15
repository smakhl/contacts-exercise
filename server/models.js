const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: String,
    jobTitle: String,
    company: String,
    photoUrl: String,
    phoneNumber: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
});

const commentSchema = mongoose.Schema({
    text: String,
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }
});

const likeSchema = mongoose.Schema({
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }
});

module.exports.Contact = mongoose.model('Contact', contactSchema)
module.exports.Comment = mongoose.model('Comment', commentSchema)
module.exports.Like = mongoose.model('Like', likeSchema)