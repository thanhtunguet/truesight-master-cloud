// Import React and ReactDOM
import * as Sentry from '@sentry/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import 'zmp-ui/zaui.css';
import appConfig from '../app-config.json';
// Import App Component
import App from './components/app';
import './css/app.scss';
import {persistor, store} from './store';
import './helpers/home';

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

Sentry.init({
  dsn: 'https://d456c501dff949a4be6f5c3bb62b6b42@o404808.ingest.sentry.io/4505248106086400',
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

// Mount React App
const root = createRoot(document.getElementById('app')!);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
