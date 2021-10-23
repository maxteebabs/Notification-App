const express = require('express');
const process = require('process');
const fs = require('fs');
const http = require('http');
const https = require('https');
const expressRequestId = require('express-request-id')();
const logger = require('./config/logger');
const requestLogger = require('./config/requestLogger');
const cors = require('cors');
const routes = require('./subscriber/routes');

const app = express();
app.use(expressRequestId);
app.use(requestLogger);
app.use(express.json());
const port = process.env.SERVER_PORT || 9000;
app.set(port);
app.use('/api', cors());
app.use('/', routes);


const useHttps = ['true', '1'].includes(
    (process.env.USE_HTTPS || '').toLowerCase());

let server;
if (useHttps) {
  server = https.createServer({
    key: fs.readFileSync(`${process.env.KEY_PATH}/privatekey.pem`),
    cert: fs.readFileSync(`${process.env.KEY_PATH}/cert.pem`),
    ca: fs.readFileSync(`${process.env.KEY_PATH}/chain.pem`),
  }, app);
} else {
  server = http.createServer(app);
}

server.listen(port);
server.on('listening', () => {
  logger.info(`Subscriber Server Is Listening On: ${port}. `);
});

app.shutdown = () => {
  // clean up your resources and exit
  logger.info('Killing process and shutting down...');
  process.exit();
};

// ERROR HANDLERS
app.use((error, req, res, next) => {
  logger.error('An Error occured');
  return res.status(500).json({error: error.toString()});
});

module.exports = server;
