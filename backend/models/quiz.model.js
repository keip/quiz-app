const mongoose  = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.mongo.ObjectId;

const quizSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        questions: {
            type: [ObjectId],
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;