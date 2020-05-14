const ls=require('local-storage');





module.exports = async (req, res) => {
    // const express = require('express');
    // const
    // spawn = require("child_process").spawn;
    //     console.log("File was closed!");
    //     const pythonProcess = spawn('python', ["./myScript.py"]);

    //     pythonProcess.stdout.on('data', (data) => {

    //         console.log(data.toString('utf8'));

    //     });
    //     console.log("Python script running");

    //     res.end();

    try {
        console.log(ls);
        console.log(ls.get('userID'));
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