const mongoose  = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.mongo.ObjectId;
let Question = require('./question.model');

const voteSchema = new Schema(
    {
        userId: ObjectId,
        quizId: ObjectId,
        questions: [Question],
        answers: [Number],
    },
    {
        timestamps: true
    }
);

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;