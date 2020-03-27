const HashMap = require('hashmap');
const myParser = require("body-parser");
const sgMail = require('@sendgrid/mail');
const mysql = require('../../db/config.js');

module.exports = async (req, res) => {




    try {
        const obj = JSON.parse(JSON.stringify(req.body));
        const firstname = obj.fname.toString();
        const lastname = obj.lname.toString();
        const email1 = obj.email.toString();
        const password1 = obj.password.toString();
        console.log(obj);
        const secret = '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';
        sgMail.setApiKey(secret);
        const selectquery = "SELECT COUNT(*) AS emails FROM mirrorly.users WHERE users_email=?";
        mysql.query(selectquery, [email1], function (err, result) {
            if (err) throw err;
            if (result[0].emails === 0) {
                const insertQuery = "INSERT INTO users (users_fname,users_lname,users_email,users_password,users_isVerified) VALUES (?,?,?,?,?)";
                mysql.query(insertQuery,
                    [firstname, lastname, email1, password1, '0'],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            throw err;
                        } else {
                            console.log('Insert query result is successfull !');
                            const msg = {
                                to: email1,
                                from: 'mirrorly961@gmail.com',
                                subject: 'Please verify your email',
                                text: 'Please verify your email by pressing the link below',
                                html: '<strong> WELCOME TO MIRRORLY ! </strong>',
                            };
                            (async () => {
                                try {
                                    await sgMail.send(msg);
                                    console.log('Message has been Sent to '+firstname+' on Email :'+ email1);
                                } catch (err) {
                                    console.error(err.toString());
                                }
                            })();

                        }

                    });
            }
            if (result[0].emails != 0) {

                console.log('Error , User already exists ');

            }

        });

        return res.status(200).json({
            status: 'success'


        });




    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'error',
            data: {
                message: 'Internal Server Error'
            }
        })
    }

}