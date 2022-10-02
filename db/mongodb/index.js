const mongoose = require('mongoose');
const { logger } = require('../../server/logger');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/node-boiler-plate';

const MONGO_OPTIONS = {};

mongoose
	.connect(MONGO_URI, MONGO_OPTIONS)
	.then(() => logger.info('MongoDB connected'))
	.catch(e => {
		logger.error(e);
		process.exit(1);
	});