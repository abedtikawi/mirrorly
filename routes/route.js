const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authMiddleware = require('../middleware/auth/auth'); //to keep users authenticated
router.use(bodyParser.json());
router.route('/users/selectAll').post(require('../controllers/users/selectAll'))

router.route('/users/:id/:status').post(require('../controllers/users/selectId'))

// require('../middleware/users/signup'),


router.route('/users/signup').post(require('../middleware/users/signup'),require('../controllers/users/signup'));
router.route('/users/login').post(require('../middleware/users/login'), require('../controllers/users/login'))



module.exports = router