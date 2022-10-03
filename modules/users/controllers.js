const { UserModel } = require('../../db/mongodb/models');
const { redisClient, redisPublisher } = require('../../db/redis');
const { CustomResponse } = require('../../helpers').responseHelpers;


async function getAllUsers(req, res) {
	try {
		const cachedUsers = await redisClient.get('users');
		if(cachedUsers) {
			return new CustomResponse(res).send({ data: { users: JSON.parse(cachedUsers) }});
		}
		const users = await UserModel.find({});
		redisPublisher.publish('users', JSON.stringify(users));
		await redisClient.setex('users', 10, JSON.stringify(users));
		return new CustomResponse(res).send({ data: { users }});
	} catch (error) {
		return new CustomResponse(res).send({ error });
	}
}

module.exports = {
	getAllUsers
};