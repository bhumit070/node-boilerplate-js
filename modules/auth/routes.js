const router = require('express').Router();

const authControllers = require('./controllers');

router.route('/login').post(authControllers.login);

module.exports = router;