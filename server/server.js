require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
app.use(bodyParser.json());
const path = require('path')

// models
const Contact = require('./models').Contact;
const Comment = require('./models').Comment;
const Like = require('./models').Like;

app.use(express.static(path.resolve(__dirname, '../dist/')));

mongoose.connect(process.env.MONGODB_URL, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000
})
    .then(() => console.log('Successfully connected to DB'))
    .catch((err) => console.error(err));

app.listen(port, function () {
    console.log(`listening on ${port}`)
})

app.get('/api/contacts', function (req, res) {
    Contact.find({})
        .sort('name')
        // .populate({
        //     path: 'comments.by',
        //     model: 'Contact',
        //     select: 'name'
        // })
        .then(contacts => { res.send(contacts) })
        .catch((err) => res.send(err));
})

app.get('/api/contacts/:id', function (req, res) {
    Contact.findById(req.params.id)
        .populate('likes')
        .populate({
            path: 'comments.by',
            model: 'Contact',
            select: 'name'
        })
        .then(contact => { res.send(contact) })
        .catch((err) => res.send(err));
})

app.delete('/api/contacts/:id', function (req, res) {
    Contact.findByIdAndRemove(req.params.id)
        .then(contact => { res.send(contact) })
        .catch((err) => res.send(err));
})

app.put('/api/contacts/:id', function (req, res) {
    Contact.findByIdAndUpdate(req.params.id, req.body, { 'new': true })
        .then(contact => { 
            // console.log(contact);
            res.send(contact) })
        .catch((err) => res.send(err));
})

app.post('/api/contacts', function (req, res) {
    new Contact(req.body)
        .save()
        .then(r => res.send(r))
        .catch((err) => res.status(400).send(err));
})

// creates new comment. Pass contact's ID as param. Returns contact
app.post('/api/postComment/:id', function (req, res) {
    // Contact.findById(req.params.id)
    //     .then(co => {
    //         console.log(req.body)
    //         console.log(co.comments.length)
    //         try {
    //             co.comments.push(req.body);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //         console.log(co.comments.length)
    //         return co.save()
    //     }).then(responce => res.send(responce))
    //     .catch((err) => res.status(400).send(err));

    Contact.findByIdAndUpdate(req.params.id,
        { $push: { comments: req.body } },
        { 'new': true })
        .then(co => res.send(co))
        .catch((err) => res.status(400).send(err));
})


// creates new like. Pass contact's ID as param. Returns contact
app.post('/api/postLike/:id', function (req, res) {
    Contact.findByIdAndUpdate(req.params.id,
        { $push: { comments: req.body } },
        { 'new': true })
        .then(co => res.send(co))
        .catch((err) => res.status(400).send(err));
})

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})