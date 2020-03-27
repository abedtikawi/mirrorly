const mysql = require('../../db/config.js');
module.exports = async (req, res) => {
    try {

        const obj = JSON.parse(JSON.stringify(req.body));
        const email = obj.email.toString();
        const password = obj.password.toString();
        console.log(obj);
        const selectQuery = "SELECT users_password AS reply FROM mirrorly.users where users_email=?";
        mysql.query(selectQuery, [email], function (error, result, fields) {
            if (error) {
                console.log('Error occured ,' + error);
            } else {
                if (result.length > 0) {
                    console.log(result[0].reply);
                    if (result[0].reply == password) {
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