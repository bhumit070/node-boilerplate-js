const { CustomResponse, CustomError } = require('../../helpers/response');
const { loginSchema, registerSchema } = require('./validators');
const joiConfig = require('../../config/joi');
const { UserModel } = require('../../db/mongodb/models');
const users = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john@gmail.com',
		password: 'johndoe'
	},
	{
		id: 2,
		name: 'Jane Doe',
		email: 'jane@gmail.com',
		password: 'janedoe'
	},
];

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
		
		return new CustomResponse(res).send({ data: { body: value, users } } );
	} catch (error) {
		return new CustomResponse(res).send({ error });
	}
}

async function register(req, res) {
	try {
		const value = await registerSchema.validateAsync(req.body, joiConfig.defaultConfig);
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