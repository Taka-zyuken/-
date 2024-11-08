// src/components/QuizApp.js

import React, { useState, useEffect } from 'react';

function QuizApp() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ランダムに5つのクイズを取得
        fetch('http://localhost:4000/api/random-quizzes/5')
            .then(response => response.json())
            .then(data => {
                setQuizzes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching random quizzes:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Random Quiz</h1>
            {quizzes.map((quiz, index) => (
                <div key={index}>
                    <p>{quiz.question}</p>
                    <ul>
                        {quiz.options.map((option, i) => (
                            <li key={i}>{option}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default QuizApp;
