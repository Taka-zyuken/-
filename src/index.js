// 正しいCSSのインポート
import 'antd/dist/reset.css'; // Ant Designのリセットスタイルをインポート
import React from 'react';
import ReactDOM from 'react-dom/client'; // <- 新しいimport方法
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // <- createRootを使用
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
