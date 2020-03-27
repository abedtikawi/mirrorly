const fs = require('fs');
const stream = fs.createWriteStream("myfile.txt");
const serveStatic = require('serve-static')
const connect = require('connect');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const indexRouter = require('./routes/route');
const mysql=require('./db/config.js');
const port = 5501;
app.use(express.json());
//app.connect();
// 
app.use(bodyParser.urlencoded({ extended: false }));



app.use(bodyParser.json());
const
    spawn = require("child_process").spawn;

app.use('/api', indexRouter);

app.get('/', (req, res) => {



    const a = "hello world"
    res.json(a);
    console.log(a);
    console.log("File was closed!");
    const pythonProcess = spawn('python', ["./myScript.py"]);

    pythonProcess.stdout.on('data', (data) => {

        console.log(data.toString('utf8'));

    });
    console.log("Python script running")

    res.end();


});

app.listen(port, () => {



});
console.log(`Example app listening on port ${port}!`)





// app.use('/api', indexRouter);
// app.use(express.json());
//app.connect().use(serveStatic(__dirname)).listen($port, function () {console.log('listening to port 5501');})
//             console.log('Server running on 8080...')});