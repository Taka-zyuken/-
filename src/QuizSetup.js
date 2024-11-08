import React, { useState } from 'react';

function QuizSetup({ onSetupComplete }) {
    const [quizSource, setQuizSource] = useState('target1900');
    const [rangeStart, setRangeStart] = useState(1);
    const [rangeEnd, setRangeEnd] = useState(100);
    const [questionCount, setQuestionCount] = useState(10);
    const [direction, setDirection] = useState('enToJp');
    const [quizType, setQuizType] = useState('multipleChoice'); // 追加: クイズの種類

    const handleSubmit = (e) => {
        e.preventDefault();
        onSetupComplete({
            quizSource,
            rangeStart,
            rangeEnd,
            questionCount,
            direction,
            quizType, // クイズの種類を渡す
        });
    };

    return (
        <div>
            <h2>問題作成</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    問題リスト:
                    <select value={quizSource} onChange={(e) => setQuizSource(e.target.value)}>
                        <option value="target1900">ターゲット1900</option>
                        <option value="sistan">シスタン</option>
                        <option value="leap">LEAP</option>
                    </select>
                </label>
                <br />

                <label>
                    問題範囲:
                    <input
                        type="number"
                        value={rangeStart}
                        onChange={(e) => setRangeStart(Number(e.target.value))}
                        min="1"
                    />
                    〜
                    <input
                        type="number"
                        value={rangeEnd}
                        onChange={(e) => setRangeEnd(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <br />

                <label>
                    問題数:
                    <input
                        type="number"
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <br />

                <label>
                    出題形式:
                    <select value={direction} onChange={(e) => setDirection(e.target.value)}>
                        <option value="enToJp">英語 → 日本語</option>
                        <option value="jpToEn">日本語 → 英語</option>
                    </select>
                </label>
                <br />

                {/* 新たな問題形式の選択 */}
                <label>
                    問題タイプ:
                    <select value={quizType} onChange={(e) => setQuizType(e.target.value)}>
                        <option value="multipleChoice">4択問題</option>
                        <option value="allAtOnce">一斉解答</option>
                    </select>
                </label>
                <br />

                <button type="submit">問題を生成</button>
            </form>
        </div>
    );
}

export default QuizSetup;
