const router = require('express').Router();
let Vote = require('../models/vote.model');

router.route('/vote').post((req, res) => {
    const quizId = req.body.quizId;
    const questionId = req.body.questionId;
    const answer = req.body.answer;
    const userId = req.body.userId;

    const newVote = new Vote({
        userId: userId,
        quizId: quizId,
        questionId: questionId,
        answer: answer
    });

    newVote.save()
        .then(() => res.json('Vote added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});