import { StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import store from './slices/index.js';

createRoot(document.getElementById('root')).render(
  createElement(
    StrictMode,
    null,
    createElement(
      Provider,
      { store },
      createElement(
        BrowserRouter,
        null,
        createElement(App),
      ),
    ),
  ),
);
