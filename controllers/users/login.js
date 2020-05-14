const pool = require('../../db/config.js');
let ls = require('local-storage');
const validateBody = require('../../utils/validateBody');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


let CryptoJS = require("crypto-js");

module.exports = async (req, res) => {
    validateBody(req, res);

    const {
        email,
        password
    } = req.body;
    // if (req.body.email == null || req.body.password == null) {
    //     console.log('Attributes missing');
    //     return res.status(422).json({
    //         message: 'Attributes missing'
    //     });
    // }
    try {
        console.log(JSON.parse(JSON.stringify(req.body)));
        const selectQuery = "SELECT * FROM mirrorly.users AS reply where users_email=?";
        pool.query(selectQuery,
            [req.body.email],
            function (error, result, fields) {
                if (error) {
                    console.log('Error occured ,' + error);
                } else {
                    console.log(JSON.parse(JSON.stringify(result[0])));
                    if (result.length > 0) {
                        if (bcrypt.compareSync(req.body.password , result[0].users_password)) {
                            console.log('Login successfull');
                            ls.set('userID', result[0].users_id);
                            console.log(ls.get('userID'));
                            req.session.save();
                        } else {
                            console.log('email and password do not match');
                            console.log('Please try again .');
                        }
                    } else {
                        console.log('email doesnt exist');
                    }
                }
            });

        // const isPasswordMatch = await bcrypt.compare(result[0].users_password, req.body.users_password);


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