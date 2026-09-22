import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { config } from './config.js';
import { initAnalytics } from './lib/analytics.js';
import './styles.css';

initAnalytics(config.gaId);
createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
