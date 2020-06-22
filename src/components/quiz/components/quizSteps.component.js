import React from 'react';
import { 
    Stepper, 
    Step, 
    StepLabel
} from '@material-ui/core';

const QuizSteps = (props) => {
    const activeStep = props.activeStep;
    const quizzes = props.quizzes;

    return (
        <Stepper
            activeStep={activeStep !== -1 ? activeStep : quizzes.length} 
            style={{ background: 'transparent' }} 
            alternativeLabel
        >
            {quizzes.map((quiz, key) => (
                <Step key={`quiz-${quiz._id}`}>
                    <StepLabel>Otazka {key + 1}</StepLabel>
                </Step>
            ))}
            <Step key={`quiz-finish}`}>
                <StepLabel>Vysledky</StepLabel>
            </Step>
        </Stepper>
    );
}

export default QuizSteps;