const router = require('express').Router();
let Quiz = require('../models/quiz.model');

router.route('/').get((req, res) => {
    Quiz.find()
        .then(q => res.json(q))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const question = req.body.question;
    const answers = req.body.answers;
    const correctAnswer = req.body.correctAnswer;

    const newQuiz = new Quiz({
        question,
        answers,
        correctAnswer
    });

    newQuiz.save()
        .then(() => res.json('Quiz added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;