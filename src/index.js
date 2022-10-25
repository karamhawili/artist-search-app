import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { SpotifyProvider } from './hooks/useSpotify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <SpotifyProvider>
        <App />
      </SpotifyProvider>
    </Router>
  </React.StrictMode>
);
