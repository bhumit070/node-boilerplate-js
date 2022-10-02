const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

function register_app_middlewares(app) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.use(morgan('dev'));
}

module.exports = register_app_middlewares;

