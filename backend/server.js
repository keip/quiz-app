const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
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
const userRouter = require('./routes/user');
app.use('/quiz', quizRouter);
app.use('/user', userRouter);

const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
};

https.createServer(httpsOptions, app)
    .listen(port, () => {
        console.log('server running at ' + port)
    });
