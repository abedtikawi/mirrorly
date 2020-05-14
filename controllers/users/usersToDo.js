const session = require('express-session')
const ls = require('local-storage');
const pool = require('../../db/config.js');
module.exports = async (req, res) => {




    const {
        eventTitle,
        startTime
    } = req.body;

    console.log(JSON.parse(JSON.stringify(req.body)));

    // if (req.body.event == null || req.body.time == null) {
    //     console.log(T'Attributes missing');
    //     return res.status(422).json({
    //         message: 'Attributes missing'
    //     });
    // }

    let userID = ls.get('userID');
    if (!userID) {
        console.log('No user ID');
        console.log('Login first');
        return res.status(401).json({
            message: 'login first'
        });
    }
    try {


        const insertQuery = "INSERT INTO mirrorly.todo (users_id,toDo_event,toDo_time) VALUES (?,?,?)";
        pool.query(insertQuery,

            [parseInt(userID), req.body.eventTitle, req.body.startTime],

            function (err, res) {
                if (err) {

                    console.log(err);

                    throw err;

                } else {

                    console.log("Data inserted ");
                    // res.redirect('../values/userValues.js');
                    



                }











            }

        )
        
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
        });
    }
}