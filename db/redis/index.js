const { logger } = require('../../server/logger');

const Redis = require('ioredis').default;
const redis = new Redis();

redis.on('connect', () => {
	logger.info('Redis connected');
});

redis.on('error', (error) => {
	logger.error('Redis error', error);
});

module.exports = {
	redisClient: redis
};