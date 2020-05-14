 const fs = require('fs');

 const pool = require('../../db/config.js');
 const express = require('express');
 const app = express();
 const io = app.get("io");
//  let {PythonShell}=require('python-shell');
let {PythonShell} = require('python-shell')

 module.exports = async (req, res) => {
     console.log(JSON.parse(JSON.stringify(req.params)));
     //  if (req.params.id == null || req.params.status == null || req.params.timestamp == null) {
     //      console.log('Attributes missing');
     //      return res.status(422).json({
     //          message: 'Attributes missing'
     //      });
     //  };
     try {


         let iotID = req.params.id;
         let iotStatus = req.params.status;
         let timeStamp = req.params.timestamp;
         //  let name = req.params.name;
         //  let pc = req.params.pc;
         //  ' ' + name + ' ' + pc +
         let whatever = iotID + ' ' + iotStatus + ' ' + timeStamp + '\n';
         let filename = "toPython3.txt";
         const sqlSelectQuery = "SELECT * FROM mirrorly.motors AS reply where motors_id = ? ";
         const sqlUpdateQuery = "UPDATE mirrorly.motors set motors_status = ? , motors_timestamp = ?   where motors_id = ? ";

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
         //  const data = 12319823;
         pool.query(sqlSelectQuery, [iotID], (error, result, fields) => {
             if (error) {
                 console.log('Error occured ,' + error);
             } else {

                 if (result[0] == null) {
                     console.log('No such motor in Database , check ID');

                 } else {
                     console.log(JSON.parse(JSON.stringify(result[0])));
                     if (result[0].motors_status == 1) {

                         pool.query(sqlUpdateQuery, [0, timeStamp, iotID], (error1, updateResult, fields) => {
                             if (error) {
                                 console.log('Error Occured , ' + error1);
                             } else {
                                 console.log('MotorID: ' + iotID + ' Status changed to false');

                                 writeFile();
                                 //  io.on('connection', socket => {
                                 //          io.emit('chat-message', data);
                                 //          console.log('Connected to Socket ');

                                 //  })
                             }
                         });

                     } else {

                         pool.query(sqlUpdateQuery, [1, timeStamp, iotID], (error2, updateResult, fields) => {
                             if (error) {
                                 console.log('Error Occured , ' + error2);
                             } else {



                                 //      io.on('connection', socket => {
                                 //         io.emit('chat-message', data);
                                 //         console.log('Connected to Socket ');

                                 // })
                             }
                         });
                     }

                     writeFile();
        
                     PythonShell.run('./pythonSerial.py', null, function (err) {
                         if (err) throw err;
                         console.log('finished');
                     });
                 }

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