const winston = require('winston');

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
