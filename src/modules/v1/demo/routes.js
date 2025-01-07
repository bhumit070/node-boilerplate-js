const { Router } = require('express');
const { helloWorld } = require('./controllers');
const { PromiseHandler } = require('../common/middlewares');

const router = Router();

router.get('/', PromiseHandler(helloWorld));

module.exports = router;
