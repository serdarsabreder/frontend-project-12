import { StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import store from './slices/index.js';
import i18n from './i18n/index.js';

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
        createElement(
          I18nextProvider,
          { i18n },
          createElement(App),
        ),
      ),
    ),
  ),
);
