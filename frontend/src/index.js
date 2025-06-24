import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Apply inline styles to remove the white border
const rootStyle = {
  margin: '0',
  padding: '0',
  width: '100%',
  height: '100%',
};

const applyGlobalStyles = () => {
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.width = '100%';
  document.body.style.height = '100vh'; // ensures it covers the viewport height

  document.documentElement.style.margin = '0';
  document.documentElement.style.padding = '0';
  document.documentElement.style.width = '100%';
  document.documentElement.style.height = '100%';
};

// Call this function to apply styles before rendering the app
applyGlobalStyles();

ReactDOM.render(
  <Router>
    <div style={rootStyle}>
      <App />
    </div>
  </Router>,
  document.getElementById('root')
);
