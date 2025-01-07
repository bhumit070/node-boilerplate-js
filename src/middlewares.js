const express = require('express');

const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const multer = require('multer');
const cors = require('cors');

const {
  handleApiError,
  routeNotFound,
} = require('./modules/v1/common/controllers');
const routes = require('./modules');
const { config } = require('./config');

function registerMiddlewares(app) {
  app
    .use(express.json())
    .use(hpp({}))
    .use(helmet())
    .use(morgan('dev'))
    .use(
      cors({
        origin:
          config.ALLOWED_ORIGINS === '*'
            ? config.ALLOWED_ORIGINS
            : config.ALLOWED_ORIGINS.split(','),
        credentials: true,
      })
    )
    .use(multer().single('file'))
    .disable('x-powered-by');
}

function registerRoutes(app) {
  app.use('/api', routes).use(routeNotFound).use(handleApiError);
}

module.exports = {
  registerRoutes,
  registerMiddlewares,
};
