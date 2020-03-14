const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth/auth');//to keep users authenticated

router.route('/users/selectAll').post(require('../controllers/users/selectAll'))
router.route('/users/:id/:status').put(require('../controllers/users/selectId'))
router.route('/users/createUser').post(require('../middleware/users/create'), require('../controllers/users/create'))
router.route('/users/login').post(require('../middleware/users/login'), require('../controllers/users/login'))



module.exports = router;