const router = require('express').Router();
let Quiz = require('../models/quiz.model');

router.route('/').get((req, res) => {
    Quiz.find()
        .then(q => res.json(q))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const questions = req.body.questions;
    const newQuiz = new Quiz({ questions });

    newQuiz.save()
        .then(() => res.json('Quiz added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;