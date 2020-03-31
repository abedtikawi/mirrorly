const pool = require('../../db/config.js');
// const session=require('express-session');
// const FileStore=require('session-file-store')(session);
const validateBody = require('../../utils/validateBody');
module.exports = async (req, res) => {
    validateBody(req, res);
    console.log(JSON.parse(JSON.stringify(req.body)));
    const {
        email,
        password
    } = req.body;
    if (req.body.email == null || req.body.password==null) {
        console.log('Attributes missing');
        return res.status(422).json({
            message: 'Attributes missing'
        });
    }
    try {

        const selectQuery = "SELECT users_password AS reply FROM mirrorly.users where users_email=?";
        pool.query(selectQuery, [req.body.email], function (error, result, fields) {
            if (error) {
                console.log('Error occured ,' + error);
            } else {
                if (result.length > 0) {
                    if (result[0].reply == req.body.password) {
                        console.log('Login successfull');
                    } else {
                        console.log('email and password do not match');

                    }
                } else {
                    console.log('email doesnt exist');

                }
            }


        });

        return res.status(200).json({
            status: 'Success'
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'error',
            data: {
                message: 'Internal Server Error'
            }
        });
    }
}