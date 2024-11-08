import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok && data.token) {
                localStorage.setItem('token', data.token);
                message.success('Login successful');
                onLoginSuccess();
                navigate('/');
            } else {
                message.error(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            message.error('An error occurred during login. Please try again.');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                message.success('Account created successfully. Please log in.');
                setIsRegistering(false);
            } else {
                message.error(data.error || 'Failed to create account');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            message.error('An error occurred during registration. Please try again.');
        }
    };

    return (
        <Card title={isRegistering ? 'Create Account' : 'Login'} style={{ maxWidth: 400, margin: 'auto' }}>
            <Form onFinish={isRegistering ? handleRegister : handleLogin}>
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                    {isRegistering ? 'Register' : 'Login'}
                </Button>
            </Form>
            <Button type="link" onClick={() => setIsRegistering(!isRegistering)} block>
                {isRegistering ? 'Back to Login' : 'Create Account'}
            </Button>
        </Card>
    );
}

export default Login;
