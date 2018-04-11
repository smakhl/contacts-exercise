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


// const newContact = new Contact({
//     name: 'Some Name',
//     comments: [new Comment({
//         text: 'comment text',
//         by: this._id
//     })]
// })

// newContact.save().then(console.log)

// Contact.findOne().then(contact => {
//     let comment = new Comment({
//         text: 'comment text!',
//         by: contact._id
//     })
//     comment.save().then((r) => {
//         contact.comments.push(r._id);
//         contact.save()

//     })
//     console.log(contact)
// })

// Contact.findOne().populate('comments').then(console.log)
// Comment.findOne().populate('by').then(console.log)


// Contact.findOneAndUpdate({comments: [new Comment({text: 'comment text'})]}).then(console.log)

