const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
app.use(bodyParser.json());
const path = require('path')

const connectionString = require('../configs/dbConfig').connectionString;

// models
const Contact = require('./models').Contact;
const Comment = require('./models').Comment;
const Like = require('./models').Like;

app.use(express.static(path.resolve(__dirname, '../dist/')));

mongoose.connect(connectionString, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000
})
    .then(() => console.log('Successfully connected to DB'))
    .catch((err) => console.error(err));

app.listen(port, function () {
    console.log(`listening on ${port}`)
})

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

app.get('/api/contacts', function (req, res) {
    Contact.find()
        .then(contacts => { res.send(contacts) })
        .catch((err) => res.send(err));
})

app.get('/api/contacts/:id', function (req, res) {
    Contact.findById(req.params.id)
        .populate('likes')
        .populate('comments')
        .populate('by')
        .then(contact => { res.send(contact) })
        .catch((err) => res.send(err));
})

app.delete('/api/contacts/:id', function (req, res) {
    Contact.findByIdAndRemove(req.params.id)
        .then(contact => { res.send(contact) })
        .catch((err) => res.send(err));
})

app.put('/api/contacts/:id', function (req, res) {
    Contact.findByIdAndUpdate(req.params.id, req.body)
        .then(contact => { res.send(contact) })
        .catch((err) => res.send(err));
})

app.post('/api/contacts', function (req, res) {
    new Contact(req.body)
        .save()
        .then(r => res.send(r))
        .catch((err) => res.status(400).send(err));
})

app.post('/api/comments/:id', function (req, res) {
    new Comment(req.body)
        .save()
        .then(r => {
            Contact.findByIdAndUpdate(req.params.id, { $push: { comments: r._id } }).then().catch(err => console.log(err));
            res.send(r);
        })
        .catch((err) => res.status(400).send(err));
})

app.post('/api/likes/:id', function (req, res) {
    new Like(req.body)
        .save()
        .then(r => {
            Contact.findByIdAndUpdate(req.params.id, { $push: { likes: r._id } }).then().catch(err => console.log(err));
            res.send(r);
        })
        .catch((err) => res.status(400).send(err));
}) 