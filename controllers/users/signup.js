const HashMap = require('hashmap');
const myParser = require("body-parser");
const sgMail = require('@sendgrid/mail');
const pool = require('../../db/config.js');
const validateBody = require('../../utils/validateBody');

module.exports = async (req, res) => {

    validateBody(req, res);
    console.log(JSON.parse(JSON.stringify(req.body)));
    const {
        fname,
        lname,
        email,
        password,
        phoneNumber
    } = req.body;
    if (req.body.email == null || req.body.fname || req.body.fname || req.body.password || req.body.phoneNumber) {
        console.log('Attributes missing');
        return res.status(422).json({
            message: 'Attributes missing',
        });
    }
    try {



        const secret = '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';
        sgMail.setApiKey(secret);
        const selectquery = "SELECT COUNT(*) AS emails FROM mirrorly.users WHERE users_email=?";
        pool.query(selectquery, [req.body.email], function (err, result) {
            if (err) throw err;
            if (result[0].emails === 0) {
                const insertQuery = "INSERT INTO mirrorly.users (users_fname,users_lname,users_email,users_password,users_isVerified,users_phoneNumber) VALUES (?,?,?,?,?,?)";
                pool.query(insertQuery,
                    [req.body.fname, req.body.lname, req.body.email, req.body.password, '0', req.body.phoneNumber],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            throw err;
                        } else {
                            console.log('Insert query result is successfull !');
                            const msg = {
                                to: req.body.email,
                                from: 'mirrorly961@gmail.com',
                                subject: 'Please verify your email',
                                text: 'Please verify your email by pressing the link below',
                                html: '<strong> WELCOME TO MIRRORLY ! </strong>',
                            };
                            (async () => {
                                try {
                                    await sgMail.send(msg);
                                    console.log('Message has been Sent to ' + req.body.fname + ' on Email :' + req.body.email);
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