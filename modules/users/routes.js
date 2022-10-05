const router = require('express').Router();
const { commonMiddlewares } = require('../common');
const userController = require('./controllers');

router.use(commonMiddlewares.isAuthenticated);

router.route('/users').get(userController.getAllUsers);
router.route('/users/sql').get(userController.getSQLAllUsers);

module.exports = router;