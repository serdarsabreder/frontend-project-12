import path from 'path';
import Fastify from 'fastify';
import plugin from '@hexlet/chat-server/src/plugin.js';

const port = Number(process.env.PORT) || 5001;

const fastify = Fastify({
  logger: true,
});

const state = {
  users: [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'user', password: 'user' },
    { id: 3, username: 'guest', password: 'guest' },
  ],
};

const start = async () => {
  try {
    const appOptions = {
      staticPath: path.resolve(process.cwd(), 'frontend/dist'),
      state,
    };
    const preparedServer = await plugin(fastify, appOptions);
    await preparedServer.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
