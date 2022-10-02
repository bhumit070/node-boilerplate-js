const Joi = require('joi');

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required().min(8).max(30).alphanum()
});

const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required().min(8).max(30).alphanum()
});

module.exports = {
	loginSchema,
	registerSchema
};