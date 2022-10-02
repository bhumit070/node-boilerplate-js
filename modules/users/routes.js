const router = require('express').Router();
const userController = require('./controllers');

router.route('/users').get(userController.getAllUsers);

module.exports = router;