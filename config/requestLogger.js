const morgan = require('morgan');
const logger = require('./logger');

const options = {
    stream: {
        write: message => logger.info(message.trim())
    }
}

const format = ':requestId :method :url :status :response-time ms';
morgan.token('requestId', request => request.id);

module.exports = morgan(format, options);