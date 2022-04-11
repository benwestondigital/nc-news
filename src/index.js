import React from 'react';
import ReactDOM from 'react-dom';
import './common/css/index.css';
import App from './App';
import { UserProvider } from './common/contexts/User.js';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
