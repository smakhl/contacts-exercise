var connectionString = require('../configs/dbConfig').connectionString;

const mongoose = require('mongoose');
mongoose.connect(connectionString);

// const catSchema = mongoose.Schema({
//     name: String,
//     sound: String
// });

// const dogSchema = mongoose.Schema({
//     name: String,
//     sound: String
// });

const contactSchema = mongoose.Schema({
    name: String,
    jobTitle: String,
    company: String,
    photoUrl: String,
    phoneNumber: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like'}],
});

const commentSchema = mongoose.Schema({
    text: String,
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}
});

const likeSchema = mongoose.Schema({
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}
});

const Contact = mongoose.model('Contact', contactSchema)

// const newContact = new Contact({
//     name: 'Some Name',

// })

// newContact.company = 'company'

// newContact.save().then(console.log)

Contact.findOneAndUpdate({name: 'new name'}).then(console.log)

// const Cat = mongoose.model('Cat', catSchema);
// const Dog = mongoose.model('Dog', catSchema);

// Cat.collection.drop()
// Dog.collection.drop()

// const kitty = new Cat({ name: 'Grusha' });
// kitty.save().then(console.log);

// Cat.find().then(r => {
//     console.log("all cats are:")
//     console.log(r)
//     // console.log(r.map(i => i.name))
// })

// Cat.findOneAndUpdate({ name: 'Pushok' }, {name: 'Рыжик'}, {new: true}).then(console.log)

// Dog.find().then(r => {
//     console.log("all dogs are:")
//     console.log(r.map(i => i.name))
// })