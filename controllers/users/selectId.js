const fs = require('fs');
const stream = fs.createWriteStream("myfile.txt");
const {spawn} = require("child_process").spawn;
const app=require('../../app.js');
module.exports = async (req, res) => {

    try {
        let iotID = req.params.id;
        let iotStatus = req.params.status;

        let whatever = iotID + ',' + iotStatus + '\n';
        // fs.writeFile('toPython2.txt',whatever,(err)=>{
        //     if(err)
        //     throw err;
        //     console.log('Mirrorly Server is Online')
        //     console.log('Done writing '+whatever+' toPython.txt');
        // })
        let filename = "toPython3.txt"

        function writeFile() {

            fs.writeFile(filename, whatever, {
                flag: "a"
            }, function (err) {
                if (err) {
                    console.log("file" + filename + "already exists , testing next");

                

                } else {
                    console.log("Successfully written " + filename);
                   
                //     const path="new_names.csv";
                //     fs.open(path, "w+", function(error, fd) {
                //         if (error) {
                //              console.error("open error:  " + error.message);
                //         } else {
                //              fs.close(fd, function(error) {
                //         if (error) {
                //              console.error("close error:  " + error.message);
                //         } else {
                //              console.log("File was closed!");
                //              const pythonProcess = spawn('python',["./myScript.py"]);
   
                //              pythonProcess.stdout.on('data', (data) => {
                //                  console.log(data);
                //              });
                //              console.log("Python script running")
                //             }
                //         });
                //       }
                //    });
     
                }
            });
        }


        writeFile();
        res.redirect('/');

        // const bat =spawn('cmd.exe',['/c','my.'])
        // spawn('python',["myScript.py"]);

        // function okay(){

        //     
        // }
        
        // okay();
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
        })
    }

}