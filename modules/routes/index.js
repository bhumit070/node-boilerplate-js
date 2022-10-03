const router = require('express').Router();
const { constants } = require('../../config');
const { CustomResponse } = require('../../helpers/response');
const V1Routes = require('./v1.route');

router.use(constants.API_VERSION_V1, V1Routes);

router.use((req, res) => {
	return new CustomResponse(res).send({
		error: true,
		message: 'Route not found',
		status: 404,
	});
});

module.exports = app => app.use('/api', router);