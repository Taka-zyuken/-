import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate をインポート
import QuizSetup from './QuizSetup'; // QuizSetup.js が同じフォルダにある場合

function QuizApp() {
    // クイズ設定と状態
    const [quizConfig, setQuizConfig] = useState(null);
    const [quiz, setQuiz] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showNextButton, setShowNextButton] = useState(false);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState(0);
    const [showResults, setShowResults] = useState(false); // 結果表示用のフラグ

    const navigate = useNavigate(); // useNavigate フックを使用してページ遷移を行う

    // クイズ設定完了時に呼ばれる関数
    const handleSetupComplete = (config) => {
        setQuizConfig(config);
        fetchQuiz(config);
    };

    // クイズデータの取得
    const fetchQuiz = (config) => {
        const { quizSource, rangeStart, rangeEnd, questionCount, direction } = config;
        fetch(`http://localhost:4000/api/custom-quiz?source=${quizSource}&start=${rangeStart}&end=${rangeEnd}&count=${questionCount}&direction=${direction}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    alert('指定した条件でクイズが見つかりませんでした。');
                    return;
                }
                setQuiz(data);
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setShowNextButton(false);
                setScore(0);
                setAnsweredQuestions(0);
                setShowResults(false);
            })
            .catch(error => console.error('Error fetching quiz data:', error));
    };

    // 答えのチェック
    const checkAnswer = (option) => {
        if (!quiz[currentQuestionIndex]) return;
        setSelectedAnswer(option);

        // 正解の場合スコアを更新
        if (option === quiz[currentQuestionIndex].answer) {
            setScore(prevScore => prevScore + 1);
        }
        setAnsweredQuestions(prevCount => prevCount + 1);
        setShowNextButton(true);
    };

    // 次の問題に進む
    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
            setShowNextButton(false);
        } else {
            setShowResults(true); // クイズが終了したら結果を表示
        }
    };

    // 問題作成画面に戻る
    const handleReturnToSetup = () => {
        setQuizConfig(null);
        setShowResults(false);
        navigate('/'); // "/" に遷移して問題作成画面に戻る
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Quiz作成アプリ</h1>
            {showResults ? (
                <div>
                    <h2>解答結果</h2>
                    {quiz.map((q, index) => (
                        <div key={index}>
                            <p>問題: {q.question}</p>
                            <p>正解: {q.answer}</p>
                            <p>選択肢: {q.options.join(', ')}</p>
                        </div>
                    ))}
                    <button onClick={handleReturnToSetup}>問題作成に戻る</button>
                </div>
            ) : !quizConfig ? (
                <QuizSetup onSetupComplete={handleSetupComplete} />
            ) : (
                quiz.length > 0 && currentQuestionIndex < quiz.length ? (
                    <div>
                        <p>問題: {quiz[currentQuestionIndex].question}</p>
                        {quiz[currentQuestionIndex].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => checkAnswer(option)}
                                disabled={selectedAnswer !== null}
                                style={{
                                    backgroundColor:
                                        selectedAnswer === option
                                            ? option === quiz[currentQuestionIndex].answer
                                                ? 'red' // 正解は赤色
                                                : 'blue' // 不正解は青色
                                            : selectedAnswer && option === quiz[currentQuestionIndex].answer
                                                ? 'red' // 正解を赤色で表示
                                                : '',
                                    color: 'black', // 文字色は黒
                                    padding: '10px',
                                    margin: '5px',
                                }}
                            >
                                {option}
                            </button>
                        ))}
                        {showNextButton && (
                            <button onClick={handleNextQuestion}>次の問題</button>
                        )}
                    </div>
                ) : (
                    <p>クイズが終了しました</p>
                )
            )}
        </div>
    );
}

export default QuizApp;
