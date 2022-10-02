const { CustomResponse } = require('../../helpers/response');
const { loginSchema } = require('./validators');
const joiConfig = require('../../config/joi');
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
		const value = await loginSchema.validateAsync(req.body);
		return new CustomResponse(res).send({ data: { body: value, users } }, joiConfig.defaultConfig );
	} catch (error) {
		return new CustomResponse(res).send({ error });
	}
}

module.exports = {
	login
};