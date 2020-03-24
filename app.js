const fs = require('fs');
const stream = fs.createWriteStream("myfile.txt");
const serveStatic = require('serve-static')
const connect = require('connect');
const express = require('express');
const app = express();
const indexRouter = require('./routes/route');
const port = 5500;
app.use(express.json());
// 
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
// connect().use(serveStatic(__dirname)).listen(8080, function () {
//             console.log('Server running on 8080...')});