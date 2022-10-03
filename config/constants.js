module.exports = {
	API_VERSION_V1: '/v1',
	JWT_SECRET: process.env.JWT_SECRET || 'secret',
	JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ||  '1d',
};