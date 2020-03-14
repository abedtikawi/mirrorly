const fs=require('fs');
const stream= fs.createWriteStream("myfile.txt");

module.exports = async (req, res) => {
    let iotID = req.parans.id;
    let iotStatus = req.params.status;
    try {




            stream.once('open',function (fd){
                stream.write('My First Row\n')
                stream.write('My second row\n')
                stream.end();
            });




            return res.status(200).json({
                status:'success'
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