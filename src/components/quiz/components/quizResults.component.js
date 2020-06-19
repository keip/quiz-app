import React from 'react';
import { 
    Grid, 
    Button, 
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';

const Progress = styled.div`
    width: 50%;
`;

const ProgressLabel = styled.div`
    font-size: 22px;
    text-align: center;
    padding: 10px 0 30px;
`;

const QuizResults = (props) => {
    const percentage = props.percentage;
    const quizzes = props.quizzes;
    const answers = props.answers;
    const repeatTest = props.repeatTest;

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <h2>Tvoje uspesnost</h2>
            <Grid container direction="column" justify="center" alignItems="center">
                <Progress>
                    <LinearProgress variant="determinate" value={percentage} />
                    <ProgressLabel>{percentage}%</ProgressLabel>
                </Progress>
                <Grid item col={6}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Otazka</TableCell>
                                    <TableCell>Vase odpoved</TableCell>
                                    <TableCell>Spravna odpoved</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {quizzes.map((quiz) => {
                                    const answer = answers.find(answer => answer.quizId === quiz._id);
                                    return (
                                        <TableRow key={quiz._id}>
                                            <TableCell>{quiz.question}</TableCell>
                                            <TableCell>{quiz.answers[answer.answer]}</TableCell>
                                            <TableCell>{quiz.answers[quiz.correctAnswer]}</TableCell>
                                            <TableCell align="right">{quiz.correctAnswer === answer.answer ? <CheckIcon color="primary" /> : <ClearIcon color="secondary" />}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <br />
            <br />
            <Button variant="contained" onClick={() => repeatTest()}>Zopakovat test</Button>
        </Grid>
    );
}

export default QuizResults;