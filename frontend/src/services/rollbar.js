import Rollbar from 'rollbar';

const rollbarConfig = {
  accessToken: 'dfbfbd1fdf5f40c6bc49d15cc50e1b0d',
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
};

const rollbar = new Rollbar(rollbarConfig);

export default rollbar;
export { rollbarConfig };
