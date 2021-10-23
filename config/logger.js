const winston = require('winston');
const config = require("./config.json")[process.env.NODE_ENV];

const logger = winston.createLogger({
    level: config.LOG_LEVEL || 'silly',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });   

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple()
            // Winston.format.printf(info =>
            //     // eslint-disable-next-line max-len
            //     `${info.level}[${info.label || info.timestamp}]: ${info.requestId || '<No_Request_Id>'} ${info.message}`)
        ),
    }));
}else {
    logger.add(new winston.transports.File({
        filename: './logs/error.log',
        name: 'error-file',
        level: 'error',
        format: winston.format.json()
      }));
}

module.exports = logger;