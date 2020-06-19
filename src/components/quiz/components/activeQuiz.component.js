import React from 'react';
import { 
    Grid, 
    Button
} from '@material-ui/core';

const ActiveQuiz = (props) => {
    const activeQuiz = props.activeQuiz;
    const answerMatrix = props.answerMatrix;
    const setAnswer = props.setAnswer;
    const userAnswer = props.userAnswer;
    const nextQuiz = props.nextQuiz;

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <h2>{activeQuiz.question}</h2>
            <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                {answerMatrix.map(index => {
                    return (
                        <Grid item key={`${activeQuiz._id}-answer-${index}`}>
                            <Button variant="contained" onClick={() => setAnswer(index)} color={userAnswer === index ? 'primary' : 'default'}>
                                {activeQuiz.answers[index]}
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
            {userAnswer !== -1 && <Grid container justify="center">
                <Grid item>
                    <Button color="primary" onClick={() => nextQuiz()}>Další otázka</Button>
                </Grid>
            </Grid>}
        </Grid>
    );
};

export default ActiveQuiz;