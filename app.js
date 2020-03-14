const fs=require('fs');
const stream= fs.createWriteStream("myfile.txt");

const express = require('express');
const app = express();
const indexRouter= require('./routes/route');
const port = 3000

// Create Connection

//Connect

app.use('/api',indexRouter);
app.use(express.json());
app.use('/',(req,res)=>{
   
        let whatever='abed\ntikkawi';
        fs.writeFile('toPython.txt',whatever,(err)=>{
            if(err)
            throw err;
            console.log('Mirrorly Server is Online')
            console.log('Done writing to toPython.txt');
        })
});
app.listen(port, () => {







    console.log(`Example app listening on port ${port}!`)}
    
    );
