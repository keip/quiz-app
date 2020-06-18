const mongoose  = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.mongo.ObjectId;

const answerSchema = new Schema({
    userId: ObjectId,
    quizId: ObjectId,
    answer: Number
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;