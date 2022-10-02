
const {transports, createLogger, format} = require('winston');

const errorLogger = createLogger({
	level: 'info'	,
	format: format.combine(
			format.timestamp(),
			format.json(),
	),
	transports: [
		new transports.File({ filename: './logs/error.log', level: 'error' }),
	]
});

const successLogger = createLogger({
	level: 'info',
	format: format.combine(
			format.timestamp(),
			format.json(),
	),
	transports: [
		new transports.File({ filename: './logs/success.log', level: 'info' }),
	]
});

const logger = createLogger({
	level: 'info',
	format: format.combine(
			format.timestamp(),
			format.json(),
	),
	transports: [
		new transports.Console(),
		new transports.File({ filename: './logs/logger.log', level: 'info' }),
	]
});

module.exports = { errorLogger, successLogger, logger };