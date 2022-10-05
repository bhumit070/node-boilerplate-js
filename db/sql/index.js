const { PrismaClient } = require('@prisma/client');
const { errorLogger, logger } = require('../../server/logger');

const prisma = new PrismaClient;

prisma.$connect().then(() => {
	logger.info('Connected to database via prisma 🔼.');
})
.catch(err => {
	errorLogger.error(err);
});

prisma.$on('query', (query) => {
	logger.info(query);
});

prisma.$on('beforeExit', async () => {
	await prisma.$disconnect();
});

prisma.$on('error', (e) => {
	errorLogger.error(e);
	process.exit(1);
});

module.exports = { prisma };