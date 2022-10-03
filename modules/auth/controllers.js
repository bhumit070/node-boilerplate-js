const { CustomResponse, CustomError } = require('../../helpers').responseHelpers;
const { loginSchema, registerSchema } = require('./validators');
const joiConfig = require('../../config/joi');
const { UserModel } = require('../../db/mongodb/models');
const { authHelpers } = require('../../helpers');

async function login(req, res) {
	try {
		const value = await loginSchema.validateAsync(req.body, joiConfig.defaultConfig);

		const user = await UserModel.findOne({ email: value.email }).lean();

		if(!user) {
			throw new CustomError({ message: 'User not found.!', status: 404 });
		}

		if(user.password !== value.password) {
			throw new CustomError({ message: 'Invalid credentials.!', status: 401 });
		}

		const token = authHelpers.encodeToken(user);
		
		return new CustomResponse(res).send({ data: { user, token } } );
	} catch (error) {
		return new CustomResponse(res).send({ error });
	}
}

async function register(req, res) {
	try {
		const value = await registerSchema.validateAsync(req.body, joiConfig.defaultConfig);

		const existingUser = await UserModel.findOne({ email: value.email }).lean();

		if(existingUser) {
			throw new CustomError({ message: 'User already exists.!', status: 409 });
		}

		const createdUser = await UserModel.create(value);
		const data = {
			user: createdUser
		};
		return new CustomResponse(res).send({ data, status: 201 } );
	} catch (error) {
		return new CustomResponse(res).send({ error });
	}
}

module.exports = {
	login,
	register
};