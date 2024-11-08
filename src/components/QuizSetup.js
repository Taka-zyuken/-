import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';

const QuizSetup = ({ onSetupComplete }) => {
    const [quizSource, setQuizSource] = useState('target1900');
    const [rangeStart, setRangeStart] = useState(1);
    const [rangeEnd, setRangeEnd] = useState(100);
    const [questionCount, setQuestionCount] = useState(10);
    const [direction, setDirection] = useState('enToJp');
    const [quizType, setQuizType] = useState('multipleChoice');

    const handleSubmit = () => {
        onSetupComplete({ quizSource, rangeStart, rangeEnd, questionCount, direction, quizType });
    };

    return (
        <Form onFinish={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
            <h2>Quiz作成</h2>
            <Form.Item label="単語帳を選ぶ">
                <Select value={quizSource} onChange={setQuizSource}>
                    <Select.Option value="target1900">ターゲット1900</Select.Option>
                    <Select.Option value="sistan">シスタン</Select.Option>
                    <Select.Option value="leap">LEAP</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="問題番号はじめ">
                <Input type="number" value={rangeStart} onChange={(e) => setRangeStart(parseInt(e.target.value))} />
            </Form.Item>

            <Form.Item label="問題番号終わり">
                <Input type="number" value={rangeEnd} onChange={(e) => setRangeEnd(parseInt(e.target.value))} />
            </Form.Item>

            <Form.Item label="問題数">
                <Input type="number" value={questionCount} onChange={(e) => setQuestionCount(parseInt(e.target.value))} />
            </Form.Item>

            <Form.Item label="向き">
                <Select value={direction} onChange={setDirection}>
                    <Select.Option value="enToJp">英語 → 日本語</Select.Option>
                    <Select.Option value="jpToEn">日本語 → 英語</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="クイズの種類">
                <Select value={quizType} onChange={setQuizType}>
                    <Select.Option value="multipleChoice">4択問題</Select.Option>
                    <Select.Option value="allAtOnce">一斉解答</Select.Option>
                </Select>
            </Form.Item>

            <Row justify="center">
                <Button type="primary" htmlType="submit">Start Quiz</Button>
            </Row>
        </Form>
    );
};

export default QuizSetup;
