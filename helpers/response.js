const { errorLogger, successLogger }  =require('../server/logger');

function getStatusCode(error, status) {
	if(status) {
		return status;
	}

	if(!status && !error) {
		return 200;
	}

	if(error) {
		let status;
		if(Number(error.code)) {
			status = error.code;
		} else  if(Number(error.statusCode)) {
			status = error.statusCode;
		} else if (Number(error.status)) {
			status = error.status;
		} else if(error.isJoi) {
			status = 422;
		}
		return status || 500;
	}
	return 200;
}

function responseGenerator({ status, error, message, data = []}) {
	return {
		status: getStatusCode(error, status),
		error: error ? true : false,
		message: message ? message : 
						 error ? error.message : 
						 error ? 'Internal Server Error' : 'Success',
		data: error && error.isJoi ? error : data
	};
}

class CustomResponse {
	constructor(res) {
		this.res = res;
	}

	send({ status, error, message, data = []}) {
		const response = responseGenerator({ status, error, message, data });
		if(response.error) {
			errorLogger.error(response);
		} else {
			successLogger.info(response);
		}
		return this.res.status(response.status).json(response);
	}

}

class CustomError {
	constructor({ error, message = 'Internal Server Error', code = 500 }) {
		const customError = new Error(message);
		error.code = error.isJoi ? 422 : code;
		throw customError;
	}
}

module.exports = { CustomResponse, responseGenerator, CustomError };