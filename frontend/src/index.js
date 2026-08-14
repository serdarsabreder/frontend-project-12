import { StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import store from './slices/index.js';
import i18n from './i18n/index.js';
import rollbar, { rollbarConfig } from './services/rollbar.js';

function ErrorFallback() {
  const { t } = useTranslation();
  return createElement(
    'div',
    { className: 'd-flex align-items-center justify-content-center vh-100' },
    createElement('h1', null, t('errors.unknown')),
  );
}

const app = createElement(
  Provider,
  { store },
  createElement(
    BrowserRouter,
    null,
    createElement(
      I18nextProvider,
      { i18n },
      createElement(ErrorBoundary, { fallbackUI: ErrorFallback }, createElement(App)),
    ),
  ),
);

const root = rollbarConfig
  ? createElement(
      RollbarProvider,
      { config: rollbarConfig },
      app,
    )
  : app;

if (rollbar && new URLSearchParams(window.location.search).has('rollbar_test')) {
  rollbar.error('Rollbar test error');
}

createRoot(document.getElementById('root')).render(
  createElement(StrictMode, null, root),
);
