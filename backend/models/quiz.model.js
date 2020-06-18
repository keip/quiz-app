const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const quizSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answers: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: Number,
        required: true,
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;