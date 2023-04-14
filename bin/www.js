#!/usr/bin/env node

import * as dotenv from 'dotenv'
dotenv.config()
import {app} from '../http/app.js';
import debugFn from 'debug';
import http from 'http';
import { logger } from '../Infrastructure/Logger/logger.js';

const debug = debugFn('TodoApp:server');

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
logger.info(`listening on port ${port}`)

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  const parsedPort = parseInt(val, 10);

  if (isNaN(parsedPort)) {
    // Named pipe
    return val;
  }

  if (parsedPort >= 0) {
    // Port number
    return parsedPort;
  }

  return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
     // console.error(`${bind} requires elevated privileges`);
      logger.error({ err: error }, bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
     // console.error(bind + ' is already in use');
      logger.error({ err: error }, bind + ' is already in use');
      // Restart the server instead of terminating
      setTimeout(() => {
        server.close();
        server.listen(port);
      }, 1000);
      break;
    default:
      logger.error({ err: error });
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}