import React from 'react';
import {
    Box,
    Grid, 
    Button,
    Paper,
    Typography
} from '@material-ui/core';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const StyledButton = styled(Button)`
    background: #fff;
`;

const ActiveQuiz = (props) => {
    const activeQuiz = props.activeQuiz;
    const answerMatrix = props.answerMatrix;
    const setAnswer = props.setAnswer;
    const userAnswer = props.userAnswer;
    const nextQuiz = props.nextQuiz;
    const isLastStep = props.isLastStep;
    const isCorrectAnswer = activeQuiz.correctAnswer === userAnswer;

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <h2>{activeQuiz.question}</h2>
            <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                {answerMatrix.map(index => {
                    return (
                        <Grid item key={`${activeQuiz._id}-answer-${index}`}>
                            <StyledButton
                                variant="outlined"
                                onClick={() => setAnswer(index)}
                                color={
                                    userAnswer !== -1 && activeQuiz.correctAnswer === index 
                                    ? 'primary' 
                                    : userAnswer === index 
                                    ? 'secondary' 
                                    : 'default'}
                                startIcon={
                                    userAnswer !== -1 && activeQuiz.correctAnswer === index 
                                    ? <CheckIcon color="primary" />
                                    : userAnswer === index 
                                    ? <ClearIcon color="error" />
                                    : null
                                }
                            >
                                {activeQuiz.answers[index]}
                            </StyledButton>
                        </Grid>
                    );
                })}
            </Grid>
            {userAnswer !== -1 && <Box p={3}>
                <Paper>
                    <Box p={3}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            {
                                isCorrectAnswer
                                ? <CheckIcon color="primary" style={{ fontSize: 24, marginRight: 8 }} />
                                : <ClearIcon color="secondary" style={{ fontSize: 24, marginRight: 8 }} />
                            }
                            <Typography style={{ fontWeight: 'bolder' }} align="left" color={isCorrectAnswer ? 'primary' : 'error'}>
                                {isCorrectAnswer ? 'Spravna odpoved' : 'Spatna odpoved'}
                            </Typography>
                        </Grid>
                    </Box>
                </Paper>
                {!isCorrectAnswer && <Box m={3}>
                    <Typography>Spravna odpoved je: <b>{activeQuiz.answers[activeQuiz.correctAnswer]}</b></Typography>
                </Box>}
                <Box m={3}>
                    <Grid container direction="row" justify="center" alignItems="center">
                    <Button
                        variant={isLastStep ? "outlined" : "contained"}
                        color="primary"
                        onClick={() => nextQuiz()}
                        endIcon={<NavigateNextIcon />}
                    >
                        {isLastStep ? 'Vysledky testu' : 'Další otázka'}
                    </Button>
                    </Grid>
                </Box>
            </Box>}
        </Grid>
    );
};

export default ActiveQuiz;