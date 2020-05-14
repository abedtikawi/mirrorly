const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authMiddleware = require('../middleware/auth/auth');
router.use(bodyParser.json());
router.route('/users/:id/:status/:timestamp').post(require('../controllers/users/selectId'));
router.route('/users/signup').post(require('../middleware/users/signup'),require('../controllers/users/signup'));
router.route('/users/login').post(require('../middleware/users/login'), require('../controllers/users/login'));
router.route('/users/pythonscript').get(require('../controllers/users/mirrorlypy'));
router.route('/users/userCalender').post(require('../controllers/users/userCalender'));
router.route('/users/coordinates').post(require('../controllers/users/coordinates'));
router.route('/users/toDo').post(require('../controllers/users/usersToDo'));

router.route('/weather').get(require('../controllers/weather/weatherApiCall'));
router.route('/news').get(require('../controllers/news/news'));
router.route('/userValues').get(require('../controllers/values/userValues'));
router.route('/motors').get(require('../controllers/motors/userMotors'));

module.exports = router     