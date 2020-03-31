const mysql = require('mysql');
const util=require('util');

const pool = mysql.createPool({
    host: 'localhost',
    port:'3306',
    user: 'root',
    password: 'root',
    database: 'mirrorly'
});

// connection.connect(function (err) {
//     if (err) {
//         console.log('Error Connecting to DB '+err);
//         return;
//     }
//     console.log('Connection to database established');
// });



pool.getConnection((err,connection)=>{
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
        }
      }console.log('Connected to database Successfull')
    
      if (connection) connection.release()
    
      return
});
pool.query = util.promisify(pool.query)

module.exports =pool;