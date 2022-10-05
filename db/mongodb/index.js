const mongoose = require('mongoose');
const { logger } = require('../../server/logger');

const MONGO_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/node-boiler-plate';

const MONGO_OPTIONS = {};

mongoose
	.connect(MONGO_URI, MONGO_OPTIONS)
	.then(() => {
		/* 
			this is here because sometime our changes does not get affected in database 
			and it gets error and we are like what the hell I changed the model 
			but why still db is not getting updated.
			so this file is imported in server.js and so it will be executed on server start
			so changes will get reflected in db
		*/
		require('./models/');
		logger.info('MongoDB connected');
	})
	.catch(e => {
		logger.error(e);
		process.exit(1);
	});