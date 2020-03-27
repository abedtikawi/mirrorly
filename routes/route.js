const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authMiddleware = require('../middleware/auth/auth'); //to keep users authenticated , ask atrouni about the jwt stuff
router.use(bodyParser.json());
router.route('/users/:id/:status').post(require('../controllers/users/selectId'));
router.route('/users/signup').post(require('../middleware/users/signup'),require('../controllers/users/signup'));
router.route('/users/login').post(require('../middleware/users/login'), require('../controllers/users/login'));
router.route('/users/pythonscript').get(require('../controllers/users/mirrorlypy'));



module.exports = router