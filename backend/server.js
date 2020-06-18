const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// use dotenv config
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connect to mongodb
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log("Mongo connected");
});

// router
const quizRouter = require('./routes/quiz');
const voteRouter = require('./routes/vote');
app.use('/quiz', quizRouter);
app.use('/vote', voteRouter);

// app listen
app.listen(port, () => {
    console.log(`Server is connected on port ${port}`);
});