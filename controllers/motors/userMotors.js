let ls = require('local-storage');
const pool = require('../../db/config.js');
module.exports = async (req, res) => {

    try {
        const selectQuery = "select * from mirrorly.motors where  users_id=?;";
        pool.query(selectQuery,
            [ls.get('userID')],
            function (err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                } else {



                    console.log(result);
                    return res.status(200).json({
                        status: 'Success',
                        data: {
                            message: result


                        }
                    });




                }
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