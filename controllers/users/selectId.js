const fs = require('fs');
const stream = fs.createWriteStream("myfile.txt");
const {
    spawn
} = require("child_process").spawn;
const app = require('../../app.js');
module.exports = async (req, res) => {

    try {
        let iotID = req.params.id;
        let iotStatus = req.params.status;
        let whatever = iotID + ',' + iotStatus + '\n';
        let filename = "toPython3.txt"

        function writeFile() {
            fs.writeFile(filename, whatever, {
                flag: "a"
            }, function (err) {
                if (err) {
                    console.log("file" + filename + "already exists , testing next");
                } else {
                    console.log("Successfully written " + filename);
                }
            });
        }
        writeFile();
        return res.status(200).json({
            status: 'success'
        })

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