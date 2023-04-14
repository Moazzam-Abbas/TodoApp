import { createLogger } from 'bunyan';

const logger = createLogger({
  name: 'myapp',
  stream: process.stdout,
  level: 'info'
});

export {logger}