const { UserModel } = require('../../db/mongodb/models');
const { CustomResponse } = require('../../helpers/response');


async function getAllUsers(req, res) {
	try {
		const users = await UserModel.find({});
		return new CustomResponse(res).send({ data: { users }});
	} catch (error) {
	return new CustomResponse(res).send({ error });
	}
}

module.exports = {
	getAllUsers
};