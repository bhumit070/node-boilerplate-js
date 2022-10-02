const router = require('express').Router();

const authRoutes = require('../auth/routes');
const userRoutes = require('../users/routes');

router.use(authRoutes);
router.use(userRoutes);

module.exports = router;