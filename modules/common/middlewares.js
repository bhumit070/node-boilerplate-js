const { UserModel } = require('../../db/mongodb/models');
const { authHelpers } = require('../../helpers');
const { CustomResponse, CustomError } = require('../../helpers').responseHelpers;

async function isAuthenticated(req, res, next) {
	try {

		let token = req.headers.authorization;

		if(!token) {
			throw new CustomError({ status: 401, message: 'You are not authorized.' });
		}

		if(token.includes('Bearer')) {
			token = token.substring(7).trim();
		}

		const decoded = await authHelpers.decodeToken(token);

		if(!decoded) {
			throw new CustomError({ status: 401, message: 'You are not authorized.' });
		}

		const user = await UserModel.findOne({ _id: decoded.id }).lean();

		if(!user) {
			throw new CustomError({ status: 401, message: 'You are not authorized.' });
		}

		req.user = user;

		return next();
	} catch (error) {
		return new CustomResponse(res).send({ error, status: 401, message: 'Session has been expired, please login again.' });
	}
}

module.exports = {
	isAuthenticated,
};