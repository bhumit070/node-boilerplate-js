const router = require('express').Router();

const authControllers = require('./controllers');

router.route('/login').post(authControllers.login);
router.route('/register').post(authControllers.register);

router.route('/login/sql').post(authControllers.loginSQL);
router.route('/register/sql').post(authControllers.registerSQL);

module.exports = router;