const mongoose  = require('mongoose');
const router = require('express').Router();
let User = require('../models/user.model');
let Answer = require('../models/answer.model');

const ObjectId = mongoose.mongo.ObjectId;

router.route('/register').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const facebookId = req.body.facebookId;

    const newUser = new User({
        name,
        email,
        facebookId
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/answer/:questionId').post((req, res) => {
    const userId = new ObjectId(req.body.userId);
    const quizId = new ObjectId(req.params.questionId);
    const answer = req.body.answer;

    const newAnswer = new Answer({
        userId,
        quizId,
        answer
    });

    newAnswer.save()
        .then(() => res.json('Answer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;