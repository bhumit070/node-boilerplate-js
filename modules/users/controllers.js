const { UserModel } = require('../../db/mongodb/models');
const { redisClient } = require('../../db/redis');
const { CustomResponse } = require('../../helpers/response');


async function getAllUsers(req, res) {
	try {
		const cachedUsers = await redisClient.get('users');
		if(cachedUsers) {
			return new CustomResponse(res).send({ data: { users: JSON.parse(cachedUsers) }});
		}
		const users = await UserModel.find({});w
		await redisClient.setex('users', 10, JSON.stringify(users));
		return new CustomResponse(res).send({ data: { users }});
	} catch (error) {
		return new CustomResponse(res).send({ error });
	}
}

module.exports = {
	getAllUsers
};