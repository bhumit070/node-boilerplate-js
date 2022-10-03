const jwt = require('jsonwebtoken');
const { constants } = require('../config');

function encodeToken(user) {
	const token = jwt.sign(user, constants.JWT_SECRET, {
		expiresIn: constants.JWT_EXPIRES_IN
	});
	return token;
}

function decodeToken(token) {
	const decoded = new Promise((resolve, reject) => {
		try {
			const payload = jwt.verify(token, constants.JWT_SECRET);
			resolve(payload);
		} catch (err) {
			reject(err);
		}
	});
	return decoded;
}

module.exports = {
	encodeToken,
	decodeToken,
};