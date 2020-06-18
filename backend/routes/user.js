const router = require('express').Router();
let User = require('../models/user.model');

router.route('/register').post((req, res) => {
    const questions = req.body.questions;
    const newQuiz = new User({ questions });

    newQuiz.save()
        .then(() => res.json('Quiz added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;