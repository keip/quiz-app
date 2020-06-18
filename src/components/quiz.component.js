import React, { useState, useEffect } from 'react';
import { Grid, Button, Stepper, Step, StepLabel } from '@material-ui/core';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Quiz = () => {
    const cookies = new Cookies();
    const [quizzes, setQuizzes] = useState([]);
    const [answers, setAnswers] = useState([]);
    const userId = cookies.get('user_id');

    const setAnswer = (quizId, answer) => {
        axios.post('http://localhost:5000/user/answer/', {
                userId: userId,
                quizId,
                answer
            })
            .then(res => {
                setAnswers(res.data);
            });
    }

    const repeatTest = () => {
        axios.delete(`http://localhost:5000/user/reset/${userId}/`)
            .then(res => {
                setAnswers(res.data);
            });
    }

    useEffect(() => {
        // get quizzes
        axios.get('http://localhost:5000/quiz/')
            .then(res => {
                setQuizzes(res.data);
            });
        // get users answers
        axios.get(`http://localhost:5000/user/answers/${userId}/`)
            .then(res => {
                setAnswers(res.data);
            });
    }, [userId]);

    const activeQuiz = quizzes.find(quiz => {
        const hasAnswer = answers.find(answer => answer.quizId === quiz._id);
        return !hasAnswer;
    });
    const activeStep = quizzes.findIndex((quiz, index) => {
        const hasAnswer = answers.find(answer => answer.quizId === quiz._id);
        return !hasAnswer;
    });

    return (
        <div className="App">
            <Stepper activeStep={activeStep !== -1 ? activeStep : quizzes.length} alternativeLabel>
                {quizzes.map((quiz, key) => (
                    <Step key={`quiz-${quiz._id}`}>
                        <StepLabel>Question {key + 1}</StepLabel>
                    </Step>
                ))}
                <Step key={`quiz-finish}`}>
                    <StepLabel>Results</StepLabel>
                </Step>
            </Stepper>
            <div>
            {activeQuiz && <Grid container direction="column" justify="center" alignItems="center">
                <h2>{activeQuiz.question}</h2>
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                    {activeQuiz.answers.map((answer, index) => {
                        return (
                            <Grid item key={`${activeQuiz._id}-answer-${index}`}>
                                <Button variant="contained" onClick={() => setAnswer(activeQuiz._id, index)}>
                                    {answer}
                                </Button>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>}
            {!activeQuiz && <Grid container direction="column" justify="center" alignItems="center">
                <h2>Tvoje uspesnost:</h2>
                <Button variant="contained" onClick={() => repeatTest()}>Zopakovat test</Button>
            </Grid>}
            </div>
        </div>
    );
}

export default Quiz;