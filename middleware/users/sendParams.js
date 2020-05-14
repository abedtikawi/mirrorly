const {
    check
} = require('express-validator');

module.exports = [
    check('id').not().isEmpty(),
    check('status').not().isEmpty(), 
    check('timestamp').not().isEmpty()
]