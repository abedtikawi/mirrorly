const mysql = require('../../db/config.js');
// const session=require('express-session');
// const FileStore=require('session-file-store')(session);
const validateBody=require('../../utils/validateBody');
module.exports = async (req, res) => {
    try {
        validateBody(req,res);
        const obj = JSON.parse(JSON.stringify(req.body));
        const email = obj.email.toString();
        const password = obj.password.toString();
        console.log(obj);
        // let fileStoreOptions={};
        const selectQuery = "SELECT users_password AS reply FROM mirrorly.users where users_email=?";
        mysql.query(selectQuery, [email], function (error, result, fields) {
            if (error) {
                console.log('Error occured ,' + error);
            } else {
                if (result.length > 0) {
                    if (result[0].reply == password) {
                        console.log('Login successfull');
                        //dont forget to implement session and save session id to pass it on with decay timer 
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