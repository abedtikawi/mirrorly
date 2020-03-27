const {
    check
} = require('express-validator');

module.exports=[
    check('email').not().isEmpty(),
    check('password').not().isEmpty()
]