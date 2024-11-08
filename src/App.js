import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import 'antd/dist/reset.css'; // Ant DesignのリセットCSS
import QuizApp from './components/QuizApp';
import QuizSetup from './components/QuizSetup'; // QuizSetupをインポート
import Login from './components/Login';

const { Header, Content, Footer } = Layout; // Ant Designのレイアウトコンポーネントを取得

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 認証状態を管理

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              {isAuthenticated ? (
                <Button type="primary" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Navigate to="/login" />
              )}
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px' }}>
          <div className="site-layout-content">
            <Routes>
              {isAuthenticated ? (
                <>
                  <Route path="/" element={<QuizApp />} />
                  <Route path="/quiz-setup" element={<QuizSetup />} />
                </>
              ) : (
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              )}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Quiz App ©2024 Created with Ant Design</Footer>
      </Layout>
    </Router>
  );
}

export default App;
