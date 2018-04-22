const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: String,
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }
}, { timestamps: true });

const likeSchema = mongoose.Schema({
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }
}, { timestamps: true });

const contactSchema = mongoose.Schema({
    name: String,
    jobTitle: String,
    company: String,
    photoUrl: String,
    phoneNumber: String,
    comments: [commentSchema],
    likes: [likeSchema],
}, { timestamps: true });



module.exports.Contact = mongoose.model('Contact', contactSchema)
// module.exports.Comment = mongoose.model('Comment', commentSchema)
// module.exports.Like = mongoose.model('Like', likeSchema)