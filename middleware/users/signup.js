const {
    check
} = require('express-validator');

module.exports = [
    check('fname').not().isEmpty(),
    check('lname').not().isEmpty(),
    check('email').not().isEmpty(),
    check('phoneNumber').not().isEmpty(),
    check('password').not().isEmpty()
]