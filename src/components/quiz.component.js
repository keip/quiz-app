import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/quiz/')
            .then(res => {
                setQuizzes(res.data);
            });
    }, []);

    return (
        <div className="App">
            {quizzes.map(quiz => {
                return (
                    <div>
                        <h3>{quiz.question}</h3>
                        {quiz.answers.map(answer => <span>{answer}</span>)}
                    </div>
                );
            })}
        </div>
    );
}

export default Quiz;