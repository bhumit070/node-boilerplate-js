const router = require('express').Router();

const authControllers = require('./controllers');

router.route('/login').post(authControllers.login);
router.route('/register').post(authControllers.register);

module.exports = router;