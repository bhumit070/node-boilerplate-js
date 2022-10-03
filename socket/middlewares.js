const { authHelpers } = require('../helpers');
const { CustomError, responseGenerator } = require('../helpers').responseHelpers;
const { redisClient } = require('../db/redis');

async function isAuthenticated(socket, next) {
	try {
		const token =
		socket.handshake.query.token ||
		socket.handshake.headers.token ||
		socket.handshake.auth.token;

		if(!token) {
			return next(new CustomError({ message: 'User is not LoggedIn.'}));
		}

		const decoded = await authHelpers.decodeToken(token);

		if(!decoded) {
			throw new CustomError({ message: 'User is not LoggedIn.'});
		}

		await redisClient.set(socket.id, decoded.id);

		return next();

	} catch (error) {
		const errorMessage = responseGenerator({ error }).message;
		return next(new Error(errorMessage));
	}
}

module.exports = {
	isAuthenticated
};