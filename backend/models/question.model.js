const mongoose  = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.mongo.ObjectId;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answers: {
        type: [ObjectId],
        required: true,
    },
    correctAnswer: {
        type: Number,
        required: true,
    }
});

const Question = mongoose.model('Quiz', questionSchema);

module.exports = Question;