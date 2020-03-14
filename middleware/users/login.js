const {
    check
} = require('express-validator');

module.exports=[
    check('username').not().isEmpty(),
    check('password').not().isEmpty()
]