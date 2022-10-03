const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

function registerAppMiddlewares(app) {
	app
		.use(express.json())
		.use(express.urlencoded({ extended: true }))
		.use(cors())
		.use(morgan('dev'));
}

module.exports = registerAppMiddlewares;

