const fs=require('fs');
const stream= fs.createWriteStream("myfile.txt");

const express = require('express');
const app = express();
const indexRouter= require('./routes/route');
const port = 8080

// Create Connection

//Connect

app.use('/api',indexRouter);
app.use(express.json());

app.listen(port, () => {







    console.log(`Example app listening on port ${port}!`)}
    
    );
