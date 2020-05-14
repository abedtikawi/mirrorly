const pool = require('../../db/config.js');
let ls = require('local-storage');
module.exports = async (req, res) => {
    // email taba3 el user sql query latjeeb huwe shu 3ando tasks w 3mellon order by 

    try {
        const selectQuery = "select * from mirrorly.todo where  users_id=?;";
        pool.query(selectQuery,
            [ls.get('userID')],
            function (err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                } else {


                    let result1 = result[0];
                    let result2 = result[1];
                    let result3 = result[2];
                    console.log(result);
                    return res.status(200).json({
                        status: 'Success',
                        data: {
                            message: {
                                result1,
                                result2,
                                result3
                            }
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