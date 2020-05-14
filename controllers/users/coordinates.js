const fs = require('fs');



module.exports = async (req, res) => {

    

    const {
        longt,
        lat
    } = req.body;
    console.log(JSON.parse(JSON.stringify(req.body)));
    if (req.body.longt == null || req.body.lat == null) {
        console.log('Attributes missing');
        return res.status(422).json({
            message: 'Attributes missing'
        });
    }

    try {

        let whatever = req.body.longt + ' ' + req.body.lat + '\n';
        let filename = "coordinates.txt";

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

        writeFile();
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