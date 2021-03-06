import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import QuizResults from './components/quizResults.component';
import ActiveQuiz from './components/activeQuiz.component';
import QuizSteps from './components/quizSteps.component';

const Quiz = () => {
    const cookies = new Cookies();
    const userId = cookies.get('user_id');
    const [quizzes, setQuizzes] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [answerMatrix, setAnswerMatrix] = useState([0, 1, 2, 3]);
    const [userAnswer, setUserAnswer] = useState(-1);

    const activeQuiz = quizzes.find(quiz => {
        const hasAnswer = answers.find(answer => answer.quizId === quiz._id);
        return !hasAnswer;
    });

    const activeStep = quizzes.findIndex(quiz => {
        const hasAnswer = answers.find(answer => answer.quizId === quiz._id);
        return !hasAnswer;
    });

    const correctAnswers = quizzes.filter(quiz => {
        const answer = answers.find(answer => answer.quizId === quiz._id);
        return answer && answer.answer === quiz.correctAnswer;
    });
    const percentage = correctAnswers.length / quizzes.length * 100;

    const setAnswer = answer => {
        if (userAnswer !== -1) return;
        setUserAnswer(answer);
    }

    const nextQuiz = () => {
        if (userAnswer === -1) return;

        axios.post(`${process.env.API_URI}user/answer/`, {
                userId: userId,
                quizId: activeQuiz._id,
                answer: userAnswer
            })
            .then(res => {
                setAnswerMatrix(shuffle(answerMatrix));
                setAnswers(res.data);
                setUserAnswer(-1);
            });
    }

    const repeatTest = () => {
        axios.delete(`${process.env.API_URI}user/reset/${userId}/`)
            .then(res => {
                setAnswers(res.data);
            });
    }

    const shuffle = array => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    useEffect(() => {
        // shuffle answers
        setAnswerMatrix(shuffle(answerMatrix));
        // get quizzes
        axios.get(`${process.env.API_URI}quiz/`)
            .then(res => {
                setQuizzes(res.data);
            });
        // get users answers
        axios.get(`${process.env.API_URI}user/answers/${userId}/`)
            .then(res => {
                setAnswers(res.data);
            });
    }, [answerMatrix, userId]);

    return (
        <div className="App">
            <QuizSteps activeStep={activeStep} quizzes={quizzes} />
            {activeQuiz && 
                <ActiveQuiz 
                    activeQuiz={activeQuiz}
                    answerMatrix={answerMatrix} 
                    setAnswer={setAnswer} 
                    userAnswer={userAnswer}
                    nextQuiz={nextQuiz}
                    isLastStep={activeStep === quizzes.length - 1}
                />}
            {!activeQuiz && 
                <QuizResults 
                    percentage={percentage} 
                    quizzes={quizzes} 
                    answers={answers} 
                    repeatTest={repeatTest}
                />}
        </div>
    );
}

export default Quiz;