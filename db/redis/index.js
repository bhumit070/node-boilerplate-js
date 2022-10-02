const { logger } = require('../../server/logger');

const Redis = require('ioredis').default;

const redisOptions = {
	db: 0,
	port: 6379,
	host: 'localhost',
};

const redis = new Redis(redisOptions);
const redisPublisher = new Redis(redisOptions);
const redisSubscriber = new Redis(redisOptions);

function handleRedisExpiredKeys(channel, data) {
	logger.info({channel, data});
}

redisSubscriber.on('message', handleRedisExpiredKeys);

const subScribeExpired = () => {
  const expired_subKey = `__keyevent@${redisOptions.db}__:expired`;
  redisSubscriber.subscribe(expired_subKey, 'users', handleRedisExpiredKeys);
};


redis.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], subScribeExpired);

redis.on('connect', () => {
	logger.info('Redis connected');
});

redis.on('error', (error) => {
	logger.error('Redis error', error);
});

module.exports = {
	redisClient: redis,
	redisPublisher,
	//redisSubscriber,
};