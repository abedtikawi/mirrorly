const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user: 'root',
    password: 'root',
    database: 'mirrorly'
});

connection.connect(function (err) {
    if (err) {
        console.log('Error Connecting to DB '+err);
        return;
    }
    console.log('Connection to database established');
});
module.exports = connection;