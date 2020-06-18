const mongoose  = require('mongoose');
const router = require('express').Router();
let User = require('../models/user.model');
let Answer = require('../models/answer.model');

const ObjectId = mongoose.mongo.ObjectId;

router.route('/answers/:userId').get((req, res) => {
    Answer.find({
        userId: req.params.userId
    })
        .then(q => res.json(q))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const facebookId = req.body.facebookId;
    const accessToken = req.body.accessToken;

    // check if user exists
    User.findOne({
        facebookId: facebookId
    }).then(q => {
        if (q) {
            // if user exists return userId
            res.json({
                userId: q._id
            });
        } else {
            // if user doesn't exist create user
            const newUser = new User({
                name,
                email,
                facebookId,
                accessToken
            });
        
            newUser.save()
                .then((data) => {
                    return res.json({
                        userId: data._id
                    });
                })
                .catch(err => res.status(400).json('Error: ' + err));
        }
    })
});

router.route('/answer/').post((req, res) => {
    const userId = new ObjectId(req.body.userId);
    const quizId = new ObjectId(req.body.quizId);
    const answer = req.body.answer;

    const newAnswer = new Answer({
        userId,
        quizId,
        answer
    });

    newAnswer.save()
        .then(() => {
            Answer.find({
                userId: userId
            }).then(q => res.json(q))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/reset/:userId').delete((req, res) => {
    const userId = new ObjectId(req.params.userId);

    Answer.deleteMany({
        userId: userId
    }).then(() => {
        Answer.find({
            userId: userId
        }).then(q => res.json(q))
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;