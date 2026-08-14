import Rollbar from 'rollbar';

const accessToken = import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN;

const rollbarConfig = accessToken ? {
  accessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: import.meta.env.MODE,
  payload: {
    client: {
      javascript: {
        code_version: '1.0.0',
      },
    },
  },
} : null;

const rollbar = accessToken ? new Rollbar(rollbarConfig) : null;

export default rollbar;
export { rollbarConfig };
