const {
    validationResult
} = require('express-validator');
module.exports = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        console.log(JSON.parse(JSON.stringify(errors.array())));
        return res.status(400);

    }

}