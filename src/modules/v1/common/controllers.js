const { NextFunction, Request, Response } = require('express');

const { CustomError } = require('../../../errors/error');
const { response } = require('../../../helpers/');
const { CustomResponse } = require('../../../helpers/response');
const { ZodError } = require('zod');
const { config } = require('../../../config');

function routeNotFound() {
  throw new CustomError('Route not found', 404);
}

function handleApiError(error, _req, res, _next) {
  const payload = {
    code: 500,
    res,
    message: 'Internal server error',
    data: config.NODE_ENV === 'DEVELOPMENT' ? error.stack : null,
  };

  if (error instanceof CustomError) {
    payload.message = error.message;
    payload.code = error.code;
  }

  if (error instanceof ZodError) {
    payload.code = 422;
    payload.message = `Invalid data provided.`;
    let data = {};
    for (const key in error.formErrors.fieldErrors) {
      data[key] =
        error.formErrors.fieldErrors[key]?.join(', ') || 'Invalid input.';
    }
    payload.data = data;
  }

  response.error(payload);
}

module.exports = {
  routeNotFound,
  handleApiError,
};
