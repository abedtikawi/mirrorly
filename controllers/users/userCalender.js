const session = require('express-session')
const ls = require('local-storage');
const pool = require('../../db/config.js');
const fs = require('fs');
const {
    google
} = require('googleapis');
const {
    OAuth2
} = google.auth

module.exports = async (req, res) => {


    try {
        const {
            summary,
            location,
            description,
            startDate,
            endDate,
            duration
        } = req.body;
        console.log(JSON.parse(JSON.stringify(req.body)));

        // if (req.body.summary == null || req.body.location == null || req.body.description == null || req.body.startDate == null || req.body.endDate == null || req.body.duration == 0) {
        //     console.log('Attributes missing in body');
        //     return res.status(422).json({
        //         message: 'Attributes missing',
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
        let whatever = req.body.summary + ' ' + req.body.location + ' ' + req.body.description + ' ' + req.body.startDate + ' ' + req.body.endDate + ' ' + req.body.duration + ' ' + userID + '\n';
        let filename = "dates.txt";

        function writeFile() {
            fs.writeFile(filename, whatever, {
                flag: "a"
            }, function (err) {
                if (err) {
                    console.log("file" + filename + "already exists , testing next");
                } else {
                    console.log("Successfully written " + filename + " \nValues : " + whatever);
                }
            });
        }

        console.log(userID);
        const insertQuery = "INSERT INTO mirrorly.calender (calender_summary,calender_location,calender_description,calender_startDate,calender_endDate,calender_duration,users_id) VALUES (?,?,?,?,?,?,?)";
        pool.query(insertQuery,
            [req.body.summary, req.body.location, req.body.description, req.body.startDate, req.body.endDate, req.body.duration, userID],
            function (err, res) {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    console.log('Date Inserted!');
                    writeFile();



                    const oAuth2Client = new OAuth2(
                        '52035293860-vl8jt0bhnai2im92b5ugs5tevnib93t3.apps.googleusercontent.com',
                        '3KfgsMeb5cGGU2I8oPScWQ2t')

                    oAuth2Client.setCredentials({
                        refresh_token: '1//04JImXbagrzpRCgYIARAAGAQSNwF-L9Irx8TH_UiQ3eAdRT5QqrHgUQgENbA4oz0IvlCvZQFV1pcY3PS8wYDp19HuyY5hs30Euws'
                    });
                    const calender = google.calendar({
                        version: 'v3',
                        auth: oAuth2Client
                    });

                    function time() {
                        const eventStartTime = new Date();
                        eventStartTime.setDate(eventStartTime.getDay() + (parseInt(startDate) - eventStartTime.getDay()))
                        eventStartTime.setMinutes(eventStartTime.getMinutes() + 900);
                        console.log(eventStartTime);

                        const eventEndTime = new Date();
                        eventEndTime.setDate(eventEndTime.getDay() + (parseInt(endDate) - eventEndTime.getDay()));
                        eventEndTime.setMinutes(eventEndTime.getMinutes() + 960);
                        console.log(eventEndTime + ' im here ');

                        const event = {
                            summary: req.body.summary,
                            location: req.body.location,
                            description: req.body.description,
                            start: {
                                dateTime: eventStartTime,
                                timeZone: 'Asia/Beirut'
                            },
                            end: {
                                dateTime: eventEndTime,
                                timeZone: 'Asia/Beirut'
                            },
                            colorId: 3,
                        }
                        calender.freebusy.query({
                            resource: {
                                timeMin: eventStartTime,
                                timeMax: eventEndTime,
                                timeZone: 'Asia/Beirut',
                                items: [{
                                    id: 'primary'
                                }],

                            }
                        }, (err, res) => {
                            if (err) return console.log('Free Busy Query Error: ', err)
                            const eventsArray = res.data.calendars.primary.busy;
                            if (eventsArray.length === 0) return calender.events.insert({
                                calendarId: 'primary',
                                resource: event
                            }, err => {
                                if (err) return console.error('Calender Evenet Creation Error:', err);
                                return console.log('Calender Event Created.');
                            })
                            return console.log('I am Busy at that day , Try another day ');
                        })

                    }


                    time();
                }
            });
        return res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            status: 'error',
            data: {
                message: 'Internal Server Error'
            }
        });
    }
}